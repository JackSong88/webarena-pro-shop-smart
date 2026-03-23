---
title: WebArena Amazon
emoji: 🛒
colorFrom: green
colorTo: yellow
sdk: docker
app_port: 3000
short_description: Instacart shopping environment
pinned: false
---

## OneStopShop Local Setup

### 1) Clone the repo
```bash
git clone <your-repo-url>
cd webarena-pro-shop-smart
```

### 2) Start everything
```bash
docker compose up --build
```

This now gives you:

- A local MySQL database in Docker
- Automatic schema creation and seeding from `db/init/00-bootstrap.sql`
- Built-in local authentication
- Local demo checkout with no Clerk or Stripe setup required

The app will be available at `http://localhost:3000/`.

### Demo accounts

All seeded accounts use the password `demo1234`.

- Buyer: `buyer@shopsmart.local`
- Seller: `freshmart@shopsmart.local`
- Seller: `greenbasket@shopsmart.local`
- Seller: `orchard@shopsmart.local`
- Seller: `oven@shopsmart.local`

### Reset the database

To fully reset the environment back to the seeded state:

```bash
docker compose down -v
docker compose up --build
```

Or, if the stack is already running:

```bash
docker compose run --rm db-reset
```

### Notes

- No third-party auth dashboard is required for local development.
- No hosted payment provider is required for checkout in the local demo.
- Seeded grocery catalog data and images are local once the vendoring step has run.
- Product cards still have local fallback imagery for newly created items without image URLs.