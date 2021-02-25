FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY ./ .

RUN yarn build

FROM nginx as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app

COPY ./cfg/system/nginx.conf /etc/nginx/nginx.conf
