
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

# docker 运行
生成镜像
`docker build -t mu-admin-server .`<br>
运行镜像
`docker run -d -p 3000:3000 -v /logs/mu-admin-server:/usr/app/mu-admin-server/logs --name muAdminServer mu-admin-server`
# 目录说明

# 异常码使用说明
- BadRequestException 400 验证错误
- Unauthorized 401 未授权、未登录
- Forbidden 403 没有权限、 csrf 未鉴权
- Precondition Failed 412	客户端请求信息的先决条件错误(已存在、不存在情况用)
- Not Implemented 501	服务器不支持请求的功能，无法完成请求
