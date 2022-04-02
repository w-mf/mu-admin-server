import { INestApplication, Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SwaggerService {
  public init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('mu后台管理系统 api 文档')
      .setDescription('api接口文档')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync(path.join(process.cwd(), 'static', 'swagger-docs.json'), JSON.stringify(document));
    SwaggerModule.setup('docs', app, document);
  }
}
