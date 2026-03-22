import {
  buyerAccount,
  sellerPasswordHash,
  stores,
} from "./catalog-config.mjs";

const escapeSql = (value) => String(value).replace(/'/g, "''");

const stringLiteral = (value) => `'${escapeSql(value)}'`;

const imageIdFor = (assetPath) =>
  assetPath
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase();

const productRow = (product, storeSlug) => {
  const imagesJson = JSON.stringify([
    {
      id: imageIdFor(product.assetPath),
      url: product.assetPath,
      alt: product.name,
    },
  ]);

  return `  (${stringLiteral(product.name)}, ${product.price.toFixed(2)}, ${stringLiteral(
    product.description
  )}, ${product.inventory}, ${stringLiteral(imagesJson)}, (SELECT id FROM stores WHERE slug = ${stringLiteral(
    storeSlug
  )}))`;
};

const storeRows = stores.map(
  (store) =>
    `  (${stringLiteral(store.name)}, ${stringLiteral(
      store.industry
    )}, ${stringLiteral(store.description)}, ${stringLiteral(store.slug)})`
);

const productRows = stores.flatMap((store) =>
  store.products.map((product) => productRow(product, store.slug))
);

const userRows = [
  `  (${stringLiteral(buyerAccount.name)}, ${stringLiteral(
    buyerAccount.email
  )}, ${stringLiteral(
    buyerAccount.passwordHash
  )}, NULL, UNIX_TIMESTAMP())`,
  ...stores.map(
    (store) =>
      `  (${stringLiteral(store.name + " Seller")}, ${stringLiteral(
        store.email
      )}, ${stringLiteral(
        sellerPasswordHash
      )}, (SELECT id FROM stores WHERE slug = ${stringLiteral(
        store.slug
      )}), UNIX_TIMESTAMP())`
  ),
];

const sql = `USE onestopshop;

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
${storeRows.join(",\n")};

INSERT INTO products (name, price, description, inventory, images, store_id)
VALUES
${productRows.join(",\n")};

INSERT INTO users (name, email, password_hash, store_id, created_at)
VALUES
${userRows.join(",\n")};
`;

process.stdout.write(sql);
