# Use the official Node.js image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Install vite globally
RUN npm install -g vite

# Copy and install server dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy and install client dependencies (without omitting dev dependencies)
COPY client/package*.json client/
RUN npm install --prefix client

# Copy client files and build
COPY client/ client/
RUN npm run build --prefix client

# Copy remaining root files (excluding .env for production)
COPY . .

# Expose the port your server runs on 
EXPOSE 5100

# Start the server
CMD ["node", "server.js"]
