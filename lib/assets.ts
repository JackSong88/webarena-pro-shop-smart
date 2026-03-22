export const images = [
  "/images/hero/market-fresh.webp",
  "/images/hero/weeknight-dinner.webp",
  "/images/hero/bakery-finds.webp",
];

export const collectionHeaderImage = "/images/hero/market-fresh.webp";

const fallbackRules = [
  {
    match: ["banana", "egg", "bread", "freshmart"],
    image: "/images/products/freshmart/organic-bananas.jpg",
  },
  {
    match: ["spinach", "tomato", "avocado", "greenbasket"],
    image: "/images/products/greenbasket/organic-spinach-250g.jpg",
  },
  {
    match: ["apple", "berry", "strawberry", "kiwi", "lemon", "cucumber", "onion", "pepper", "orchard"],
    image: "/images/products/orchard-market/strawberries-16oz.webp",
  },
  {
    match: ["milk", "rice", "honey", "coffee", "juice", "water", "oil", "pantry"],
    image: "/images/products/pantry-lane/whole-milk-2l.webp",
  },
  {
    match: ["beef", "chicken", "salmon", "fish", "ice cream", "potato", "protein", "family fare"],
    image: "/images/products/family-fare/angus-beef-strip-steaks-2ct.webp",
  },
  {
    match: ["pizza", "pasta", "biryani", "karahi", "curry", "stir-fry", "shrimp", "ready table"],
    image: "/images/products/ready-table/stone-oven-margherita-pizza.webp",
  },
  {
    match: ["salad", "quinoa", "avocado", "chickpea", "tagine", "green spoon"],
    image: "/images/products/green-spoon/mediterranean-quinoa-salad.webp",
  },
  {
    match: ["cookie", "bruschetta", "tiramisu", "smoothie", "falafel", "spanakopita", "bakery", "crumb"],
    image: "/images/products/oven-and-crumb/chocolate-chip-cookies-6-pack.webp",
  },
];

export const getProductFallbackImage = (title = "", hint = "") => {
  const searchableText = `${title} ${hint}`.toLowerCase();

  const matchedRule = fallbackRules.find((rule) =>
    rule.match.some((token) => searchableText.includes(token))
  );

  return matchedRule?.image ?? "/images/hero/weeknight-dinner.webp";
};
