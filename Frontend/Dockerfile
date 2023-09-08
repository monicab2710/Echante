FROM node:18-alpine

LABEL authors="Enchante"

WORKDIR /frontend

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]