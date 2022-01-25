import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';
import * as Winston from 'winston';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import * as pkgFile from '../package.json';
const IS_PROD = process.env.NODE_ENV === ('production' || 'prod');
async function bootstrap() {
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

  app.setGlobalPrefix('api'); // 全局路由前缀
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去掉没有使用任何验证装饰器的属性的验证
    }),
  );
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
