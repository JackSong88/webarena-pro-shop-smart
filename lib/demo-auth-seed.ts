import "server-only";

import { db } from "@/db/db";
import { stores, users } from "@/db/schema";
import { eq } from "drizzle-orm";

const buyerPasswordHash =
  "cb8e410fc0d517520d05c38b0bc25243:091a527d3595b8bd2c93c5129b83363fa786417d9eb40f0f42693e10b5f307a655063a8fbfa5697d825ef4edb6ca1e184af3dd304bcdaa2ab21ab30eb3dd4e94";

const sellerPasswordHash =
  "456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c";

const demoBuyer = {
  name: "Demo Buyer",
  email: "buyer@shopsmart.local",
  passwordHash: buyerPasswordHash,
  storeId: null as number | null,
};

const demoStores = [
  {
    name: "Orchard Market",
    slug: "orchard-market",
    email: "orchard@shopsmart.local",
    industry: "Produce Market",
    description:
      "Peak-season fruit, greens, herbs, and produce-box essentials for the week ahead.",
  },
  {
    name: "Pantry Lane",
    slug: "pantry-lane",
    email: "pantry@shopsmart.local",
    industry: "Pantry & Drinks",
    description:
      "Shelf staples, breakfast basics, drinks, and everyday pantry refills in one stop.",
  },
  {
    name: "FreshMart",
    slug: "freshmart",
    email: "freshmart@shopsmart.local",
    industry: "Neighborhood Grocery",
    description:
      "Everyday grocery basics with fruit, dairy, eggs, and bakery staples for fast weekly orders.",
  },
  {
    name: "GreenBasket",
    slug: "greenbasket",
    email: "greenbasket@shopsmart.local",
    industry: "Organic Grocer",
    description:
      "Organic produce and pantry staples curated for lighter cooking, meal prep, and low-waste baskets.",
  },
  {
    name: "Family Fare",
    slug: "family-fare",
    email: "family@shopsmart.local",
    industry: "Family Grocer",
    description:
      "Protein picks, freezer favorites, bulk produce, and family-size grocery staples.",
  },
  {
    name: "Ready Table",
    slug: "ready-table",
    email: "readytable@shopsmart.local",
    industry: "Prepared Meals",
    description:
      "Heat-and-eat dinners, pasta bowls, curries, and quick mains for busy nights.",
  },
  {
    name: "Green Spoon",
    slug: "green-spoon",
    email: "greenspoon@shopsmart.local",
    industry: "Fresh Deli",
    description:
      "Fresh salads, grain bowls, wraps, and lighter prepared foods for everyday lunches.",
  },
  {
    name: "Oven & Crumb",
    slug: "oven-and-crumb",
    email: "oven@shopsmart.local",
    industry: "Bakery & Cafe",
    description:
      "Bakery favorites, cafe-style sides, desserts, and grab-and-go comfort food.",
  },
] as const;

const demoUsers = [
  demoBuyer,
  ...demoStores.map((store) => ({
    name: `${store.name} Seller`,
    email: store.email,
    passwordHash: sellerPasswordHash,
    storeSlug: store.slug,
  })),
] as const;

const demoUserByEmail = new Map(
  demoUsers.map((user) => [user.email.toLowerCase(), user])
);

export function isDemoAccountEmail(email: string) {
  return demoUserByEmail.has(email.trim().toLowerCase());
}

async function ensureDemoStore(store: (typeof demoStores)[number]) {
  const [existingStore] = await db
    .select({ id: stores.id })
    .from(stores)
    .where(eq(stores.slug, store.slug));

  if (existingStore) {
    await db
      .update(stores)
      .set({
        name: store.name,
        industry: store.industry,
        description: store.description,
      })
      .where(eq(stores.id, existingStore.id));

    return existingStore.id;
  }

  const [{ insertId }] = await db.insert(stores).values({
    name: store.name,
    slug: store.slug,
    industry: store.industry,
    description: store.description,
  });

  return insertId;
}

export async function ensureDemoAccountSeed(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const demoUser = demoUserByEmail.get(normalizedEmail);

  if (!demoUser) {
    return;
  }

  let storeId: number | null = null;

  if ("storeSlug" in demoUser) {
    const store = demoStores.find(
      (candidate) => candidate.slug === demoUser.storeSlug
    );

    if (!store) {
      throw new Error(`Missing demo store config for ${demoUser.email}`);
    }

    storeId = await ensureDemoStore(store);
  }

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, demoUser.email));

  const nextValues = {
    name: demoUser.name,
    email: demoUser.email,
    passwordHash: demoUser.passwordHash,
    storeId,
    createdAt: Math.floor(Date.now() / 1000),
  };

  if (existingUser) {
    await db.update(users).set(nextValues).where(eq(users.id, existingUser.id));
    return;
  }

  await db.insert(users).values(nextValues);
}
