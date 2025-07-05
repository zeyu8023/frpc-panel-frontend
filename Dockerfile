# 构建阶段
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 生产阶段
FROM nginx:alpine

# 拷贝构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 拷贝自定义 Nginx 配置（监听 10305 + 提供 /config.json）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 拷贝默认 config.json（可在部署时挂载覆盖）
COPY public/config.json /etc/nginx/config/config.json

EXPOSE 10305
