import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagingListBaseOv, schemaHandle } from '~/common/ov/list.ov';
import { RoleSimpleListOv } from '~/system/role/ov/listMenu.ov';
import { RoleEntity } from '~/system/role/entities/role.entity';

@ApiTags('系统管理-角色')
@ApiExtraModels(PagingListBaseOv)
@Controller('system/role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: '新增角色' })
  @ApiCreatedResponse({ description: '角色详情', type: RoleEntity })
  create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: '查询角色，分页' })
  @ApiOkResponse({ description: '分页查询信息', schema: schemaHandle(PagingListBaseOv, RoleEntity) })
  findAll(@Query() findRoleDto: FindRoleDto): Promise<PagingListBaseOv<RoleEntity>> {
    return this.roleService.findPage(findRoleDto);
  }
  @Get('simple-list')
  @ApiOperation({ summary: '查询角色,枚举' })
  @ApiOkResponse({ type: [RoleSimpleListOv] })
  findAllSimple(): Promise<RoleSimpleListOv[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '查询角色详情' })
  @ApiOkResponse({ type: RoleEntity })
  findOne(@Param('id') id: string): Promise<RoleEntity> {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新角色信息' })
  @ApiOkResponse({ type: RoleEntity })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.roleService.remove(+id);
  }
}
