# Use official Node.js Alpine image for a lightweight production build
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies (only production dependencies if NODE_ENV is set)
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
