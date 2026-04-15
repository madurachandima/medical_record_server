# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code and configuration
COPY . .

# Explicit build step using npx to ensure tools are found
RUN npx rimraf dist && \
    npx tsc && \
    npx tsc-alias

# Production Stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files for production install
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy compiled files from builder stage
COPY --from=builder /app/dist ./dist

# Standard port for local testing, overridden by Back4app with $PORT
ENV PORT=3000
EXPOSE 3000

# Run the app
CMD ["node", "dist/server.js"]
