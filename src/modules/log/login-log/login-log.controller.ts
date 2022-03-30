import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagingListBaseVo, schemaHandle } from '~/common/vo/list.vo';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { PermissionsGuard } from '~/common/guard/permissions.guard';
import { Permissions } from '~/common/decorators/permissions.decorator';
import { LoginLogVo } from '~/modules/log/login-log/vo/loging-log.vo';
import { FindLoginLogDto } from '~/modules/log/login-log/dto/find-login-log.dto';

@ApiTags('日志管理-登录日志')
@ApiExtraModels(PagingListBaseVo)
@Controller('log/login-log')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class LoginLogController {
  constructor(private readonly loginLogService: LoginLogService) {}

  @Post()
  create(@Body() createLoginLogDto: CreateLoginLogDto) {
    return this.loginLogService.create(createLoginLogDto);
  }

  @Get()
  @Permissions(['log:loginLog:list'])
  @ApiOperation({ summary: '查看登录日志。分页' })
  @ApiOkResponse({ description: '分页查询信息', schema: schemaHandle(PagingListBaseVo, LoginLogVo) })
  findAll(@Query() findLoginLogDto: FindLoginLogDto) {
    return this.loginLogService.findAll(findLoginLogDto);
  }
}
