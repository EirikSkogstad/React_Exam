FROM node:alpine
WORKDIR /usr/src/movie_server
COPY package.json .

RUN npm install --only=production

COPY . .

EXPOSE 1234

CMD ["npm", "start"]