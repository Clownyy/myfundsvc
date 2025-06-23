FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json prisma/schema.prisma ./

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 4300

CMD [ "npm", "run", "start:prod" ]