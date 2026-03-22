"use client";

import { useState } from "react";
import { ProductImages } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ProductImage } from "../product-image";
import { toast } from "../ui/use-toast";

export function ProductImageUploader(props: {
  product: {
    name: string | null;
    images: ProductImages[];
  };
  newImages: ProductImages[];
  setNewImages: React.Dispatch<React.SetStateAction<ProductImages[]>>;
  imagesToDelete: ProductImages[];
  setImagesToDelete: React.Dispatch<React.SetStateAction<ProductImages[]>>;
}) {
  const [draftImage, setDraftImage] = useState({
    url: "",
    alt: "",
  });

  const visibleImages = [...props.product.images, ...props.newImages].filter(
    (item) => !props.imagesToDelete.includes(item)
  );

  return (
    <div>
      <Label htmlFor="product-image-url">Images</Label>
      <div className="mt-2 border border-border p-4 rounded-md flex items-start justify-start gap-3 flex-wrap">
        {visibleImages.length ? (
          visibleImages.map((image) => (
            <div key={image.id} className="w-36">
              <div className="relative">
                <ProductImage
                  src={image.url}
                  alt={image.alt}
                  fallbackText={props.product.name ?? "Product"}
                  fallbackHint="Catalog"
                  height="h-36"
                  width="w-36"
                />
                <button
                  type="button"
                  onClick={() => {
                    props.setImagesToDelete((prev) => [...prev, image]);
                  }}
                  className="absolute -top-2 -right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center border border-border"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                {image.alt || image.url}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-secondary px-4 py-5 text-sm text-muted-foreground">
            No custom product images yet. Local placeholders will be shown until
            you add one.
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr_auto]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-image-url">Image URL</Label>
          <Input
            id="product-image-url"
            placeholder="/images/my-product.jpg or https://..."
            value={draftImage.url}
            onChange={(event) =>
              setDraftImage((current) => ({ ...current, url: event.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-image-alt">Alt text</Label>
          <Input
            id="product-image-alt"
            placeholder="Product detail photo"
            value={draftImage.alt}
            onChange={(event) =>
              setDraftImage((current) => ({ ...current, alt: event.target.value }))
            }
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            onClick={() => {
              if (!draftImage.url.trim()) {
                toast({
                  title: "Image URL required",
                  description: "Add a URL or local path before saving the image.",
                });
                return;
              }

              props.setNewImages((current) => [
                ...current,
                {
                  id: `image-${Date.now()}`,
                  url: draftImage.url.trim(),
                  alt: draftImage.alt.trim(),
                },
              ]);
              setDraftImage({ url: "", alt: "" });
            }}
          >
            Add image
          </Button>
        </div>
      </div>
    </div>
  );
}
