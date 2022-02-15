import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuTreeListVo } from './vo/menu.vo';
import { MenuEntity } from './entities/menu.entity';

@ApiTags('系统管理-菜单')
@Controller('system/menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: '新建菜单' })
  @ApiCreatedResponse({ description: '新建菜单内容', type: MenuEntity })
  create(@Body() createMenuDto: CreateMenuDto): Promise<MenuEntity> {
    return this.menuService.create(createMenuDto);
  }

  @Get('tree-list')
  @ApiOperation({ summary: '菜单树列表' })
  @ApiOkResponse({ description: '菜单内容 tree格式', type: [MenuTreeListVo] })
  findAll(): Promise<MenuTreeListVo[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查菜单详情（不含子级)）' })
  @ApiOkResponse({ description: '菜单详情', type: MenuEntity })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<MenuEntity> {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新菜单详情' })
  @ApiOkResponse({ description: '菜单详情', type: MenuEntity })
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.menuService.remove(id);
  }
}
