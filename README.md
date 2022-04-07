# mu-admin-server
---
***缓慢开发中.....***<br>

一个基于 nestjs + mysql 的后台管理系统的 RESTful API 服务。<br>
配套前端项目 [mu-admin-web](https://github.com/w-mf/mu-admin-web)

## 功能
1. [x] 密码登录（含图形验证码）
2. [x] jwt鉴权
3. [x] swagger集成
4. [x] 服务日志记录
5. [x] RBAC
------
5. [x] 系统管理-账户管理
6. [x] 系统管理-角色管理 
7. [x] 系统管理-菜单管理
8. [x] 日志管理-登录日志
9. [ ] 日志管理-操作日志
10. [x] 服务器信息 
11. [ ] 用户消息

## 开始

```bash
$ npm install
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
# 生成迁移文件
$ npm run db:create
# 执行迁移
$ npm run db:run
# 回滚迁移
$ npm run db:revert
```
# 目录说明
```
mu-admin-server
├─dist //编译后的代码(运行的代码,dev、build会生成)
├─migration //typeorm 迁移文件
├─src
| ├─app
| | ├─app.module.ts //主模块
| | └─app.ts //初始引导 
| ├─common //公共目录
| | ├─ constants //常量
| | ├─ decorators //装饰器
| | ├─ dto //公共数据模型
| | ├─ entity //公共实体字段
| | ├─ guard //守卫
| | ├─ pipe //管道
| | ├─ middleware //中间件
| | ├─ utils //公共工具
| | └─ vo //公共视图模型
| ├─config //应用配置目录
| | ├─config.ts //配置文件
| | └─database.config.ts //数据库配置
| ├─extends //扩展
| | ├─cache //缓存模块
| | ├─config //配置模块
| | ├─logger //log模块
| | ├─swagger //swagger模块
| | └─typeOrm //typeOrm模块
| ├─modules //业务模块
| | └─xxx
| | | ├─dto //数据模型
| | | | ├─...
| | | | └─xxx.dto.ts
| | | ├─entities //实体
| | | | ├─...
| | | | └─xxx.entity.ts
| | | ├─vo //视图模型
| | | | ├─...
| | | | └─xxx.vo.ts
| | | ├─xxx.controller.ts
| | | ├─xxx.service.ts
| | | └─xxx.module.ts
| └─main.ts //入口文件
├─static //静态文件
├─.env.development //开发环境变量
├─.env.production //生成环境变量
├─nest-cli.json //nest-cli配置文件
├─ormconfig.ts //typeorm-cli 使用的配置文件
├─tsconfig.json //ts配置文件
├─tsconfig.build.json //build模式的ts配置文件
├─Dockerfile //docker 配置文件
├─... 其他工具配置文件，不多赘述
└─...
```

# docker 运行
生成镜像
```bash
docker build -t mu-admin-server .
```

运行镜像
```bash
docker run -d -p 3000:3000 -v /logs/mu-admin-server:/usr/app/mu-admin-server/logs --name muAdminServer mu-admin-server
```

## 异常码使用说明
- BadRequestException 400 验证错误
- Unauthorized 401 未授权、未登录
- Forbidden 403 没有权限、 csrf 未鉴权
- Precondition Failed 412	客户端请求信息的先决条件错误(已存在、不存在情况用)
- Not Implemented 501	服务器不支持请求的功能，无法完成请求
