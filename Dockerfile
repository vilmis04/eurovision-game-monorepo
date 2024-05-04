FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx nx build game-ui

CMD ["npx", "nx", "preview", "game-ui"]