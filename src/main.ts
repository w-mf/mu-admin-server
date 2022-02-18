import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as Winston from 'winston';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { WinstonModule } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Config from '~/config/config';
import 'winston-daily-rotate-file';
import * as pkgFile from '../package.json';
import * as fs from 'fs';

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule, {
    logger: IS_PROD
      ? WinstonModule.createLogger({
          format: Winston.format.combine(
            Winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS Z' }),
            Winston.format.json(),
          ),
          transports: [
            new Winston.transports.DailyRotateFile({
              level: 'error',
              dirname: 'logs/errors',
              filename: `${pkgFile.name}-error-%DATE%.log`,
              datePattern: 'YYYY-MM-DD',
              zippedArchive: false, // 压缩存档
              maxSize: '20m',
              maxFiles: '45d',
            }),
            new Winston.transports.DailyRotateFile({
              level: 'warn',
              dirname: 'logs/warn',
              filename: `${pkgFile.name}-warn-%DATE%.log`,
              datePattern: 'YYYY-MM-DD',
              zippedArchive: false, // 压缩存档
              maxSize: '20m',
              maxFiles: '30d',
            }),
            new Winston.transports.DailyRotateFile({
              level: 'info',
              dirname: 'logs/info',
              filename: `${pkgFile.name}-info-%DATE%.log`,
              datePattern: 'YYYY-MM-DD',
              zippedArchive: false, // 压缩存档
              maxSize: '20m',
              maxFiles: '15d',
            }),
          ],
        })
      : undefined,
  });

  //防止跨站脚本攻击
  app.use(helmet());

  app.use(cookieParser());
  app.use(
    session({
      secret: Config().sessionSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const PREFIX = 'api';
  app.setGlobalPrefix('api'); // 全局路由前缀
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去掉没有使用任何验证装饰器的属性的验证
    }),
  );
  if (!IS_PROD) {
    const config = new DocumentBuilder()
      .setTitle('mu后台管理系统 api 文档')
      .setDescription('api接口文档')
      .setBasePath(PREFIX)
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./static/swagger-docs.json', JSON.stringify(document));
    SwaggerModule.setup('docs', app, document);
  }
  const PORT = 3000;
  await app.listen(PORT, () => {
    logger.log(`服务已经启动,接口请访问:http://localhost:${PORT}/${PREFIX}`);
    if (!IS_PROD) logger.log(`服务已经启动,接口文档请访问:http://localhost:${PORT}/docs`);
  });
}
bootstrap().then();
