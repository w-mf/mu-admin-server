import { INestApplication, Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonService } from '../logger/logger.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SwaggerService {
  constructor(private readonly logger: WinstonService, private readonly config: ConfigService) {}
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

    if (this.config.get('env') === 'prod') {
      this.logger.log(`服务已经启动,接口文档请访问:http://localhost:${this.config.get('port')}/docs`);
    }
  }
}
