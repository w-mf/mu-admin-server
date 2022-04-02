import { Controller, Get, Response, UseGuards, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { PermissionsGuard } from '~/common/guard/permissions.guard';
import { Permissions } from '~/common/decorators/permissions.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ServerInfoVo } from './vo/serverInfo.vo';
import { OtherService } from './other.service';

@Controller('other')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @Get('swagger-docs')
  getFile(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'static', 'swagger-docs.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="swagger-docs.json"',
    });
    return new StreamableFile(file);
  }

  @Get('get-server-info')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(['other:serverInfo:view'])
  @ApiOperation({ summary: '获取服务器信息' })
  @ApiOkResponse({ type: ServerInfoVo })
  getServerInfo(): Promise<ServerInfoVo> {
    return this.otherService.getServerInfo();
  }
}
