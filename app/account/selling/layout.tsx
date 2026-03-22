import { CreateNewStore } from "@/components/admin/create-new-store";
import { requireUser } from "@/lib/auth";
import { createStore } from "@/server-actions/store";
import { PropsWithChildren } from "react";

export default async function SellerLayout(props: PropsWithChildren) {
  const user = await requireUser();

  return (
    <>
      {user?.storeId ? (
        <div className="flex flex-col gap-4">{props.children}</div>
      ) : (
        <CreateNewStore createStore={createStore} />
      )}
    </>
  );
}
