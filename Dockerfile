# Используйте Node.js образ для сборки React Vite приложения
FROM node:latest AS builder

# Установка зависимостей
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Копирование исходного кода и сборка приложения
COPY . .
RUN yarn build

# Запуск Vite dev server
CMD ["yarn", "dev"]