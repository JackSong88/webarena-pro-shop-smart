"use client";

import { UserMenu } from "@/components/auth/user-menu";

export const UserProfileWrapper = (props: {
  name: string | null;
  email: string | null;
}) => {
  return (
    <div className="px-6 py-6 rounded-md bg-secondary flex items-start flex-col border border-border">
      <p className="font-medium">Manage Account</p>
      <p className="text-sm text-muted-foreground">
        Click on your profile to manage your account.
      </p>
      <div className="mt-4">
        <UserMenu name={props.name} email={props.email} />
      </div>
    </div>
  );
};
