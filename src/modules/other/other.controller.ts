import { Controller, Get, Response, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('other')
export class OtherController {
  @Get('swagger-docs')
  getFile(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'static', 'swagger-docs.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="swagger-docs.json"',
    });
    return new StreamableFile(file);
  }
}
