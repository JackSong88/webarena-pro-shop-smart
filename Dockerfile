FROM node:20-alpine

RUN apk add --no-cache bash libc6-compat python3 make g++ netcat-openbsd

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
