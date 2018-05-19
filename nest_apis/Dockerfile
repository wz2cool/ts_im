FROM registry.docker-cn.com/armhf/node:7.8-slim

RUN mkdir -p /usr/src/app
COPY dist /usr/src/app/dist
WORKDIR /usr/src/app/dist
RUN npm config set registry http://registry.npm.taobao.org
RUN npm i --production

CMD ["node", "/usr/src/app/dist/main.js"]