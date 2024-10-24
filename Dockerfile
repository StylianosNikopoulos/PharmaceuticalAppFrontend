# Stage 1: Build the app
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app using a lightweight Nginx server
FROM nginx:stable-alpine AS production

# Copy built files from the first stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
