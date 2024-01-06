FROM node:18-alpine As base

# Create app directory
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

# Build
WORKDIR /app
COPY . .
RUN npm run build

# Application
FROM node:18-alpine as application

COPY --from=base /app/package*.json ./
RUN npm install --only=production
COPY --from=base /app/dist ./dist

USER node
ENV PORT=4000
ENV DB_PORT=5432
ENV DB_HOST=cart-api-db.crouiakku3bv.eu-west-1.rds.amazonaws.com
ENV DB_USER=postgres
ENV DB_PASSWORD=1234567890
ENV DB_NAME=DbCartApi

EXPOSE 4000

CMD [ "node", "dist/main.js" ]
