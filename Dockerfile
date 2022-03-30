FROM node:16.14.2
WORKDIR /usr/app/mu-admin-server/

# package 及 *.lock 没有变更时 可以缓存 install 结果
COPY package*.json .npmrc ./
RUN  npm i
# copy 所有源代码
COPY . ./
VOLUME ./logs
ENV NODE_ENV production
CMD npm run db:run && npm run build && npm run start:prod
EXPOSE 3000
