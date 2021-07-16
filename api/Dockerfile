FROM node:12-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . ./

EXPOSE 5000

CMD [ "npm", "run", "watch" ]