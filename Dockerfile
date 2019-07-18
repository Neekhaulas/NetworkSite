FROM node:10

WORKDIR /networksite

COPY package*.json ./

RUN npm install

COPY . .

RUN npm config set strict-ssl false

CMD ["npm", "start"]