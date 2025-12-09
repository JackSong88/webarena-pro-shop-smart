-- team_seed.sql (clean version)
USE onestopshop;

-- ======================
-- STORES
-- ======================
INSERT INTO stores (store_name, industry, description, slug)
VALUES
  ('FreshMart', 'Groceries', 'Your friendly neighborhood grocery store.', 'freshmart'),
  ('GreenBasket', 'Groceries', 'Organic and sustainable groceries delivered to you.', 'greenbasket'),
  ('TechZone', 'Electronics', 'Latest gadgets, phones and accessories.', 'techzone'),
  ('StyleHub', 'Fashion', 'Trendy clothing and everyday essentials.', 'stylehub'),
  ('HomeEssentials', 'Home & Kitchen', 'Everything your home needs.', 'home-essentials')

ON DUPLICATE KEY UPDATE
  store_name = VALUES(store_name),
  industry = VALUES(industry),
  description = VALUES(description);

-- ======================
-- FRESHMART PRODUCTS (Groceries)
-- ======================
INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  (
    'Organic Bananas',
    2.99,
    'Ripe organic bananas, sold per bunch.',
    100,
    '[{"id":"banana-1","url":"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80","alt":"Organic bananas"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Whole Milk 2L',
    4.49,
    'Fresh whole milk, 2 litre bottle.',
    80,
    '[{"id":"milk-1","url":"https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80","alt":"Bottle of milk"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Free-Range Eggs (12 pack)',
    5.29,
    'Large free-range brown eggs, pack of 12.',
    15,
    '[{"id":"eggs-1","url":"https://images.unsplash.com/photo-1585355611444-06154f329e96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Eggs in carton"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Sourdough Bread Loaf',
    3.99,
    'Crusty sourdough bread loaf, baked daily.',
    0,
    '[{"id":"bread-1","url":"https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80","alt":"Sourdough bread"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Granny Smith Apples (1kg)',
    4.99,
    'Crisp and tart green apples, 1kg bag.',
    50,
    '[{"id":"apple-1","url":"https://images.unsplash.com/photo-1665242922574-e549f89538ab?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Green apples"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Carrots 1kg',
    2.49,
    'Fresh orange carrots, 1kg bag.',
    75,
    '[{"id":"carrot-1","url":"https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Carrots"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  );

-- ======================
-- GREENBASKET PRODUCTS (Groceries)
-- ======================
INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  (
    'Organic Spinach 250g',
    3.99,
    'Fresh organic spinach leaves, 250g bag.',
    70,
    '[{"id":"spinach-1","url":"https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Organic spinach"}]',
    (SELECT id FROM stores WHERE slug = 'greenbasket')
  ),
  (
    'Cherry Tomatoes 500g',
    4.49,
    'Sweet cherry tomatoes, 500g punnet.',
    90,
    '[{"id":"tomato-1","url":"https://images.unsplash.com/photo-1615840977596-a68240c14d03?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Cherry tomatoes"}]',
    (SELECT id FROM stores WHERE slug = 'greenbasket')
  ),
  (
    'Avocado (2 pack)',
    3.79,
    'Two ripe Hass avocados.',
    12,
    '[{"id":"avocado-1","url":"https://images.unsplash.com/photo-1704960961383-67dd63756199?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Avocados"}]',
    (SELECT id FROM stores WHERE slug = 'greenbasket')
  ),
  (
    'Kale Bunch',
    2.99,
    'Curly kale, great for salads and smoothies.',
    30,
    '[{"id":"kale-1","url":"https://images.unsplash.com/photo-1522193582792-c66cf1cddd16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Kale bunch"}]',
    (SELECT id FROM stores WHERE slug = 'greenbasket')
  ),
  (
    'Brown Rice 1kg',
    4.29,
    'Whole grain brown rice, 1kg bag.',
    0,
    '[{"id":"rice-1","url":"https://images.unsplash.com/photo-1747518596416-2da5e5218d83?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Brown rice"}]',
    (SELECT id FROM stores WHERE slug = 'greenbasket')
  ),
  (
    'Almonds 200g',
    5.99,
    'Raw whole almonds, 200g.',
    25,
    '[{"id":"almonds-1","url":"https://images.unsplash.com/photo-1608797178974-15b35a64ede9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Almonds"}]',
    (SELECT id FROM stores WHERE slug = 'greenbasket')
  );

-- ======================
-- TECHZONE PRODUCTS (Electronics)
-- ======================
INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  (
    'Wireless Headphones',
    89.99,
    'Over-ear wireless headphones with noise cancellation.',
    40,
    '[{"id":"headphones-1","url":"https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Wireless headphones"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Mechanical Keyboard',
    119.00,
    'Compact mechanical keyboard with RGB lighting.',
    30,
    '[{"id":"keyboard-1","url":"https://images.unsplash.com/photo-1602025882379-e01cf08baa51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Mechanical keyboard"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Wireless Mouse',
    29.99,
    'Ergonomic wireless mouse with silent clicks.',
    75,
    '[{"id":"mouse-1","url":"https://images.unsplash.com/photo-1739742473235-34a7bd9b8f87?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Wireless mouse"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    '27-inch 4K Monitor',
    329.00,
    'Ultra HD 4K monitor, ideal for work and gaming.',
    10,
    '[{"id":"monitor-1","url":"https://images.unsplash.com/photo-1570485071395-29b575ea3b4e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"4K monitor"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Laptop Stand',
    34.99,
    'Adjustable aluminum laptop stand.',
    60,
    '[{"id":"stand-1","url":"https://images.unsplash.com/photo-1629317480826-910f729d1709?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Laptop stand"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Portable SSD 1TB',
    129.99,
    'High-speed portable SSD, 1TB capacity.',
    0,
    '[{"id":"ssd-1","url":"https://images.unsplash.com/photo-1721333084686-e13de2ef7247?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Portable SSD"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  );

-- ======================
-- STYLEHUB PRODUCTS (Fashion)
-- ======================
INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  (
    'Basic White T-Shirt',
    14.99,
    'Unisex cotton t-shirt, classic fit.',
    120,
    '[{"id":"tshirt-1","url":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"White t-shirt"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Blue Denim Jeans',
    49.99,
    'Straight-leg blue denim jeans.',
    60,
    '[{"id":"jeans-1","url":"https://images.unsplash.com/photo-1533108676735-30c9bb43fda3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Denim jeans"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Black Hoodie',
    39.99,
    'Cozy black hoodie with front pocket.',
    80,
    '[{"id":"hoodie-1","url":"https://images.unsplash.com/photo-1513789181297-6f2ec112c0bc?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Black hoodie"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'White Sneakers',
    69.99,
    'Minimalist white sneakers for everyday wear.',
    45,
    '[{"id":"sneakers-1","url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"White sneakers"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Blue Denim Jacket',
    79.99,
    'Classic denim jacket in blue wash.',
    20,
    '[{"id":"jacket-1","url":"https://images.unsplash.com/photo-1587155471946-9e8d4d1132fa?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Denim jacket"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Black Dress',
    89.99,
    'Classic little black dress.',
    0,
    '[{"id":"dress-1","url":"https://images.unsplash.com/photo-1599662875272-64de8289f6d8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Black dress"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  );

-- ======================
-- HOMEESSENTIALS PRODUCTS (Home & Kitchen)
-- ======================
INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  (
    'Ceramic Coffee Mug',
    9.99,
    '350ml ceramic coffee mug, dishwasher safe.',
    150,
    '[{"id":"mug-1","url":"https://images.unsplash.com/photo-1616241673111-508b4662c707?q=80&w=1102&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Coffee mug"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Cotton Bath Towel',
    19.99,
    'Soft cotton bath towel, 70x140cm.',
    100,
    '[{"id":"towel-1","url":"https://images.unsplash.com/photo-1639298109207-5a9ccc254481?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Bath towel"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Scented Candle',
    12.99,
    'Lavender scented soy candle, 40h burn time.',
    80,
    '[{"id":"candle-1","url":"https://images.unsplash.com/photo-1603905179139-db12ab535ca9?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Scented candle"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Non-stick Frying Pan 28cm',
    34.99,
    'Non-stick frying pan with ergonomic handle.',
    40,
    '[{"id":"pan-1","url":"https://images.unsplash.com/photo-1592156328697-079f6ee0cfa5?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Frying pan"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Glass Food Containers (Set of 5)',
    39.99,
    'Glass containers with airtight lids.',
    25,
    '[{"id":"container-1","url":"https://images.unsplash.com/photo-1569420077790-afb136b3bb8c?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Glass containers"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Throw Blanket',
    24.99,
    'Soft and cozy throw blanket.',
    0,
    '[{"id":"blanket-1","url":"https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=1117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Throw blanket"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  );
  
  
INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  (
    'Grain-free kitten food',
    32.99,
    'Food for kittens',
    30,
    '[{"id":"banana-1","url":"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80","alt":"Organic bananas"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Whole Milk 2L',
    4.49,
    'Fresh whole milk, 2 litre bottle.',
    80,
    '[{"id":"milk-1","url":"https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80","alt":"Bottle of milk"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Free-Range Eggs (12 pack)',
    5.29,
    'Large free-range brown eggs, pack of 12.',
    15,
    '[{"id":"eggs-1","url":"https://images.unsplash.com/photo-1585355611444-06154f329e96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Eggs in carton"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Sourdough Bread Loaf',
    3.99,
    'Crusty sourdough bread loaf, baked daily.',
    0,
    '[{"id":"bread-1","url":"https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80","alt":"Sourdough bread"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Granny Smith Apples (1kg)',
    4.99,
    'Crisp and tart green apples, 1kg bag.',
    50,
    '[{"id":"apple-1","url":"https://images.unsplash.com/photo-1665242922574-e549f89538ab?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Green apples"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Carrots 1kg',
    2.49,
    'Fresh orange carrots, 1kg bag.',
    75,
    '[{"id":"carrot-1","url":"https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Carrots"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  );
  
  
INSERT INTO stores (store_name, industry, description, slug)
VALUES
  (
    'HappyPaws',
    'Pet Supplies',
    'Everything your dog or cat needs – food, treats, toys and more.',
    'happypaws'
  )
ON DUPLICATE KEY UPDATE
  store_name = VALUES(store_name),
  industry   = VALUES(industry),
  description = VALUES(description);

-- HappyPaws Pet Supply products
INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
  (
    'Grain-Free Dog Kibble 5kg',
    42.99,
    'High-protein grain-free kibble for adult dogs, 5kg bag.',
    25,
    '[{"id":"dogfood-1","url":"https://images.unsplash.com/photo-1714068691210-073dc52c6c1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Dog kibble in a bowl"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Indoor Cat Chicken Recipe 2kg',
    24.49,
    'Complete dry food for indoor cats, chicken flavour, 2kg.',
    40,
    '[{"id":"catfood-1","url":"https://images.unsplash.com/photo-1655210913315-e8147faf7600?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Cat eating from a bowl"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Clumping Cat Litter 10L',
    18.99,
    'Low-dust clumping litter with odour control, 10L bag.',
    12,
    '[{"id":"litter-1","url":"https://images.unsplash.com/photo-1727510160238-3c17eb5e6120?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Cat in litter box"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Rope Tug Toy (Medium Dogs)',
    9.99,
    'Durable rope tug toy, ideal for medium-size dogs.',
    60,
    '[{"id":"rope-1","url":"https://images.unsplash.com/photo-1561920110-d03675bdddbf?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Dog with rope toy"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Catnip Mouse Toy (3-pack)',
    7.49,
    'Soft fabric mouse toys filled with catnip, pack of 3.',
    100,
    '[{"id":"mouse-1","url":"https://images.unsplash.com/photo-1579272602151-d8db35b9468e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Cat playing with toy mouse"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Reflective Dog Leash 1.5m',
    14.99,
    'Nylon leash with reflective stitching and padded handle.',
    35,
    '[{"id":"leash-1","url":"https://images.unsplash.com/photo-1622532305807-e44152333057?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Dog on a leash"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Scratching Post Tower',
    59.99,
    'Multi-level scratching post with perch and hiding spot.',
    8,
    '[{"id":"scratch-1","url":"https://images.unsplash.com/photo-1636543459635-4a2b0e8704de?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Cat on scratching post"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Stainless Steel Pet Bowl (Set of 2)',
    15.49,
    'Non-slip stainless steel bowls, suitable for food and water.',
    50,
    '[{"id":"bowl-1","url":"https://images.unsplash.com/photo-1695023267262-7f4ab64152b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Pet food bowl"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  ),
  (
    'Salmon Training Treats 200g',
    6.99,
    'Soft bite-size salmon treats, perfect for training sessions.',
    0,
    '[{"id":"treats-1","url":"https://images.unsplash.com/photo-1554530700-747e22bb4e56?q=80&w=1002&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"Dog treats in a bowl"}]',
    (SELECT id FROM stores WHERE slug = 'happypaws')
  );

