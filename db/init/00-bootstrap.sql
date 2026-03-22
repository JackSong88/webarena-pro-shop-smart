USE onestopshop;

DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS stores;

CREATE TABLE stores (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  store_name VARCHAR(40),
  industry TEXT,
  description TEXT,
  slug VARCHAR(50),
  UNIQUE KEY store_name_index (store_name),
  UNIQUE KEY store_slug_index (slug)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  email VARCHAR(191),
  password_hash TEXT,
  store_id INT NULL,
  created_at INT,
  UNIQUE KEY user_email_index (email)
);

CREATE TABLE sessions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  session_token VARCHAR(191),
  user_id INT,
  expires_at INT,
  UNIQUE KEY session_token_index (session_token)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  price DECIMAL(10, 2) DEFAULT 0,
  description TEXT,
  inventory DECIMAL(10, 0) DEFAULT 0,
  images JSON,
  store_id INT
);

CREATE TABLE carts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  items JSON,
  payment_intent_id TEXT,
  client_secret TEXT,
  is_closed BOOLEAN DEFAULT FALSE
);

CREATE TABLE payments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  store_id INT,
  stripe_account_id TEXT,
  stripe_account_created_at INT,
  stripe_account_expires_at INT,
  details_submitted BOOLEAN DEFAULT FALSE
);

CREATE TABLE addresses (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  line1 TEXT,
  line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT
);

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pretty_order_id INT,
  store_id INT,
  user_id INT NULL,
  items JSON,
  total DECIMAL(10, 2) DEFAULT 0,
  stripe_payment_intent_id VARCHAR(256),
  stripe_payment_intent_status TEXT,
  name TEXT,
  email TEXT,
  created_at INT,
  address INT,
  UNIQUE KEY stripe_payment_intent_id_index (stripe_payment_intent_id)
);

INSERT INTO stores (store_name, industry, description, slug)
VALUES
  ('Orchard Market', 'Produce Market', 'Peak-season fruit, greens, herbs, and produce-box essentials for the week ahead.', 'orchard-market'),
  ('Pantry Lane', 'Pantry & Drinks', 'Shelf staples, breakfast basics, drinks, and everyday pantry refills in one stop.', 'pantry-lane'),
  ('FreshMart', 'Neighborhood Grocery', 'Everyday grocery basics with fruit, dairy, eggs, and bakery staples for fast weekly orders.', 'freshmart'),
  ('GreenBasket', 'Organic Grocer', 'Organic produce and pantry staples curated for lighter cooking, meal prep, and low-waste baskets.', 'greenbasket'),
  ('Family Fare', 'Family Grocer', 'Protein picks, freezer favorites, bulk produce, and family-size grocery staples.', 'family-fare'),
  ('Ready Table', 'Prepared Meals', 'Heat-and-eat dinners, pasta bowls, curries, and quick mains for busy nights.', 'ready-table'),
  ('Green Spoon', 'Fresh Deli', 'Fresh salads, grain bowls, wraps, and lighter prepared foods for everyday lunches.', 'green-spoon'),
  ('Oven & Crumb', 'Bakery & Cafe', 'Bakery favorites, cafe-style sides, desserts, and grab-and-go comfort food.', 'oven-and-crumb');

INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  ('Organic Gala Apples 2 lb', 3.49, 'Crisp organic Gala apples in a family-size 2 lb bag.', 120, '[{"id":"organic-gala-apples-2lb","url":"/images/products/orchard-market/organic-gala-apples-2lb.webp","alt":"Organic Gala Apples 2 lb"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Mini Cucumbers 6-pack', 2.79, 'Snack-size cucumbers with a fresh crunch and thin skin.', 95, '[{"id":"mini-cucumbers-6-pack","url":"/images/products/orchard-market/mini-cucumbers-6-pack.webp","alt":"Mini Cucumbers 6-pack"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Green Bell Peppers 3-pack', 3.29, 'Sweet green bell peppers for salads, fajitas, and stir-fries.', 88, '[{"id":"green-bell-peppers-3-pack","url":"/images/products/orchard-market/green-bell-peppers-3-pack.webp","alt":"Green Bell Peppers 3-pack"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Hot Green Chili Peppers 8 oz', 2.19, 'Bright, punchy chili peppers for sauces, tacos, and salsas.', 70, '[{"id":"hot-green-chili-peppers-8oz","url":"/images/products/orchard-market/hot-green-chili-peppers-8oz.webp","alt":"Hot Green Chili Peppers 8 oz"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Gold Kiwi 4-pack', 4.29, 'Sweet-tart golden kiwis with smooth flesh and tropical flavor.', 64, '[{"id":"gold-kiwi-4-pack","url":"/images/products/orchard-market/gold-kiwi-4-pack.webp","alt":"Gold Kiwi 4-pack"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Meyer Lemons 1 lb bag', 2.49, 'Juicy lemons for dressings, drinks, and weeknight cooking.', 80, '[{"id":"meyer-lemons-1lb-bag","url":"/images/products/orchard-market/meyer-lemons-1lb-bag.webp","alt":"Meyer Lemons 1 lb bag"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Red Onions 2 lb', 2.99, 'Sharp, colorful onions that roast beautifully or slice raw.', 92, '[{"id":"red-onions-2lb","url":"/images/products/orchard-market/red-onions-2lb.webp","alt":"Red Onions 2 lb"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Strawberries 16 oz', 4.99, 'Sweet strawberries picked for smoothies, cereal, and dessert.', 76, '[{"id":"strawberries-16oz","url":"/images/products/orchard-market/strawberries-16oz.webp","alt":"Strawberries 16 oz"}]', (SELECT id FROM stores WHERE slug = 'orchard-market')),
  ('Extra Virgin Cooking Oil 1L', 7.49, 'Versatile cooking oil for roasting, sauteing, and meal prep.', 58, '[{"id":"extra-virgin-cooking-oil-1l","url":"/images/products/pantry-lane/extra-virgin-cooking-oil-1l.webp","alt":"Extra Virgin Cooking Oil 1L"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Free-Range Brown Eggs 12 ct', 5.29, 'A dozen brown eggs for breakfast scrambles and baking days.', 84, '[{"id":"free-range-brown-eggs-12ct","url":"/images/products/pantry-lane/free-range-brown-eggs-12ct.webp","alt":"Free-Range Brown Eggs 12 ct"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Wildflower Honey 12 oz', 6.79, 'Floral honey that works in tea, yogurt bowls, and marinades.', 48, '[{"id":"wildflower-honey-12oz","url":"/images/products/pantry-lane/wildflower-honey-12oz.webp","alt":"Wildflower Honey 12 oz"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Cold-Pressed Orange Juice 52 oz', 5.99, 'Bright citrus juice chilled and ready for breakfast service.', 66, '[{"id":"cold-pressed-orange-juice-52oz","url":"/images/products/pantry-lane/cold-pressed-orange-juice-52oz.webp","alt":"Cold-Pressed Orange Juice 52 oz"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Whole Milk 2L', 4.39, 'Fresh whole milk for coffee, cereal, baking, and sauces.', 73, '[{"id":"whole-milk-2l","url":"/images/products/pantry-lane/whole-milk-2l.webp","alt":"Whole Milk 2L"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Instant Coffee Classic Roast', 8.49, 'Smooth instant coffee with a balanced roast and easy prep.', 42, '[{"id":"instant-coffee-classic-roast","url":"/images/products/pantry-lane/instant-coffee-classic-roast.webp","alt":"Instant Coffee Classic Roast"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Long Grain White Rice 2 lb', 4.89, 'Reliable long grain rice for weeknight bowls and side dishes.', 90, '[{"id":"long-grain-white-rice-2lb","url":"/images/products/pantry-lane/long-grain-white-rice-2lb.webp","alt":"Long Grain White Rice 2 lb"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Sparkling Spring Water 12 ct', 6.49, 'A chilled 12-pack of crisp sparkling water for the fridge.', 61, '[{"id":"sparkling-spring-water-12ct","url":"/images/products/pantry-lane/sparkling-spring-water-12ct.webp","alt":"Sparkling Spring Water 12 ct"}]', (SELECT id FROM stores WHERE slug = 'pantry-lane')),
  ('Organic Bananas', 2.99, 'Ripe organic bananas sold per bunch for breakfast and lunchboxes.', 100, '[{"id":"organic-bananas","url":"/images/products/freshmart/organic-bananas.jpg","alt":"Organic Bananas"}]', (SELECT id FROM stores WHERE slug = 'freshmart')),
  ('Whole Milk 2L', 4.49, 'Fresh whole milk in a 2 litre bottle for cereal, coffee, and baking.', 80, '[{"id":"whole-milk-2l","url":"/images/products/freshmart/whole-milk-2l.jpg","alt":"Whole Milk 2L"}]', (SELECT id FROM stores WHERE slug = 'freshmart')),
  ('Free-Range Eggs (12 pack)', 5.29, 'Large free-range brown eggs, ready for breakfast scrambles and baking.', 24, '[{"id":"free-range-eggs-12-pack","url":"/images/products/freshmart/free-range-eggs-12-pack.jpg","alt":"Free-Range Eggs (12 pack)"}]', (SELECT id FROM stores WHERE slug = 'freshmart')),
  ('Sourdough Bread Loaf', 3.99, 'Crusty sourdough bread loaf baked daily for toast, sandwiches, and soups.', 18, '[{"id":"sourdough-bread-loaf","url":"/images/products/freshmart/sourdough-bread-loaf.jpg","alt":"Sourdough Bread Loaf"}]', (SELECT id FROM stores WHERE slug = 'freshmart')),
  ('Organic Spinach 250g', 3.99, 'Fresh organic spinach leaves in a 250g bag for smoothies, salads, and sautees.', 70, '[{"id":"organic-spinach-250g","url":"/images/products/greenbasket/organic-spinach-250g.jpg","alt":"Organic Spinach 250g"}]', (SELECT id FROM stores WHERE slug = 'greenbasket')),
  ('Cherry Tomatoes 500g', 4.49, 'Sweet cherry tomatoes in a 500g punnet for salads, pasta, and roasting trays.', 90, '[{"id":"cherry-tomatoes-500g","url":"/images/products/greenbasket/cherry-tomatoes-500g.jpg","alt":"Cherry Tomatoes 500g"}]', (SELECT id FROM stores WHERE slug = 'greenbasket')),
  ('Avocado (2 pack)', 3.79, 'Two ripe Hass avocados for toast, salads, and grain bowls.', 35, '[{"id":"avocado-2-pack","url":"/images/products/greenbasket/avocado-2-pack.jpg","alt":"Avocado (2 pack)"}]', (SELECT id FROM stores WHERE slug = 'greenbasket')),
  ('Brown Rice 1kg', 4.29, 'Whole grain brown rice in a 1kg bag for bowls, sides, and batch cooking.', 42, '[{"id":"brown-rice-1kg","url":"/images/products/greenbasket/brown-rice-1kg.jpg","alt":"Brown Rice 1kg"}]', (SELECT id FROM stores WHERE slug = 'greenbasket')),
  ('Angus Beef Strip Steaks 2 ct', 18.99, 'Well-marbled strip steaks ready for the grill or cast iron pan.', 34, '[{"id":"angus-beef-strip-steaks-2ct","url":"/images/products/family-fare/angus-beef-strip-steaks-2ct.webp","alt":"Angus Beef Strip Steaks 2 ct"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Boneless Chicken Breast Fillets', 12.49, 'Lean chicken breast fillets trimmed for batch cooking and dinners.', 52, '[{"id":"boneless-chicken-breast-fillets","url":"/images/products/family-fare/boneless-chicken-breast-fillets.webp","alt":"Boneless Chicken Breast Fillets"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Atlantic Salmon Portions', 16.99, 'Fresh-cut salmon portions for sheet pan dinners and rice bowls.', 29, '[{"id":"atlantic-salmon-portions","url":"/images/products/family-fare/atlantic-salmon-portions.webp","alt":"Atlantic Salmon Portions"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Vanilla Bean Ice Cream Pint', 5.79, 'A creamy vanilla pint for sundaes, pies, and late-night cravings.', 41, '[{"id":"vanilla-bean-ice-cream-pint","url":"/images/products/family-fare/vanilla-bean-ice-cream-pint.webp","alt":"Vanilla Bean Ice Cream Pint"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Fresh Mulberries 6 oz', 4.59, 'Delicate mulberries for snacking, yogurt bowls, and fruit salads.', 37, '[{"id":"fresh-mulberries-6oz","url":"/images/products/family-fare/fresh-mulberries-6oz.webp","alt":"Fresh Mulberries 6 oz"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Yukon Gold Potatoes 3 lb', 3.99, 'Creamy potatoes that roast, mash, and crisp up beautifully.', 68, '[{"id":"yukon-gold-potatoes-3lb","url":"/images/products/family-fare/yukon-gold-potatoes-3lb.webp","alt":"Yukon Gold Potatoes 3 lb"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Whey Protein Vanilla 1 kg', 24.99, 'Vanilla whey blend for smoothies, overnight oats, and recovery shakes.', 22, '[{"id":"whey-protein-vanilla-1kg","url":"/images/products/family-fare/whey-protein-vanilla-1kg.webp","alt":"Whey Protein Vanilla 1 kg"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Soft Drinks Variety Pack 12 ct', 7.99, 'Mixed sparkling soft drinks for gatherings, lunches, and movie nights.', 45, '[{"id":"soft-drinks-variety-pack-12ct","url":"/images/products/family-fare/soft-drinks-variety-pack-12ct.webp","alt":"Soft Drinks Variety Pack 12 ct"}]', (SELECT id FROM stores WHERE slug = 'family-fare')),
  ('Stone Oven Margherita Pizza', 11.99, 'A crisp stone-oven pizza topped with tomato, mozzarella, and basil.', 38, '[{"id":"stone-oven-margherita-pizza","url":"/images/products/ready-table/stone-oven-margherita-pizza.webp","alt":"Stone Oven Margherita Pizza"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Chicken Alfredo Pasta Bake', 13.49, 'Creamy Alfredo pasta with chicken in an easy oven-ready tray.', 31, '[{"id":"chicken-alfredo-pasta-bake","url":"/images/products/ready-table/chicken-alfredo-pasta-bake.webp","alt":"Chicken Alfredo Pasta Bake"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Beef & Broccoli Stir-Fry Kit', 14.99, 'Sauced beef and broccoli stir-fry built for a fast skillet dinner.', 27, '[{"id":"beef-and-broccoli-stir-fry-kit","url":"/images/products/ready-table/beef-and-broccoli-stir-fry-kit.webp","alt":"Beef & Broccoli Stir-Fry Kit"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Garlic Shrimp Scampi Pasta', 15.49, 'Garlicky shrimp pasta with lemony sauce and weeknight ease.', 24, '[{"id":"garlic-shrimp-scampi-pasta","url":"/images/products/ready-table/garlic-shrimp-scampi-pasta.webp","alt":"Garlic Shrimp Scampi Pasta"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Chicken Biryani Family Tray', 16.99, 'A fragrant basmati and chicken biryani tray sized for sharing.', 18, '[{"id":"chicken-biryani-family-tray","url":"/images/products/ready-table/chicken-biryani-family-tray.webp","alt":"Chicken Biryani Family Tray"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Homestyle Chicken Karahi', 15.99, 'Tomato-rich chicken karahi with warming spices and bold flavor.', 19, '[{"id":"homestyle-chicken-karahi","url":"/images/products/ready-table/homestyle-chicken-karahi.webp","alt":"Homestyle Chicken Karahi"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Butter Chicken Rice Bowl', 14.49, 'Creamy butter chicken paired with fluffy rice for an easy dinner.', 26, '[{"id":"butter-chicken-rice-bowl","url":"/images/products/ready-table/butter-chicken-rice-bowl.webp","alt":"Butter Chicken Rice Bowl"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Thai Green Curry Bowl', 13.99, 'A bright green curry bowl with herbs, vegetables, and rich coconut.', 23, '[{"id":"thai-green-curry-bowl","url":"/images/products/ready-table/thai-green-curry-bowl.webp","alt":"Thai Green Curry Bowl"}]', (SELECT id FROM stores WHERE slug = 'ready-table')),
  ('Vegetarian Stir-Fry Bowl', 11.49, 'Colorful stir-fried vegetables in a fast lunch-ready bowl.', 33, '[{"id":"vegetarian-stir-fry-bowl","url":"/images/products/green-spoon/vegetarian-stir-fry-bowl.webp","alt":"Vegetarian Stir-Fry Bowl"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Quinoa Salad with Avocado', 10.99, 'Herby quinoa, creamy avocado, and a citrusy dressing.', 29, '[{"id":"quinoa-salad-with-avocado","url":"/images/products/green-spoon/quinoa-salad-with-avocado.webp","alt":"Quinoa Salad with Avocado"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Caprese Salad Bowl', 10.49, 'Tomato, mozzarella, and basil finished with a light drizzle.', 28, '[{"id":"caprese-salad-bowl","url":"/images/products/green-spoon/caprese-salad-bowl.webp","alt":"Caprese Salad Bowl"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Moroccan Chickpea Tagine', 12.99, 'A warmly spiced chickpea tagine with vegetables and savory depth.', 22, '[{"id":"moroccan-chickpea-tagine","url":"/images/products/green-spoon/moroccan-chickpea-tagine.webp","alt":"Moroccan Chickpea Tagine"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Mediterranean Quinoa Salad', 11.29, 'A deli-style quinoa salad loaded with fresh Mediterranean flavors.', 27, '[{"id":"mediterranean-quinoa-salad","url":"/images/products/green-spoon/mediterranean-quinoa-salad.webp","alt":"Mediterranean Quinoa Salad"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Cucumber Avocado Rolls', 9.99, 'Fresh rolls packed with cool cucumber and creamy avocado.', 25, '[{"id":"cucumber-avocado-rolls","url":"/images/products/green-spoon/cucumber-avocado-rolls.webp","alt":"Cucumber Avocado Rolls"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Mediterranean Chickpea Salad', 10.79, 'Chickpeas, herbs, and vegetables tossed for a quick lunch side.', 31, '[{"id":"mediterranean-chickpea-salad","url":"/images/products/green-spoon/mediterranean-chickpea-salad.webp","alt":"Mediterranean Chickpea Salad"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Mango Avocado Salsa', 8.99, 'Bright mango and avocado salsa for chips, bowls, and tacos.', 35, '[{"id":"mango-avocado-salsa","url":"/images/products/green-spoon/mango-avocado-salsa.webp","alt":"Mango Avocado Salsa"}]', (SELECT id FROM stores WHERE slug = 'green-spoon')),
  ('Chocolate Chip Cookies 6-pack', 6.49, 'Soft-baked cookies with rich chocolate chips and crisp edges.', 56, '[{"id":"chocolate-chip-cookies-6-pack","url":"/images/products/oven-and-crumb/chocolate-chip-cookies-6-pack.webp","alt":"Chocolate Chip Cookies 6-pack"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb')),
  ('Tomato Basil Bruschetta Tray', 8.49, 'A bakery counter bruschetta tray with toasted bread and ripe tomatoes.', 32, '[{"id":"tomato-basil-bruschetta-tray","url":"/images/products/oven-and-crumb/tomato-basil-bruschetta-tray.webp","alt":"Tomato Basil Bruschetta Tray"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb')),
  ('Classic Italian Tiramisu', 9.99, 'Layered tiramisu with espresso notes and a creamy mascarpone finish.', 21, '[{"id":"classic-italian-tiramisu","url":"/images/products/oven-and-crumb/classic-italian-tiramisu.webp","alt":"Classic Italian Tiramisu"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb')),
  ('Blueberry Banana Smoothie', 6.99, 'A cafe-style smoothie blended with banana, blueberry, and yogurt.', 40, '[{"id":"blueberry-banana-smoothie","url":"/images/products/oven-and-crumb/blueberry-banana-smoothie.webp","alt":"Blueberry Banana Smoothie"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb')),
  ('Mexican Street Corn Cups', 7.49, 'Roasted street corn packed into easy grab-and-go cups.', 30, '[{"id":"mexican-street-corn-cups","url":"/images/products/oven-and-crumb/mexican-street-corn-cups.webp","alt":"Mexican Street Corn Cups"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb')),
  ('Lebanese Falafel Wrap', 9.49, 'A fresh falafel wrap layered with herbs, veg, and creamy sauce.', 28, '[{"id":"lebanese-falafel-wrap","url":"/images/products/oven-and-crumb/lebanese-falafel-wrap.webp","alt":"Lebanese Falafel Wrap"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb')),
  ('Greek Spanakopita Triangles', 8.99, 'Flaky spinach-and-feta pastry triangles from the savory case.', 26, '[{"id":"greek-spanakopita-triangles","url":"/images/products/oven-and-crumb/greek-spanakopita-triangles.webp","alt":"Greek Spanakopita Triangles"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb')),
  ('Pesto Pasta with Cherry Tomatoes', 10.99, 'Bright pesto pasta finished with roasted cherry tomatoes.', 34, '[{"id":"pesto-pasta-with-cherry-tomatoes","url":"/images/products/oven-and-crumb/pesto-pasta-with-cherry-tomatoes.webp","alt":"Pesto Pasta with Cherry Tomatoes"}]', (SELECT id FROM stores WHERE slug = 'oven-and-crumb'));

