# Stage 1: Since we are using Vanilla JS, we don't strictly need a build step like React.
# We will directly use Nginx to serve the static files.

# Use official lightweight Nginx image
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend static assets to Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
