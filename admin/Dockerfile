FROM node:22.21.1-alpine3.21 AS base

FROM base AS builder

WORKDIR /app/build

COPY package*.json .
RUN npm install

COPY src/ src/
COPY public/ public/
COPY index.html .
COPY vite.config.js .

EXPOSE 5174

RUN npm run build

FROM base AS runner

WORKDIR /home/app

COPY --from=builder /app/build/dist dist/
COPY --from=builder /app/build/package*.json .

RUN npm install --omit=dev

CMD ["npm", "start"]