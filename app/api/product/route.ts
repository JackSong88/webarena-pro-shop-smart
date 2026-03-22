import { createProduct } from "@/server-actions/products";
import { NextResponse } from "next/server";

// This route lets the product editor create products from client components.
export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const response = await createProduct(body);
  return NextResponse.json(response);
}
