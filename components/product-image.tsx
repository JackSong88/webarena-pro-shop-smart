import { getProductFallbackImage } from "@/lib/assets";
import { cn } from "@/lib/utils";

export const ProductImage = (props: {
  src?: string;
  alt?: string;
  sizes?: string;
  imageClassName?: string;
  wrapperClassName?: string;
  fallbackText?: string;
  fallbackHint?: string;
  height: `h-${string}`;
  width: `w-${string}`;
}) => {
  const alt = props.alt ?? props.fallbackText ?? "Product image";
  const resolvedSrc =
    props.src && props.src.trim() !== ""
      ? props.src
      : getProductFallbackImage(
          props.fallbackText ?? "ShopSmart Product",
          props.fallbackHint ?? "Local Catalog"
        );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        props.height,
        props.width,
        props.wrapperClassName
      )}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover", props.imageClassName)}
      />
    </div>
  );
};
