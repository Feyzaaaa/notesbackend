# Build aşaması
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production aşaması - Nginx ile servis et
FROM nginx:stable-alpine

# Build'den çıkan dosyaları Nginx klasörüne kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Özel Nginx config (isteğe bağlı)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
