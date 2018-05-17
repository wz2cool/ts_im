FROM registry.docker-cn.com/armhf/node:7.8-slim

RUN mkdir -p /usr/src/app
COPY dist /usr/src/app
COPY node_modules /user/src/app

CMD ["node", "/usr/src/app/dist/main.js"]