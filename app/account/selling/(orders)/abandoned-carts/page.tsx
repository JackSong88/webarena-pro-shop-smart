import { InfoCard } from "@/components/admin/info-card";
import { ShoppingCart } from "lucide-react";
import { Heading } from "@/components/ui/heading";

export default async function OrdersPage() {
  return (
    <div>
      <div className="mb-4">
        <Heading size="h4">Abandoned carts</Heading>
      </div>
      <InfoCard
        heading="Local checkout keeps this screen simple"
        subheading="Stripe-powered abandoned cart recovery has been removed from the local demo so the environment no longer depends on hosted payment services."
        icon={<ShoppingCart size={36} className="text-gray-600" />}
      />
    </div>
  );
}
