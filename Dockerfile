# ใช้ Node.js เป็น base image
FROM node:18

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package.json package-lock.json ./

# ติดตั้ง dependencies และ serve
RUN npm install && npm install -g serve

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้าง production build
RUN npm run build

# เปิด port 5173
EXPOSE 5173

# ใช้ serve เปิดเว็บที่ port 5173
CMD ["serve", "-s", "dist", "-l", "5173"]