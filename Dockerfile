FROM node:latest

WORKDIR /app

COPY . .
RUN npm install
EXPOSE 443

CMD [ "npm", "run", "start:prod" ]
