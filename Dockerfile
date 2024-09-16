# Используем официальный Node.js образ как базовый
FROM node:18 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код проекта
COPY . .

# Строим проект
RUN npm run build:no-lint

# Используем официальный Node.js образ для финальной стадии
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из предыдущего этапа
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./

# Устанавливаем переменную окружения для работы в продакшене
ENV NODE_ENV=production

# Открываем порт, который будет использоваться приложением
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
