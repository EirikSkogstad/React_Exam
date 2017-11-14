FROM node:8-alpine

COPY . .

RUN npm run build --production

RUN npm install -g serve

CMD serve -s build --port 3000

EXPOSE 3000