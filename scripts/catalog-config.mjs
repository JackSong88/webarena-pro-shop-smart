const groceryImage = (slug) =>
  `https://cdn.dummyjson.com/product-images/groceries/${slug}/thumbnail.webp`;

const recipeImage = (id) => `https://cdn.dummyjson.com/recipe-images/${id}.webp`;

export const heroAssets = [
  {
    assetPath: "/images/hero/market-fresh.webp",
    sourceUrl: recipeImage(6),
  },
  {
    assetPath: "/images/hero/weeknight-dinner.webp",
    sourceUrl: recipeImage(45),
  },
  {
    assetPath: "/images/hero/bakery-finds.webp",
    sourceUrl: recipeImage(3),
  },
];

export const sellerPasswordHash =
  "456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c";

export const buyerPasswordHash =
  "cb8e410fc0d517520d05c38b0bc25243:091a527d3595b8bd2c93c5129b83363fa786417d9eb40f0f42693e10b5f307a655063a8fbfa5697d825ef4edb6ca1e184af3dd304bcdaa2ab21ab30eb3dd4e94";

export const buyerAccount = {
  name: "Demo Buyer",
  email: "buyer@shopsmart.local",
  passwordHash: buyerPasswordHash,
};

export const stores = [
  {
    name: "Orchard Market",
    slug: "orchard-market",
    email: "orchard@shopsmart.local",
    industry: "Produce Market",
    description:
      "Peak-season fruit, greens, herbs, and produce-box essentials for the week ahead.",
    products: [
      {
        name: "Organic Gala Apples 2 lb",
        price: 3.49,
        inventory: 120,
        description: "Crisp organic Gala apples in a family-size 2 lb bag.",
        assetPath: "/images/products/orchard-market/organic-gala-apples-2lb.webp",
        sourceUrl: groceryImage("apple"),
      },
      {
        name: "Mini Cucumbers 6-pack",
        price: 2.79,
        inventory: 95,
        description: "Snack-size cucumbers with a fresh crunch and thin skin.",
        assetPath: "/images/products/orchard-market/mini-cucumbers-6-pack.webp",
        sourceUrl: groceryImage("cucumber"),
      },
      {
        name: "Green Bell Peppers 3-pack",
        price: 3.29,
        inventory: 88,
        description: "Sweet green bell peppers for salads, fajitas, and stir-fries.",
        assetPath:
          "/images/products/orchard-market/green-bell-peppers-3-pack.webp",
        sourceUrl: groceryImage("green-bell-pepper"),
      },
      {
        name: "Hot Green Chili Peppers 8 oz",
        price: 2.19,
        inventory: 70,
        description: "Bright, punchy chili peppers for sauces, tacos, and salsas.",
        assetPath:
          "/images/products/orchard-market/hot-green-chili-peppers-8oz.webp",
        sourceUrl: groceryImage("green-chili-pepper"),
      },
      {
        name: "Gold Kiwi 4-pack",
        price: 4.29,
        inventory: 64,
        description: "Sweet-tart golden kiwis with smooth flesh and tropical flavor.",
        assetPath: "/images/products/orchard-market/gold-kiwi-4-pack.webp",
        sourceUrl: groceryImage("kiwi"),
      },
      {
        name: "Meyer Lemons 1 lb bag",
        price: 2.49,
        inventory: 80,
        description: "Juicy lemons for dressings, drinks, and weeknight cooking.",
        assetPath: "/images/products/orchard-market/meyer-lemons-1lb-bag.webp",
        sourceUrl: groceryImage("lemon"),
      },
      {
        name: "Red Onions 2 lb",
        price: 2.99,
        inventory: 92,
        description: "Sharp, colorful onions that roast beautifully or slice raw.",
        assetPath: "/images/products/orchard-market/red-onions-2lb.webp",
        sourceUrl: groceryImage("red-onions"),
      },
      {
        name: "Strawberries 16 oz",
        price: 4.99,
        inventory: 76,
        description: "Sweet strawberries picked for smoothies, cereal, and dessert.",
        assetPath: "/images/products/orchard-market/strawberries-16oz.webp",
        sourceUrl: groceryImage("strawberry"),
      },
    ],
  },
  {
    name: "Pantry Lane",
    slug: "pantry-lane",
    email: "pantry@shopsmart.local",
    industry: "Pantry & Drinks",
    description:
      "Shelf staples, breakfast basics, drinks, and everyday pantry refills in one stop.",
    products: [
      {
        name: "Extra Virgin Cooking Oil 1L",
        price: 7.49,
        inventory: 58,
        description: "Versatile cooking oil for roasting, sauteing, and meal prep.",
        assetPath:
          "/images/products/pantry-lane/extra-virgin-cooking-oil-1l.webp",
        sourceUrl: groceryImage("cooking-oil"),
      },
      {
        name: "Free-Range Brown Eggs 12 ct",
        price: 5.29,
        inventory: 84,
        description: "A dozen brown eggs for breakfast scrambles and baking days.",
        assetPath:
          "/images/products/pantry-lane/free-range-brown-eggs-12ct.webp",
        sourceUrl: groceryImage("eggs"),
      },
      {
        name: "Wildflower Honey 12 oz",
        price: 6.79,
        inventory: 48,
        description: "Floral honey that works in tea, yogurt bowls, and marinades.",
        assetPath: "/images/products/pantry-lane/wildflower-honey-12oz.webp",
        sourceUrl: groceryImage("honey-jar"),
      },
      {
        name: "Cold-Pressed Orange Juice 52 oz",
        price: 5.99,
        inventory: 66,
        description: "Bright citrus juice chilled and ready for breakfast service.",
        assetPath:
          "/images/products/pantry-lane/cold-pressed-orange-juice-52oz.webp",
        sourceUrl: groceryImage("juice"),
      },
      {
        name: "Whole Milk 2L",
        price: 4.39,
        inventory: 73,
        description: "Fresh whole milk for coffee, cereal, baking, and sauces.",
        assetPath: "/images/products/pantry-lane/whole-milk-2l.webp",
        sourceUrl: groceryImage("milk"),
      },
      {
        name: "Instant Coffee Classic Roast",
        price: 8.49,
        inventory: 42,
        description: "Smooth instant coffee with a balanced roast and easy prep.",
        assetPath:
          "/images/products/pantry-lane/instant-coffee-classic-roast.webp",
        sourceUrl: groceryImage("nescafe-coffee"),
      },
      {
        name: "Long Grain White Rice 2 lb",
        price: 4.89,
        inventory: 90,
        description: "Reliable long grain rice for weeknight bowls and side dishes.",
        assetPath: "/images/products/pantry-lane/long-grain-white-rice-2lb.webp",
        sourceUrl: groceryImage("rice"),
      },
      {
        name: "Sparkling Spring Water 12 ct",
        price: 6.49,
        inventory: 61,
        description: "A chilled 12-pack of crisp sparkling water for the fridge.",
        assetPath:
          "/images/products/pantry-lane/sparkling-spring-water-12ct.webp",
        sourceUrl: groceryImage("water"),
      },
    ],
  },
  {
    name: "FreshMart",
    slug: "freshmart",
    email: "freshmart@shopsmart.local",
    industry: "Neighborhood Grocery",
    description:
      "Everyday grocery basics with fruit, dairy, eggs, and bakery staples for fast weekly orders.",
    products: [
      {
        name: "Organic Bananas",
        price: 2.99,
        inventory: 100,
        description: "Ripe organic bananas sold per bunch for breakfast and lunchboxes.",
        assetPath: "/images/products/freshmart/organic-bananas.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Whole Milk 2L",
        price: 4.49,
        inventory: 80,
        description: "Fresh whole milk in a 2 litre bottle for cereal, coffee, and baking.",
        assetPath: "/images/products/freshmart/whole-milk-2l.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Free-Range Eggs (12 pack)",
        price: 5.29,
        inventory: 24,
        description: "Large free-range brown eggs, ready for breakfast scrambles and baking.",
        assetPath: "/images/products/freshmart/free-range-eggs-12-pack.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1585355611444-06154f329e96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Sourdough Bread Loaf",
        price: 3.99,
        inventory: 18,
        description: "Crusty sourdough bread loaf baked daily for toast, sandwiches, and soups.",
        assetPath: "/images/products/freshmart/sourdough-bread-loaf.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    name: "GreenBasket",
    slug: "greenbasket",
    email: "greenbasket@shopsmart.local",
    industry: "Organic Grocer",
    description:
      "Organic produce and pantry staples curated for lighter cooking, meal prep, and low-waste baskets.",
    products: [
      {
        name: "Organic Spinach 250g",
        price: 3.99,
        inventory: 70,
        description: "Fresh organic spinach leaves in a 250g bag for smoothies, salads, and sautees.",
        assetPath: "/images/products/greenbasket/organic-spinach-250g.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Cherry Tomatoes 500g",
        price: 4.49,
        inventory: 90,
        description: "Sweet cherry tomatoes in a 500g punnet for salads, pasta, and roasting trays.",
        assetPath: "/images/products/greenbasket/cherry-tomatoes-500g.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1615840977596-a68240c14d03?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Avocado (2 pack)",
        price: 3.79,
        inventory: 35,
        description: "Two ripe Hass avocados for toast, salads, and grain bowls.",
        assetPath: "/images/products/greenbasket/avocado-2-pack.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1704960961383-67dd63756199?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Brown Rice 1kg",
        price: 4.29,
        inventory: 42,
        description: "Whole grain brown rice in a 1kg bag for bowls, sides, and batch cooking.",
        assetPath: "/images/products/greenbasket/brown-rice-1kg.jpg",
        sourceUrl:
          "https://images.unsplash.com/photo-1747518596416-2da5e5218d83?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Family Fare",
    slug: "family-fare",
    email: "family@shopsmart.local",
    industry: "Family Grocer",
    description:
      "Protein picks, freezer favorites, bulk produce, and family-size grocery staples.",
    products: [
      {
        name: "Angus Beef Strip Steaks 2 ct",
        price: 18.99,
        inventory: 34,
        description: "Well-marbled strip steaks ready for the grill or cast iron pan.",
        assetPath:
          "/images/products/family-fare/angus-beef-strip-steaks-2ct.webp",
        sourceUrl: groceryImage("beef-steak"),
      },
      {
        name: "Boneless Chicken Breast Fillets",
        price: 12.49,
        inventory: 52,
        description: "Lean chicken breast fillets trimmed for batch cooking and dinners.",
        assetPath:
          "/images/products/family-fare/boneless-chicken-breast-fillets.webp",
        sourceUrl: groceryImage("chicken-meat"),
      },
      {
        name: "Atlantic Salmon Portions",
        price: 16.99,
        inventory: 29,
        description: "Fresh-cut salmon portions for sheet pan dinners and rice bowls.",
        assetPath: "/images/products/family-fare/atlantic-salmon-portions.webp",
        sourceUrl: groceryImage("fish-steak"),
      },
      {
        name: "Vanilla Bean Ice Cream Pint",
        price: 5.79,
        inventory: 41,
        description: "A creamy vanilla pint for sundaes, pies, and late-night cravings.",
        assetPath:
          "/images/products/family-fare/vanilla-bean-ice-cream-pint.webp",
        sourceUrl: groceryImage("ice-cream"),
      },
      {
        name: "Fresh Mulberries 6 oz",
        price: 4.59,
        inventory: 37,
        description: "Delicate mulberries for snacking, yogurt bowls, and fruit salads.",
        assetPath: "/images/products/family-fare/fresh-mulberries-6oz.webp",
        sourceUrl: groceryImage("mulberry"),
      },
      {
        name: "Yukon Gold Potatoes 3 lb",
        price: 3.99,
        inventory: 68,
        description: "Creamy potatoes that roast, mash, and crisp up beautifully.",
        assetPath: "/images/products/family-fare/yukon-gold-potatoes-3lb.webp",
        sourceUrl: groceryImage("potatoes"),
      },
      {
        name: "Whey Protein Vanilla 1 kg",
        price: 24.99,
        inventory: 22,
        description: "Vanilla whey blend for smoothies, overnight oats, and recovery shakes.",
        assetPath: "/images/products/family-fare/whey-protein-vanilla-1kg.webp",
        sourceUrl: groceryImage("protein-powder"),
      },
      {
        name: "Soft Drinks Variety Pack 12 ct",
        price: 7.99,
        inventory: 45,
        description: "Mixed sparkling soft drinks for gatherings, lunches, and movie nights.",
        assetPath:
          "/images/products/family-fare/soft-drinks-variety-pack-12ct.webp",
        sourceUrl: groceryImage("soft-drinks"),
      },
    ],
  },
  {
    name: "Ready Table",
    slug: "ready-table",
    email: "readytable@shopsmart.local",
    industry: "Prepared Meals",
    description:
      "Heat-and-eat dinners, pasta bowls, curries, and quick mains for busy nights.",
    products: [
      {
        name: "Stone Oven Margherita Pizza",
        price: 11.99,
        inventory: 38,
        description: "A crisp stone-oven pizza topped with tomato, mozzarella, and basil.",
        assetPath: "/images/products/ready-table/stone-oven-margherita-pizza.webp",
        sourceUrl: recipeImage(45),
      },
      {
        name: "Chicken Alfredo Pasta Bake",
        price: 13.49,
        inventory: 31,
        description: "Creamy Alfredo pasta with chicken in an easy oven-ready tray.",
        assetPath:
          "/images/products/ready-table/chicken-alfredo-pasta-bake.webp",
        sourceUrl: recipeImage(4),
      },
      {
        name: "Beef & Broccoli Stir-Fry Kit",
        price: 14.99,
        inventory: 27,
        description: "Sauced beef and broccoli stir-fry built for a fast skillet dinner.",
        assetPath:
          "/images/products/ready-table/beef-and-broccoli-stir-fry-kit.webp",
        sourceUrl: recipeImage(8),
      },
      {
        name: "Garlic Shrimp Scampi Pasta",
        price: 15.49,
        inventory: 24,
        description: "Garlicky shrimp pasta with lemony sauce and weeknight ease.",
        assetPath:
          "/images/products/ready-table/garlic-shrimp-scampi-pasta.webp",
        sourceUrl: recipeImage(10),
      },
      {
        name: "Chicken Biryani Family Tray",
        price: 16.99,
        inventory: 18,
        description: "A fragrant basmati and chicken biryani tray sized for sharing.",
        assetPath:
          "/images/products/ready-table/chicken-biryani-family-tray.webp",
        sourceUrl: recipeImage(11),
      },
      {
        name: "Homestyle Chicken Karahi",
        price: 15.99,
        inventory: 19,
        description: "Tomato-rich chicken karahi with warming spices and bold flavor.",
        assetPath:
          "/images/products/ready-table/homestyle-chicken-karahi.webp",
        sourceUrl: recipeImage(12),
      },
      {
        name: "Butter Chicken Rice Bowl",
        price: 14.49,
        inventory: 26,
        description: "Creamy butter chicken paired with fluffy rice for an easy dinner.",
        assetPath:
          "/images/products/ready-table/butter-chicken-rice-bowl.webp",
        sourceUrl: recipeImage(20),
      },
      {
        name: "Thai Green Curry Bowl",
        price: 13.99,
        inventory: 23,
        description: "A bright green curry bowl with herbs, vegetables, and rich coconut.",
        assetPath: "/images/products/ready-table/thai-green-curry-bowl.webp",
        sourceUrl: recipeImage(21),
      },
    ],
  },
  {
    name: "Green Spoon",
    slug: "green-spoon",
    email: "greenspoon@shopsmart.local",
    industry: "Fresh Deli",
    description:
      "Fresh salads, grain bowls, wraps, and lighter prepared foods for everyday lunches.",
    products: [
      {
        name: "Vegetarian Stir-Fry Bowl",
        price: 11.49,
        inventory: 33,
        description: "Colorful stir-fried vegetables in a fast lunch-ready bowl.",
        assetPath:
          "/images/products/green-spoon/vegetarian-stir-fry-bowl.webp",
        sourceUrl: recipeImage(2),
      },
      {
        name: "Quinoa Salad with Avocado",
        price: 10.99,
        inventory: 29,
        description: "Herby quinoa, creamy avocado, and a citrusy dressing.",
        assetPath:
          "/images/products/green-spoon/quinoa-salad-with-avocado.webp",
        sourceUrl: recipeImage(6),
      },
      {
        name: "Caprese Salad Bowl",
        price: 10.49,
        inventory: 28,
        description: "Tomato, mozzarella, and basil finished with a light drizzle.",
        assetPath: "/images/products/green-spoon/caprese-salad-bowl.webp",
        sourceUrl: recipeImage(9),
      },
      {
        name: "Moroccan Chickpea Tagine",
        price: 12.99,
        inventory: 22,
        description: "A warmly spiced chickpea tagine with vegetables and savory depth.",
        assetPath:
          "/images/products/green-spoon/moroccan-chickpea-tagine.webp",
        sourceUrl: recipeImage(17),
      },
      {
        name: "Mediterranean Quinoa Salad",
        price: 11.29,
        inventory: 27,
        description: "A deli-style quinoa salad loaded with fresh Mediterranean flavors.",
        assetPath:
          "/images/products/green-spoon/mediterranean-quinoa-salad.webp",
        sourceUrl: recipeImage(33),
      },
      {
        name: "Cucumber Avocado Rolls",
        price: 9.99,
        inventory: 25,
        description: "Fresh rolls packed with cool cucumber and creamy avocado.",
        assetPath:
          "/images/products/green-spoon/cucumber-avocado-rolls.webp",
        sourceUrl: recipeImage(48),
      },
      {
        name: "Mediterranean Chickpea Salad",
        price: 10.79,
        inventory: 31,
        description: "Chickpeas, herbs, and vegetables tossed for a quick lunch side.",
        assetPath:
          "/images/products/green-spoon/mediterranean-chickpea-salad.webp",
        sourceUrl: recipeImage(49),
      },
      {
        name: "Mango Avocado Salsa",
        price: 8.99,
        inventory: 35,
        description: "Bright mango and avocado salsa for chips, bowls, and tacos.",
        assetPath: "/images/products/green-spoon/mango-avocado-salsa.webp",
        sourceUrl: recipeImage(43),
      },
    ],
  },
  {
    name: "Oven & Crumb",
    slug: "oven-and-crumb",
    email: "oven@shopsmart.local",
    industry: "Bakery & Cafe",
    description:
      "Bakery favorites, cafe-style sides, desserts, and grab-and-go comfort food.",
    products: [
      {
        name: "Chocolate Chip Cookies 6-pack",
        price: 6.49,
        inventory: 56,
        description: "Soft-baked cookies with rich chocolate chips and crisp edges.",
        assetPath:
          "/images/products/oven-and-crumb/chocolate-chip-cookies-6-pack.webp",
        sourceUrl: recipeImage(3),
      },
      {
        name: "Tomato Basil Bruschetta Tray",
        price: 8.49,
        inventory: 32,
        description: "A bakery counter bruschetta tray with toasted bread and ripe tomatoes.",
        assetPath:
          "/images/products/oven-and-crumb/tomato-basil-bruschetta-tray.webp",
        sourceUrl: recipeImage(7),
      },
      {
        name: "Classic Italian Tiramisu",
        price: 9.99,
        inventory: 21,
        description: "Layered tiramisu with espresso notes and a creamy mascarpone finish.",
        assetPath:
          "/images/products/oven-and-crumb/classic-italian-tiramisu.webp",
        sourceUrl: recipeImage(23),
      },
      {
        name: "Blueberry Banana Smoothie",
        price: 6.99,
        inventory: 40,
        description: "A cafe-style smoothie blended with banana, blueberry, and yogurt.",
        assetPath:
          "/images/products/oven-and-crumb/blueberry-banana-smoothie.webp",
        sourceUrl: recipeImage(25),
      },
      {
        name: "Mexican Street Corn Cups",
        price: 7.49,
        inventory: 30,
        description: "Roasted street corn packed into easy grab-and-go cups.",
        assetPath:
          "/images/products/oven-and-crumb/mexican-street-corn-cups.webp",
        sourceUrl: recipeImage(26),
      },
      {
        name: "Lebanese Falafel Wrap",
        price: 9.49,
        inventory: 28,
        description: "A fresh falafel wrap layered with herbs, veg, and creamy sauce.",
        assetPath:
          "/images/products/oven-and-crumb/lebanese-falafel-wrap.webp",
        sourceUrl: recipeImage(29),
      },
      {
        name: "Greek Spanakopita Triangles",
        price: 8.99,
        inventory: 26,
        description: "Flaky spinach-and-feta pastry triangles from the savory case.",
        assetPath:
          "/images/products/oven-and-crumb/greek-spanakopita-triangles.webp",
        sourceUrl: recipeImage(38),
      },
      {
        name: "Pesto Pasta with Cherry Tomatoes",
        price: 10.99,
        inventory: 34,
        description: "Bright pesto pasta finished with roasted cherry tomatoes.",
        assetPath:
          "/images/products/oven-and-crumb/pesto-pasta-with-cherry-tomatoes.webp",
        sourceUrl: recipeImage(46),
      },
    ],
  },
];
