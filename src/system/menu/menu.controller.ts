import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuTreeListVo } from './vo/menu.vo';
import { MenuEntity } from './entities/menu.entity';
import { Permissions } from '~/common/decorators/permissions.decorator';
import { PermissionsGuard } from '~/common/guard/permissions.guard';

@ApiTags('系统管理-菜单')
@Controller('system/menu')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Permissions(['sys:menu:add'])
  @ApiOperation({ summary: '新建菜单' })
  @ApiCreatedResponse({ description: '新建菜单内容', type: MenuEntity })
  create(@Body() createMenuDto: CreateMenuDto): Promise<MenuEntity> {
    return this.menuService.create(createMenuDto);
  }

  @Get('list')
  @Permissions(['sys:menu:list'])
  @ApiOperation({ summary: '菜单列表' })
  @ApiOkResponse({ description: '菜单内容', type: [MenuEntity] })
  findList(): Promise<MenuEntity[]> {
    return this.menuService.findAll(false);
  }

  @Get('tree-list')
  @ApiOperation({ summary: '菜单树列表' })
  @ApiOkResponse({ description: '菜单内容 tree格式', type: [MenuTreeListVo] })
  findTreeList(): Promise<MenuTreeListVo[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  @Permissions(['sys:menu:view'])
  @ApiOperation({ summary: '根据id查菜单详情（不含子级)）' })
  @ApiOkResponse({ description: '菜单详情', type: MenuEntity })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<MenuEntity> {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @Permissions(['sys:menu:update'])
  @ApiOperation({ summary: '更新菜单详情' })
  @ApiOkResponse({ description: '菜单详情', type: MenuEntity })
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @Permissions(['sys:menu:remove'])
  @ApiOperation({ summary: '删除菜单' })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.menuService.remove(id);
  }
}
