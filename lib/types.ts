import { Order, Product } from "@/db/schema";

export type ProductImages = {
  id: string;
  alt: string;
  url: string;
};

export type CartItem = { id: number; qty: number };

export type CheckoutItem = {
  id: number;
  price: number;
  qty: number;
};

export type CartLineItemDetails = Omit<Product, "description" | "images"> & {
  storeName: string | null;
  images: ProductImages[];
};

export type OrderItemDetails = Omit<
  Product,
  "description" | "images" | "description" | "price" | "inventory"
> & {
  images: ProductImages[];
};

export type OrdersTable = Omit<
  Order,
  | "stripePaymentIntentId"
  | "stripePaymentIntentStatus"
  | "addressId"
  | "storeId"
  | "userId"
  | "items"
  | "email"
  | "createdAt"
> & {
  items: CheckoutItem[];
  createdAt: number;
  paymentStatus: string | null;
};

export type BuyersOrderTable = Omit<
  Order,
  | "stripePaymentIntentId"
  | "stripePaymentIntentStatus"
  | "addressId"
  | "storeId"
  | "userId"
  | "items"
  | "name"
  | "email"
  | "createdAt"
> & {
  items: CheckoutItem[];
  createdAt: number;
  sellerName: string;
  paymentStatus: string | null;
};
