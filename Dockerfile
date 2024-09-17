# Используем официальный Node.js образ как базовый для сборки
FROM node:20 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock) перед основным кодом
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем остальной код проекта
COPY . .

# Строим проект
RUN npm run build

# Используем минимальный образ Node.js для финальной стадии
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем необходимые файлы из стадии сборки
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./

# Устанавливаем переменную окружения для продакшена
ENV NODE_ENV=production

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
