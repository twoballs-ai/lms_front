# Установка этапа сборки
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Установка этапа сервера
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "/app", "-l", "3000"]