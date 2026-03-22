// schema.ts
import { InferModel } from "drizzle-orm";
import {
  boolean,
  decimal,
  int,
  json,
  mysqlTable,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const stores = mysqlTable(
  "stores",
  {
    id: serial("id").primaryKey(),
    name: varchar("store_name", { length: 40 }),
    industry: text("industry"),
    description: text("description"),
    slug: varchar("slug", { length: 50 }),
  },
  (table) => {
    return {
      storeNameIndex: uniqueIndex("store_name_index").on(table.name),
      storeSlugIndex: uniqueIndex("store_slug_index").on(table.slug),
    };
  }
);

export type Store = InferModel<typeof stores>;

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }),
    email: varchar("email", { length: 191 }),
    passwordHash: text("password_hash"),
    storeId: int("store_id"),
    createdAt: int("created_at"),
  },
  (table) => {
    return {
      userEmailIndex: uniqueIndex("user_email_index").on(table.email),
    };
  }
);

export type User = InferModel<typeof users>;

export const sessions = mysqlTable(
  "sessions",
  {
    id: serial("id").primaryKey(),
    sessionToken: varchar("session_token", { length: 191 }),
    userId: int("user_id"),
    expiresAt: int("expires_at"),
  },
  (table) => {
    return {
      sessionTokenIndex: uniqueIndex("session_token_index").on(
        table.sessionToken
      ),
    };
  }
);

export type Session = InferModel<typeof sessions>;

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  description: text("description"),
  inventory: decimal("inventory").default("0"),
  images: json("images"),
  storeId: int("store_id"),
});
export type Product = InferModel<typeof products>;

export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  items: json("items"),
  paymentIntentId: text("payment_intent_id"),
  clientSecret: text("client_secret"),
  isClosed: boolean("is_closed").default(false),
});
export type Cart = InferModel<typeof carts>;

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  storeId: int("store_id"),
  stripeAccountId: text("stripe_account_id"),
  stripeAccountCreatedAt: int("stripe_account_created_at"),
  stripeAccountExpiresAt: int("stripe_account_expires_at"),
  details_submitted: boolean("details_submitted").default(false),
});

export type Payment = InferModel<typeof payments>;

export const orders = mysqlTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    prettyOrderId: int("pretty_order_id"),
    storeId: int("store_id"),
    userId: int("user_id"),
    items: json("items"),
    total: decimal("total", { precision: 10, scale: 2 }).default("0"),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 256 }), // text field is valid for uniqueIndex in MySQL
    stripePaymentIntentStatus: text("stripe_payment_intent_status"),
    name: text("name"),
    email: text("email"),
    createdAt: int("created_at"),
    addressId: int("address"),
  },
  (table) => {
    return {
      stripePaymentIntentIdIndex: uniqueIndex(
        "stripe_payment_intent_id_index"
      ).on(table.stripePaymentIntentId),
    };
  }
);

export type Order = InferModel<typeof orders>;

export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  line1: text("line1"),
  line2: text("line2"),
  city: text("city"),
  state: text("state"),
  postal_code: text("postal_code"),
  country: text("country"),
});

export type Address = InferModel<typeof addresses>;
