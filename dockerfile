FROM node:alpine 

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
# COPY tsconfig.json ./

RUN yarn
RUN npx prisma generate

COPY . . 
EXPOSE 3333

CMD [ "yarn", "start" ]