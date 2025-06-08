# ── Builder Stage: install deps & build ───────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package manifests & install dev+prod deps
COPY package*.json ./
RUN npm install

# Copy source & build the Nitro server output
COPY . .
RUN npm run build

# ── Runner Stage: prod-only image ─────────────────────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV for production optimizations
ENV NODE_ENV=production

# Copy only the package manifests & install production deps
COPY package*.json ./
RUN npm install --production

# Copy the built output from builder
COPY --from=builder /app/.output ./.output

# Expose the port your Nuxt server listens on
EXPOSE 3000

# Launch the Nitro server
CMD ["node", ".output/server/index.mjs"]
