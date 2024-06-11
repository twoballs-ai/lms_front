# Используйте Node.js образ для сборки React Vite приложения
FROM node:latest AS builder

# Установка зависимостей
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Копирование исходного кода и сборка приложения
COPY . .
RUN yarn build

# Используйте Nginx образ для обслуживания статических файлов
FROM nginx:latest

# Копирование статических файлов из предыдущего этапа (builder)
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурационного файла Nginx с настройками проксирования
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируйте порт 80
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
