FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD ./service/package.json /usr/src/app/package.json

ADD ./service /usr/src/app

RUN npm install --quiet --production --no-progress --registry=${registry:-https://registry.npmjs.org} && npm cache clean --force

EXPOSE 3000

CMD ["yarn", "start-prod"]