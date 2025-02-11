# ใช้ Node.js เป็น base image เพื่อ build
FROM node:18 AS build

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้าง production build
RUN npm run build

# ใช้ NGINX เป็น base image สำหรับ serve static files
FROM nginx:alpine

# คัดลอกไฟล์ build ไปยัง directory ของ nginx
COPY --from=build /app/dist /usr/share/nginx/html

# คัดลอกไฟล์ config ของ Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# เปิดพอร์ต 80
EXPOSE 80

# สั่งให้ nginx ทำงาน
CMD ["nginx", "-g", "daemon off;"]
