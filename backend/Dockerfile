FROM node:22.21.1-alpine3.21 AS base

FROM base AS builder

WORKDIR /app/prozecto_backend

RUN apk add --no-cache curl

COPY package*.json .
RUN npm install

COPY server.js .
COPY controllers/ controllers/
COPY models/ models/
COPY routes/ routes/
COPY lib/ lib/  
COPY middleware/ middleware/

EXPOSE 5000

CMD ["npm", "start"]