"use server";
import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function getStoreId() {
  const user = await getCurrentUser();
  return user?.storeId;
}

export async function getStoreSlug(storeId: number) {
  const slugs = await db
    .select({
      slug: stores.slug,
    })
    .from(stores)
    .where(eq(stores.id, storeId));
  return slugs[0].slug;
}
