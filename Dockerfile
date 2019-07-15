FROM node:10

WORKDIR /networksite

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]