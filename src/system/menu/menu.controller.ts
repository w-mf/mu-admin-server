import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll(@Query() findMenuDto: FindMenuDto) {
    return this.menuService.findAll(findMenuDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.menuService.remove(id);
  }
}
