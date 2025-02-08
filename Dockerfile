# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the project files
COPY . .

# Build the project
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]

EXPOSE 4173