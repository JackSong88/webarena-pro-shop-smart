import { getCurrentUser } from "@/lib/auth";
import CheckoutWrapper from "../components/checkout-wrapper";
import { cookies } from "next/headers";
import { getCart } from "@/server-actions/get-cart-details";
import { db } from "@/db/db";
import { products, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CheckoutItem } from "@/lib/types";
import { CartLineItems } from "@/components/storefront/cart-line-items";
import { InfoCard } from "@/components/admin/info-card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { storeSlug: string };
}) {
  const cartId = cookies().get("cartId")?.value;
  const { cartItems, cartItemDetails } = await getCart(Number(cartId));
  const currentUser = await getCurrentUser();

  const store = await db
    .select({
      storeId: stores.id,
      storeName: stores.name,
    })
    .from(stores)
    .where(eq(stores.slug, params.storeSlug));

  if (!store.length) {
    throw new Error("Store not found");
  }

  const storeId = Number(store[0].storeId);

  const storeProducts = await db
    .select({
      id: products.id,
      price: products.price,
    })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .where(eq(stores.id, storeId));

  const detailsOfProductsInCart = cartItems
    .map((item) => {
      const product = storeProducts.find((productInStore) => productInStore.id === item.id);
      const priceAsNumber = Number(product?.price);

      if (!product || isNaN(priceAsNumber)) return undefined;

      return {
        id: item.id,
        price: priceAsNumber,
        qty: item.qty,
      };
    })
    .filter(Boolean) as CheckoutItem[];

  if (!detailsOfProductsInCart.length) {
    return (
      <InfoCard
        heading="Nothing to check out for this store"
        subheading="Add items from this seller to your cart before starting checkout."
        icon={<AlertCircle size={24} />}
        button={
          <Link href={routes.cart}>
            <Button>Return to cart</Button>
          </Link>
        }
      />
    );
  }

  return (
    <CheckoutWrapper
      initialCustomerDetails={{
        name: currentUser?.name ?? "",
        email: currentUser?.email ?? "",
      }}
      storeName={store[0].storeName ?? "Store"}
      storeSlug={params.storeSlug}
      detailsOfProductsInCart={detailsOfProductsInCart}
      cartLineItems={
        <CartLineItems
          variant="checkout"
          cartItems={cartItems}
          products={
            cartItemDetails?.filter((item) => item.storeId === storeId) ?? []
          }
        />
      }
    />
  );
}
