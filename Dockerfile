FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE ${API_PORT}

CMD node ./dist/app/index.js 
