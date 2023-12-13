# Sử dụng hình ảnh bun.js làm cơ sở
FROM oven/bun:latest

# Thiết lập thư mục làm việc
WORKDIR /app

COPY package.json ./
RUN bun install

COPY prisma ./prisma/

RUN bun db:init

# Sao chép tất cả các tệp từ thư mục ứng dụng cục bộ vào hình ảnh
COPY . .

# Cài đặt các phụ thuộc

RUN bun run build


# Chạy ứng dụng NestJS
CMD [ "bun", "start" ]
