FROM node:18

WORKDIR /app

COPY package.json .

RUN mkdir -p /app/node_modules 
RUN chown node:node /app/node_modules

RUN npm install

CMD ["npm", "start"]