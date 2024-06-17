# Use Node.js image for building the React Vite application
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code and build the application
COPY . .
RUN yarn build

# Serve the built application
CMD ["yarn", "dev"]
