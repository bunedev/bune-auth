# Sử dụng hình ảnh bun.js làm cơ sở
FROM oven/bun:latest

# Thiết lập thư mục làm việc
WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/
RUN apt-get -qy update && apt-get -qy install openssl
RUN bun install

RUN bun prisma:generate
COPY . .
# Sao chép tất cả các tệp từ thư mục ứng dụng cục bộ vào hình ảnh

# Cài đặt các phụ thuộc

RUN bun run build


# Chạy ứng dụng NestJS
CMD [ "bun", "dev" ]                     