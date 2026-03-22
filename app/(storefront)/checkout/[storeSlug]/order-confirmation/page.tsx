import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { db } from "@/db/db";
import { addresses, orders, stores } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { CheckoutItem, OrderItemDetails } from "@/lib/types";
import { Check } from "lucide-react";
import { OrderLineItems } from "@/components/order-line-items";
import { getDetailsOfProductsOrdered } from "@/server-actions/orders";
import { currencyFormatter } from "@/lib/currency";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { parseJsonColumn } from "@/lib/utils";

export default async function OrderConfirmation({
  params,
  searchParams,
}: {
  params: {
    storeSlug: string;
  };
  searchParams: {
    order?: string;
  };
}) {
  if (!searchParams.order) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border p-8 text-center">
        <Heading size="h3">Order not found</Heading>
        <p className="mt-3 text-muted-foreground">
          We couldn&apos;t find a local order reference in the URL.
        </p>
        <Link href={routes.products} className="mt-6 inline-block">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    );
  }

  const [record] = await db
    .select({
      order: orders,
      address: addresses,
      sellerName: stores.name,
    })
    .from(orders)
    .leftJoin(addresses, eq(orders.addressId, addresses.id))
    .leftJoin(stores, eq(orders.storeId, stores.id))
    .where(
      and(
        eq(orders.stripePaymentIntentId, searchParams.order),
        eq(stores.slug, params.storeSlug)
      )
    );

  if (!record?.order) {
    throw new Error("Order not found");
  }

  const checkoutItems = parseJsonColumn<CheckoutItem[]>(record.order.items, []);
  const products: OrderItemDetails[] = await getDetailsOfProductsOrdered(checkoutItems);

  return (
    <div className="mt-8">
      <Heading size="h2">
        <div className="flex md:flex-row flex-col items-start md:items-center justify-start gap-4 md:gap-2">
          <div className="border-2 border-green-600 text-green-600 bg-transparent rounded-full h-10 w-10 flex items-center justify-center">
            <Check className="text-green-600" size={26} />
          </div>
          <span>
            Thanks for your order,{" "}
            <span className="capitalize">{record.order.name?.split(" ")[0]}</span>
            !
          </span>
        </div>
      </Heading>
      <p className="text-muted-foreground mt-4">
        Your local order reference is {searchParams.order}
      </p>
      <div className="flex flex-col gap-4 mt-8">
        <div className="p-6 bg-secondary border border-border rounded-md">
          <Heading size="h3">What&apos;s next?</Heading>
          <p>
            This demo order has been written directly to the local database. The
            seller can review it immediately from the account dashboard.
          </p>
        </div>
        <div className="lg:grid grid-cols-2 gap-4 flex flex-col">
          <div className="p-6 bg-secondary border border-border rounded-md sm:grid grid-cols-3 flex flex-col gap-4">
            <div className="sm:col-span-2">
              <div className="mb-2">
                <Heading size="h4">Shipping Address</Heading>
              </div>
              <p>{record.order.name}</p>
              <p className="mb-3">{record.order.email}</p>
              <p>{record.address?.line1}</p>
              <p>{record.address?.line2}</p>
              <p>
                {record.address?.city}, {record.address?.postal_code}
              </p>
              <p>
                {record.address?.state}, {record.address?.country}
              </p>
            </div>
            <div>
              <div className="mb-2">
                <Heading size="h4">Seller Details</Heading>
              </div>
              <p>{record.sellerName}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Payment status: paid
              </p>
            </div>
          </div>
          <div className="p-6 border border-border bg-secondary rounded-md">
            <div className="mb-2">
              <Heading size="h4">Order Details</Heading>
            </div>
            <OrderLineItems
              checkoutItems={checkoutItems}
              products={products}
            />
            <div className="border-y border-slate-200 py-2 px-2 mx-1 mt-2 flex items-center gap-2">
              <Heading size="h4">Order Total: </Heading>
              <p className="scroll-m-20 text-xl tracking-tight">
                {currencyFormatter(Number(record.order.total))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
