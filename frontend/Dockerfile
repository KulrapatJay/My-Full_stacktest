# ใช้ Node.js เป็น base image
FROM node:18

# กำหนด working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดเข้า container
COPY . .

# Build แอป
RUN npm run build

# ใช้ nginx เป็น web server
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]