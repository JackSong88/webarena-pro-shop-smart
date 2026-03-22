import { ProductEditor } from "@/components/admin/product-editor";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/server-actions/products";
import { requireUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";

export default async function ProductDetailPage(props: {
  params: { productId: string };
}) {
  const user = await requireUser();

  const productDetails = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.storeId, Number(user?.storeId)),
        eq(products.id, Number(props.params.productId))
      )
    )
    .then((res) => {
      if (res.length === 0) {
        throw new Error("Product not found or user not authorised");
      }
      return res[0];
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  return (
    <>
      <ProductEditor
        productStatus="existing-product"
        initialValues={productDetails}
      />
    </>
  );
}
