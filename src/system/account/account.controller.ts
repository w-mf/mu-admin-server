import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FindAccountDto } from './dto/find-account.dto';
import { SetPasswordAccountDto } from './dto/setpassword-account.dto';
@Controller('system/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll(@Query() findAccountDto: FindAccountDto) {
    return this.accountService.findAll(findAccountDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
  @Post('set-password')
  setPassword(@Body() setPasswordAccountDto: SetPasswordAccountDto) {
    return this.accountService.setPassword(setPasswordAccountDto);
  }
}
