# ใช้ Node.js เป็น base image
FROM node:18

# กำหนด working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดเข้า container
COPY . .

# กำหนด port ที่จะ expose
EXPOSE 5000

# คำสั่งรันเซิร์ฟเวอร์
CMD ["node", "server.js"]