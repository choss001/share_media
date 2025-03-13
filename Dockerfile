# Use a Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

RUN apk --no-cache add curl
# Copy the rest of the Next.js app
COPY . .

# Build the Next.js application
RUN npm run build

# Start Next.js
CMD ["npm", "start"]

