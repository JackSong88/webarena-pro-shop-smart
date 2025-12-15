# ---------- Base image ----------
FROM node:20-alpine AS base

# Needed for some native deps
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# ---------- Dependencies (prod) ----------
FROM base AS deps

WORKDIR /app

# Copy only package manifests
COPY package.json package-lock.json ./

# Install prod deps (no dev) – use npm install, not npm ci
RUN npm install --omit=dev --legacy-peer-deps --no-audit --no-fund

# ---------- Build (dev + tooling) ----------
FROM base AS builder

WORKDIR /app

# Copy manifests and install full deps (including dev)
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy the rest of the source
COPY . .

# Ensure migrations-folder exists so COPY in the next stage never fails
# Try to generate Drizzle migrations; if it fails, don't break the build
RUN mkdir -p migrations-folder && \
    npx drizzle-kit generate:mysql || echo "Skipping drizzle-kit generate step"

# Build the Next.js app
RUN npm run build

# ---------- Runtime ----------
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy runtime deps from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy built app + configs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/drizzle.config.json ./drizzle.config.json
COPY --from=builder /app/migrations-folder ./migrations-folder

# ⭐ REQUIRED ⭐
COPY --from=builder /app/db ./db

EXPOSE 3000
CMD ["npm", "start"]