INSERT INTO users (name, email, password_hash, store_id, created_at)
VALUES
  ('Demo Buyer', 'buyer@shopsmart.local', 'cb8e410fc0d517520d05c38b0bc25243:091a527d3595b8bd2c93c5129b83363fa786417d9eb40f0f42693e10b5f307a655063a8fbfa5697d825ef4edb6ca1e184af3dd304bcdaa2ab21ab30eb3dd4e94', NULL, UNIX_TIMESTAMP()),
  ('Orchard Market Seller', 'orchard@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'orchard-market'), UNIX_TIMESTAMP()),
  ('Pantry Lane Seller', 'pantry@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'pantry-lane'), UNIX_TIMESTAMP()),
  ('FreshMart Seller', 'freshmart@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'freshmart'), UNIX_TIMESTAMP()),
  ('GreenBasket Seller', 'greenbasket@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'greenbasket'), UNIX_TIMESTAMP()),
  ('Family Fare Seller', 'family@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'family-fare'), UNIX_TIMESTAMP()),
  ('Ready Table Seller', 'readytable@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'ready-table'), UNIX_TIMESTAMP()),
  ('Green Spoon Seller', 'greenspoon@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'green-spoon'), UNIX_TIMESTAMP()),
  ('Oven & Crumb Seller', 'oven@shopsmart.local', '456a6918668c20e44ccd0129385afdd8:6afaf4c3a3b13023157ac0bab318e77ef05c4cfa8cd5751b10f095a000288de4e77cb82ba5b8e64db2202a527b41d1bd03fd8918268c25a66a6e9ec911a8309c', (SELECT id FROM stores WHERE slug = 'oven-and-crumb'), UNIX_TIMESTAMP());
