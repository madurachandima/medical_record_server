# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code and config
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy compiled files from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port (Back4app usually uses 80 or 3000, but often binds to $PORT)
ENV PORT=3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
