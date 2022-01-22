import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 全局路由前缀
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去掉没有使用任何验证装饰器的属性的验证
    }),
  );

  await app.listen(3000);
}
bootstrap();
