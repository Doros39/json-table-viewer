FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm test
RUN npm run build