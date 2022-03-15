import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiOkResponse, ApiExtraModels } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FindAccountDto } from './dto/find-account.dto';
import { SetPasswordAccountDto } from './dto/setpassword-account.dto';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { PermissionsGuard } from '~/common/guard/permissions.guard';
import { Permissions } from '~/common/decorators/permissions.decorator';
import { AccountEntity } from './entities/account.entity';
import { PagingListBaseOv, schemaHandle } from '~/common/ov/list.ov';

@ApiTags('系统管理-用户')
@ApiExtraModels(PagingListBaseOv)
@Controller('system/account')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: '创建系统用户' })
  @ApiCreatedResponse({ description: '创建成功的系统用户信息', type: AccountEntity })
  create(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: '查看系统用户。分页' })
  @ApiOkResponse({ description: '分页查询信息', schema: schemaHandle(PagingListBaseOv, AccountEntity) })
  findAll(@Query() findAccountDto: FindAccountDto): Promise<PagingListBaseOv<AccountEntity>> {
    return this.accountService.findAll(findAccountDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户详细' })
  @ApiOkResponse({ description: '用户详细信息', type: AccountEntity })
  findOne(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更改用户信息' })
  @ApiOkResponse({ description: '用户详细信息', type: AccountEntity })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountEntity> {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }

  @Post(':id/set-password')
  @ApiOperation({ summary: '设置用户密码' })
  @ApiOkResponse({ type: Boolean })
  setPassword(@Param('id') id: string, @Body() setPasswordAccountDto: SetPasswordAccountDto): Promise<boolean> {
    return this.accountService.setPassword(+id, setPasswordAccountDto);
  }

  @Get('get/permissions')
  @ApiOperation({ summary: '获取用户权限' })
  @ApiOkResponse({ type: Array })
  @Permissions(['sys:account:getPermissions'])
  getPermissions(@Req() req: any): Promise<string[]> {
    const { userId } = req.user;
    return this.accountService.getPermissions(+userId);
  }
}
