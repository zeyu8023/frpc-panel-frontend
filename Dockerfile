# 构建阶段
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 10305
