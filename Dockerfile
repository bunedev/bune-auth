# Sử dụng hình ảnh bun.js làm cơ sở
FROM oven/bun:latest

# Thiết lập thư mục làm việc
WORKDIR /app
RUN apt-get -qy update && apt-get -qy install openssl

COPY package.json ./
COPY prisma ./prisma/
RUN bun install
COPY . .
RUN bun prisma:generate
# Sao chép tất cả các tệp từ thư mục ứng dụng cục bộ vào hình ảnh

# Cài đặt các phụ thuộc

#RUN bun run bui#ld


# Chạy ứng dụng NestJS
CMD [ "bun", "dev" ]                     