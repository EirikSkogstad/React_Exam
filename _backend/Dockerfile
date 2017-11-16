FROM node:8-alpine
WORKDIR /usr/src/movie_server
COPY package.json .
COPY package-lock.json .

RUN npm install --only=production

COPY . .

EXPOSE 1234

CMD ["npm", "start"]