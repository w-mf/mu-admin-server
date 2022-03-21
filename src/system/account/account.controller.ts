import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiOkResponse, ApiExtraModels } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FindAccountDto } from './dto/find-account.dto';
import { SetPasswordAccountDto } from './dto/setpassword-account.dto';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { PermissionsGuard } from '~/common/guard/permissions.guard';
import { ResetPasswordAccountDto } from './dto/reset-password-account.dto';
import { PagingListBaseOv, schemaHandle } from '~/common/ov/list.ov';
import { AccountOv } from './ov/account.ov';

@ApiTags('系统管理-用户')
@ApiExtraModels(PagingListBaseOv)
@Controller('system/account')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: '创建系统用户' })
  @ApiCreatedResponse({ description: '创建成功的系统用户信息', type: AccountOv })
  create(@Body() createAccountDto: CreateAccountDto): Promise<AccountOv> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: '查看系统用户。分页' })
  @ApiOkResponse({ description: '分页查询信息', schema: schemaHandle(PagingListBaseOv, AccountOv) })
  findAll(@Query() findAccountDto: FindAccountDto): Promise<PagingListBaseOv<AccountOv>> {
    return this.accountService.findAll(findAccountDto) as any;
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户详细' })
  @ApiOkResponse({ description: '用户详细信息', type: AccountOv })
  findOne(@Param('id') id: string): Promise<AccountOv> {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更改用户信息' })
  @ApiOkResponse({ type: Boolean })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<boolean> {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.accountService.remove(+id);
  }

  @Post(':id/set-password')
  @ApiOperation({ summary: '设置用户密码' })
  @ApiOkResponse({ type: Boolean })
  setPassword(@Param('id') id: string, @Body() setPasswordAccountDto: SetPasswordAccountDto): Promise<boolean> {
    return this.accountService.setPassword(+id, setPasswordAccountDto);
  }

  @Post(':id/reset-password')
  @ApiOperation({ summary: '重置用户密码' })
  @ApiOkResponse({ type: Boolean })
  resetPassword(@Param('id') id: string, @Body() resetPasswordAccountDto: ResetPasswordAccountDto): Promise<boolean> {
    return this.accountService.resetPassword(+id, resetPasswordAccountDto.password);
  }
}
