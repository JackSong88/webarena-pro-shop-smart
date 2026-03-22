import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { singleLevelNestedRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { AlertCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

export const PaymentConnectionStatus = async () => {
  const user = await getCurrentUser();
  const checkoutEnabled = Boolean(user?.storeId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1 justify-center rounded-md border py-1 px-3 text-sm text-center",
          checkoutEnabled
            ? "bg-green-100 border-green-500 text-green-700"
            : "bg-yellow-100 border-yellow-500 text-yellow-700"
        )}
      >
        <AlertCircle size={16} />
        <p className="font-bold">Checkout:</p>
        <p>{checkoutEnabled ? "Ready" : "Setup needed"}</p>
        <ChevronDown size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Checkout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="w-full h-full" /* maximises clickable area */
            href={singleLevelNestedRoutes.account.payments}
          >
            Local checkout settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
