FROM node:14.15.1 

WORKDIR /app/client

ADD package.json package.json

RUN npm install

ADD . .

RUN npm run build

CMD ["npm","start"]

EXPOSE 3000