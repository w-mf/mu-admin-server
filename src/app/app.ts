import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { SwaggerService } from '~/extends/swagger/swagger.service';
import { WinstonService as LoggerService } from '~/extends/logger/logger.service';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  const configService = app.get<ConfigService>(ConfigService);

  // 全局路由前缀
  app.setGlobalPrefix(configService.get('pathPrefix'));

  const swaggerService = app.get<SwaggerService>(SwaggerService);
  if (configService.get('enableSwagger')) swaggerService.init(app);

  /** 全局中间件 */
  //防止跨站脚本攻击
  app.use(helmet());
  app.use(cookieParser());
  app.use(
    session({
      secret: configService.get('sessionSecret'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去掉没有使用任何验证装饰器的属性的验证
    }),
  );
  const PORT = configService.get('port');
  await app.listen(PORT, () => {
    logger.log(`服务已经启动,接口请访问:http://localhost:${PORT}/${configService.get('pathPrefix')}`);
  });

  /** 未处理的异常 */
  process.on('uncaughtException', (err: Error) => {
    logger.error(err, 'bootstrap');
  });
  process.on('unhandledRejection', (err: Error) => {
    logger.error(err, 'bootstrap');
  });
}