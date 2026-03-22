// app/account/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0; // optional, but makes intent clear

import { ContentWrapper } from "@/components/content-wrapper";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { Heading } from "@/components/ui/heading";
import { PropsWithChildren } from "react";
import SignInWrapper from "@/components/sign-in";
import { singleLevelNestedRoutes } from "@/lib/routes";
import { MenuItems, SecondaryMenu } from "@/components/secondary-menu";
import { Line } from "@/components/line";
import { PaymentConnectionStatus } from "@/components/admin/payment-connection-status";
import { getCurrentUser } from "@/lib/auth";
import { UserMenu } from "@/components/auth/user-menu";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar showSecondAnnouncementBar={false} />

      <div>
        <div className="bg-secondary py-2 md:px-6 border-b border-border">
          <ContentWrapper className="flex items-center justify-between">
            <Heading size="h2">Your Account</Heading>
            {user ? (
              <UserMenu
                compact
                name={user.name}
                email={user.email}
              />
            ) : null}
          </ContentWrapper>
        </div>
        {user ? (
          <>
            <div>
              <ContentWrapper className="w-full py-2 flex items-center justify-between">
                <SecondaryMenu menuItems={menuItems} />
                <PaymentConnectionStatus />
              </ContentWrapper>
            </div>
            <Line />
          </>
        ) : null}
      </div>

      <ContentWrapper className="w-full flex items-start flex-col flex-1 mb-8">
        {user ? <div className="w-full">{children}</div> : <SignInWrapper />}
      </ContentWrapper>

      <Footer />
    </div>
  );
}

const menuItems: MenuItems = [
  {
    name: "Profile",
    href: singleLevelNestedRoutes.account.profile,
    group: "selling",
  },
  {
    name: "Products",
    href: singleLevelNestedRoutes.account.products,
    group: "selling",
  },
  {
    name: "Orders",
    href: singleLevelNestedRoutes.account.orders,
    group: "selling",
  },
  {
    name: "Payments",
    href: singleLevelNestedRoutes.account.payments,
    group: "selling",
  },
  {
    name: "Your purchases",
    href: singleLevelNestedRoutes.account["your-purchases"],
    group: "buying",
  },
];
