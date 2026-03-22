"use server";

import { getCart } from "@/server-actions/get-cart-details";
import { db } from "@/db/db";
import { addresses, carts, orders, products, stores } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { routes } from "@/lib/routes";
import { CheckoutItem } from "@/lib/types";
import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { z } from "zod";

const checkoutSchema = z.object({
  storeSlug: z.string().trim().min(1),
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  line1: z.string().trim().min(3),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2),
  state: z.string().trim().min(2),
  postalCode: z.string().trim().min(3),
  country: z.string().trim().min(2),
  cardName: z.string().trim().min(2),
  cardNumber: z.string().trim().min(12),
  expiry: z.string().trim().regex(/^\d{2}\/\d{2}$/),
  cvc: z.string().trim().regex(/^\d{3,4}$/),
});

export async function submitOrder(values: z.infer<typeof checkoutSchema>) {
  try {
    const input = checkoutSchema.parse(values);
    const cartId = Number(cookies().get("cartId")?.value);

    if (isNaN(cartId)) {
      throw new Error("Cart not found");
    }

    const { cartItems, cartItemDetails } = await getCart(cartId);
    const [store] = await db
      .select({
        id: stores.id,
        name: stores.name,
        slug: stores.slug,
      })
      .from(stores)
      .where(eq(stores.slug, input.storeSlug));

    if (!store) {
      throw new Error("Store not found");
    }

    const storeItems = cartItemDetails.filter((item) => item.storeId === store.id);

    if (!storeItems.length) {
      throw new Error("This store has no items in the cart");
    }

    const checkoutItems = storeItems.map((product) => {
      const qty = cartItems.find((item) => item.id === product.id)?.qty ?? 0;

      if (qty < 1) {
        throw new Error("Cart quantity is invalid");
      }

      return {
        id: product.id,
        price: Number(product.price),
        qty,
      };
    }) as CheckoutItem[];

    const outOfStockItem = storeItems.find((product) => {
      const qty = cartItems.find((item) => item.id === product.id)?.qty ?? 0;
      return Number(product.inventory) < qty;
    });

    if (outOfStockItem) {
      return {
        error: true,
        message: "Inventory changed",
        action: `${outOfStockItem.name} no longer has enough stock to fulfill this order.`,
      };
    }

    const [addressInsert] = await db.insert(addresses).values({
      line1: input.line1,
      line2: input.line2 || "",
      city: input.city,
      state: input.state,
      postal_code: input.postalCode,
      country: input.country,
    });

    const [storeOrderCount] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .where(eq(orders.storeId, store.id));

    const reference = `LOCAL-${randomBytes(4).toString("hex").toUpperCase()}`;
    const subtotal = checkoutItems.reduce(
      (sum, item) => sum + item.qty * Number(item.price),
      0
    );
    const shipping = subtotal > 50 ? 0 : 7.5;
    const total = subtotal + shipping;
    const currentUser = await getCurrentUser();

    await db.insert(orders).values({
      prettyOrderId: Number(storeOrderCount?.count ?? 0) + 1,
      storeId: store.id,
      userId: currentUser?.id ?? null,
      items: JSON.stringify(checkoutItems),
      total: total.toFixed(2),
      stripePaymentIntentId: reference,
      stripePaymentIntentStatus: "paid",
      name: input.name,
      email: input.email,
      createdAt: Math.floor(Date.now() / 1000),
      addressId: Number(addressInsert.insertId),
    });

    const orderedProductIds = checkoutItems.map((item) => item.id);
    const inventoryRows = await db
      .select({
        id: products.id,
        inventory: products.inventory,
      })
      .from(products)
      .where(inArray(products.id, orderedProductIds));

    for (const item of checkoutItems) {
      const currentInventory = inventoryRows.find((row) => row.id === item.id);
      const nextInventory = Math.max(
        0,
        Number(currentInventory?.inventory ?? 0) - item.qty
      );

      await db
        .update(products)
        .set({
          inventory: String(nextInventory),
        })
        .where(and(eq(products.id, item.id), eq(products.storeId, store.id)));
    }

    const remainingCartItems = cartItems.filter(
      (item) => !orderedProductIds.includes(item.id)
    );

    await db
      .update(carts)
      .set({
        items: JSON.stringify(remainingCartItems),
        isClosed: remainingCartItems.length === 0,
        paymentIntentId: null,
        clientSecret: null,
      })
      .where(eq(carts.id, cartId));

    revalidatePath(routes.cart);
    revalidatePath(`${routes.checkout}/${store.slug}`);
    revalidatePath(routes.account);

    return {
      error: false,
      message: "Order placed",
      action: "Your local demo checkout completed successfully.",
      redirectTo: `${routes.checkout}/${store.slug}/${routes.orderConfirmation}?order=${reference}`,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Checkout failed",
      action: "Please review your details and try again.",
    };
  }
}
