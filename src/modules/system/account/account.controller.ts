import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FindAccountDto } from './dto/find-account.dto';
import { SetPasswordAccountDto } from './dto/setpassword-account.dto';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { PermissionsGuard } from '~/common/guard/permissions.guard';
import { ResetPasswordAccountDto } from './dto/reset-password-account.dto';
import { AccountVo } from './vo/account.vo';
import { AccountListVo } from './vo/accountList.vo';
import { Permissions } from '~/common/decorators/permissions.decorator';

@ApiTags('系统管理-用户')
@Controller('system/account')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @Permissions(['sys:account:add'])
  @ApiOperation({ summary: '创建系统用户' })
  @ApiCreatedResponse({ description: '创建成功的系统用户信息', type: AccountVo })
  create(@Body() createAccountDto: CreateAccountDto): Promise<AccountVo> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @Permissions(['sys:account:list'])
  @ApiOperation({ summary: '查看系统用户。分页' })
  @ApiOkResponse({ description: '分页查询信息', type: AccountListVo })
  findAll(@Query() findAccountDto: FindAccountDto): Promise<AccountListVo> {
    return this.accountService.findAll(findAccountDto) as any;
  }

  @Get('permissions') // 应该放在path -> @Get(:id) 上面，不然会匹配到第一个@Get(:id)
  @ApiOperation({ summary: '获取用户权限' })
  @ApiOkResponse({ description: '权限列表', type: Array })
  getPermissions(@Req() req: any): Promise<string[]> {
    const { userId } = req.user;
    return this.accountService.getPermissions(+userId);
  }

  @Get(':id')
  @Permissions(['sys:account:view'])
  @ApiOperation({ summary: '查询用户详细' })
  @ApiOkResponse({ description: '用户详细信息', type: AccountVo })
  findOne(@Param('id') id: string): Promise<AccountVo> {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  @Permissions(['sys:account:edit'])
  @ApiOperation({ summary: '更改用户信息' })
  @ApiOkResponse({ type: Boolean })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<boolean> {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @Permissions(['sys:account:remove'])
  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.accountService.remove(+id);
  }

  @Post(':id/set-password')
  @Permissions(['sys:account:setPassword'])
  @ApiOperation({ summary: '设置用户密码' })
  @ApiOkResponse({ type: Boolean })
  setPassword(@Param('id') id: string, @Body() setPasswordAccountDto: SetPasswordAccountDto): Promise<boolean> {
    return this.accountService.setPassword(+id, setPasswordAccountDto);
  }

  @Post(':id/reset-password')
  @Permissions(['sys:account:resetPassword'])
  @ApiOperation({ summary: '重置用户密码' })
  @ApiOkResponse({ type: Boolean })
  resetPassword(@Param('id') id: string, @Body() resetPasswordAccountDto: ResetPasswordAccountDto): Promise<boolean> {
    return this.accountService.resetPassword(+id, resetPasswordAccountDto.password);
  }
}
