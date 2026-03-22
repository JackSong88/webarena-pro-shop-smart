import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { InfoCard } from "@/components/admin/info-card";
import { CreditCard } from "lucide-react";
import { requireUser } from "@/lib/auth";

export default async function PaymentsPage() {
  const user = await requireUser();

  return (
    <>
      <HeadingAndSubheading
        heading="Checkout"
        subheading="Local checkout is built in for this self-hosted environment"
      />
      {user.storeId ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-green-700">
              Status
            </p>
            <p className="mt-3 text-2xl font-semibold text-green-900">
              Local checkout enabled
            </p>
            <p className="mt-3 text-sm leading-6 text-green-900/80">
              Orders are created directly in MySQL with no third-party payment
              onboarding required. This keeps the demo self-contained and ready
              to run after `docker compose up`.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-secondary p-5">
            <p className="font-semibold text-gray-900">How local checkout works</p>
            <div className="mt-3 flex flex-col gap-3 text-sm text-muted-foreground">
              <p>Shoppers submit checkout details in-app using the built-in demo payment form.</p>
              <p>Orders, addresses, and purchase history are written straight to the local database.</p>
              <p>To reset back to seeded data, recreate the Docker volume or run the reset helper service.</p>
            </div>
          </div>
        </div>
      ) : (
        <InfoCard
          heading="Create a store first"
          subheading="Once your account owns a store, checkout is enabled automatically."
          icon={<CreditCard size={36} className="text-gray-600" />}
        />
      )}
    </>
  );
}
