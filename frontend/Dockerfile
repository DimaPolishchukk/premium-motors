# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js uses
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development

# Command to run the development server
CMD ["npm", "run", "dev"]