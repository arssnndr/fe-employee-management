# Multi-stage build
# Stage 1: Build the Angular application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from previous stage
COPY --from=build /app/dist/fe-employee-management/browser /usr/share/nginx/html/employee-management

# Create a simple index.html for root path (optional)
RUN echo '<html><head><meta http-equiv="refresh" content="0;url=/employee-management"></head><body>Redirecting to Employee Management...</body></html>' > /usr/share/nginx/html/index.html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
