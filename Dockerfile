# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm if using pnpm, otherwise use npm or yarn
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/.output ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server/index.mjs"]
