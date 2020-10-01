FROM node:10

WORKDIR /usr/api

RUN yarn global add nodemon

COPY package.json /usr/api

RUN yarn

COPY . .

EXPOSE 3000

CMD ['node', 'app.js']