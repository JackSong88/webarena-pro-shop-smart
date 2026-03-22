import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { EditStoreFields } from "@/components/admin/edit-store-fields";
import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { updateStore } from "@/server-actions/store";

export default async function SellerProfile() {
  const user = await requireUser();

  const storeDetails = await db
    .select()
    .from(stores)
    .where(eq(stores.id, Number(user?.storeId)))
    .catch((err) => {
      console.log(err);
      return null;
    });

  return (
    <>
      <HeadingAndSubheading
        heading="Selling profile"
        subheading="Review and update your store settings"
      />
      {storeDetails && (
        <EditStoreFields
          storeDetails={storeDetails[0]}
          updateStore={updateStore}
        />
      )}
    </>
  );
}
