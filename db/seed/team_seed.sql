-- team_seed.sql (clean version)
USE onestopshop;

-- ======================
-- STORES
-- ======================
INSERT INTO stores (store_name, industry, description, slug)
VALUES
  ('FreshMart', 'Groceries', 'Your friendly neighborhood grocery store.', 'freshmart'),
  ('GreenBasket', 'Groceries', 'Organic and sustainable groceries delivered to you.', 'green-basket'),
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
    '[{"id":"eggs-1","url":"https://images.unsplash.com/photo-1589928063200-991b38693d2e?auto=format&fit=crop&w=800&q=80","alt":"Eggs in carton"}]',
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
    '[{"id":"apple-1","url":"https://images.unsplash.com/photo-1576186726113-3a10e24caa38?auto=format&fit=crop&w=800&q=80","alt":"Green apples"}]',
    (SELECT id FROM stores WHERE slug = 'freshmart')
  ),
  (
    'Carrots 1kg',
    2.49,
    'Fresh orange carrots, 1kg bag.',
    75,
    '[{"id":"carrot-1","url":"https://images.unsplash.com/photo-1518977956815-dee006e1251c?auto=format&fit=crop&w=800&q=80","alt":"Carrots"}]',
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
    '[{"id":"spinach-1","url":"https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=800&q=80","alt":"Organic spinach"}]',
    (SELECT id FROM stores WHERE slug = 'green-basket')
  ),
  (
    'Cherry Tomatoes 500g',
    4.49,
    'Sweet cherry tomatoes, 500g punnet.',
    90,
    '[{"id":"tomato-1","url":"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80","alt":"Cherry tomatoes"}]',
    (SELECT id FROM stores WHERE slug = 'green-basket')
  ),
  (
    'Avocado (2 pack)',
    3.79,
    'Two ripe Hass avocados.',
    12,
    '[{"id":"avocado-1","url":"https://images.unsplash.com/photo-1540202404-1acd4a3ea9c9?auto=format&fit=crop&w=800&q=80","alt":"Avocados"}]',
    (SELECT id FROM stores WHERE slug = 'green-basket')
  ),
  (
    'Kale Bunch',
    2.99,
    'Curly kale, great for salads and smoothies.',
    30,
    '[{"id":"kale-1","url":"https://images.unsplash.com/photo-1524592714635-7044f0b1216b?auto=format&fit=crop&w=800&q=80","alt":"Kale bunch"}]',
    (SELECT id FROM stores WHERE slug = 'green-basket')
  ),
  (
    'Brown Rice 1kg',
    4.29,
    'Whole grain brown rice, 1kg bag.',
    0,
    '[{"id":"rice-1","url":"https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=800&q=80","alt":"Brown rice"}]',
    (SELECT id FROM stores WHERE slug = 'green-basket')
  ),
  (
    'Almonds 200g',
    5.99,
    'Raw whole almonds, 200g.',
    25,
    '[{"id":"almonds-1","url":"https://images.unsplash.com/photo-1571687949920-1a81063f8c3a?auto=format&fit=crop&w=800&q=80","alt":"Almonds"}]',
    (SELECT id FROM stores WHERE slug = 'green-basket')
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
    '[{"id":"headphones-1","url":"https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80","alt":"Wireless headphones"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Mechanical Keyboard',
    119.00,
    'Compact mechanical keyboard with RGB lighting.',
    30,
    '[{"id":"keyboard-1","url":"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80","alt":"Mechanical keyboard"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Wireless Mouse',
    29.99,
    'Ergonomic wireless mouse with silent clicks.',
    75,
    '[{"id":"mouse-1","url":"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80","alt":"Wireless mouse"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    '27-inch 4K Monitor',
    329.00,
    'Ultra HD 4K monitor, ideal for work and gaming.',
    10,
    '[{"id":"monitor-1","url":"https://images.unsplash.com/photo-1512446816042-444d6e9a83de?auto=format&fit=crop&w=800&q=80","alt":"4K monitor"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Laptop Stand',
    34.99,
    'Adjustable aluminum laptop stand.',
    60,
    '[{"id":"stand-1","url":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80","alt":"Laptop stand"}]',
    (SELECT id FROM stores WHERE slug = 'techzone')
  ),
  (
    'Portable SSD 1TB',
    129.99,
    'High-speed portable SSD, 1TB capacity.',
    0,
    '[{"id":"ssd-1","url":"https://images.unsplash.com/photo-1588064622802-8eb724f83f36?auto=format&fit=crop&w=800&q=80","alt":"Portable SSD"}]',
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
    '[{"id":"tshirt-1","url":"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80","alt":"White t-shirt"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Blue Denim Jeans',
    49.99,
    'Straight-leg blue denim jeans.',
    60,
    '[{"id":"jeans-1","url":"https://images.unsplash.com/photo-1532703229231-61c9e3c1e9a0?auto=format&fit=crop&w=800&q=80","alt":"Denim jeans"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Black Hoodie',
    39.99,
    'Cozy black hoodie with front pocket.',
    80,
    '[{"id":"hoodie-1","url":"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80","alt":"Black hoodie"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'White Sneakers',
    69.99,
    'Minimalist white sneakers for everyday wear.',
    45,
    '[{"id":"sneakers-1","url":"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80","alt":"White sneakers"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Blue Denim Jacket',
    79.99,
    'Classic denim jacket in blue wash.',
    20,
    '[{"id":"jacket-1","url":"https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80","alt":"Denim jacket"}]',
    (SELECT id FROM stores WHERE slug = 'stylehub')
  ),
  (
    'Black Dress',
    89.99,
    'Classic little black dress.',
    0,
    '[{"id":"dress-1","url":"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80","alt":"Black dress"}]',
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
    '[{"id":"mug-1","url":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80","alt":"Coffee mug"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Cotton Bath Towel',
    19.99,
    'Soft cotton bath towel, 70x140cm.',
    100,
    '[{"id":"towel-1","url":"https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80","alt":"Bath towel"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Scented Candle',
    12.99,
    'Lavender scented soy candle, 40h burn time.',
    80,
    '[{"id":"candle-1","url":"https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80","alt":"Scented candle"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Non-stick Frying Pan 28cm',
    34.99,
    'Non-stick frying pan with ergonomic handle.',
    40,
    '[{"id":"pan-1","url":"https://images.unsplash.com/photo-1615937691194-96f162443c46?auto=format&fit=crop&w=800&q=80","alt":"Frying pan"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Glass Food Containers (Set of 5)',
    39.99,
    'Glass containers with airtight lids.',
    25,
    '[{"id":"container-1","url":"https://images.unsplash.com/photo-1582058091505-f87a2e55a40b?auto=format&fit=crop&w=800&q=80","alt":"Glass containers"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  ),
  (
    'Throw Blanket',
    24.99,
    'Soft and cozy throw blanket.',
    0,
    '[{"id":"blanket-1","url":"https://images.unsplash.com/photo-1519710884009-2f97c0cba52c?auto=format&fit=crop&w=800&q=80","alt":"Throw blanket"}]',
    (SELECT id FROM stores WHERE slug = 'home-essentials')
  );