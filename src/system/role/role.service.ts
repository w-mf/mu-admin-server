import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
import { MenuService } from '~/system/menu/menu.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    private readonly menuService: MenuService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const hasName = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (hasName) {
      throw new PreconditionFailedException(`“${createRoleDto.name}”已存在`);
    }
    const role: RoleEntity = this.roleRepository.create(createRoleDto);
    if (createRoleDto.menuIds) {
      const ids = createRoleDto.menuIds.split(',').map((item) => +item);
      role.menus = await this.menuService.findIds(ids);
    }
    const res = await this.roleRepository.save(role);
    return {
      ...res,
      menus: undefined,
    };
  }

  async findAll(findRoleDto: FindRoleDto) {
    const { pageNo, pageSize } = findRoleDto;
    const [roles, total] = await this.roleRepository.findAndCount({
      order: {
        id: 'ASC',
      },
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });
    return {
      total,
      pageNo,
      pageSize,
      list: roles,
    };
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne(id);
    if (!role || Object.keys(role).length === 0) {
      throw new PreconditionFailedException('查找的资源不存在');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    const newRole = {
      ...role,
      ...updateRoleDto,
    };
    if (updateRoleDto.menuIds) {
      const ids = updateRoleDto.menuIds.split(',').map((item) => +item);
      newRole.menus = await this.menuService.findIds(ids);
    }
    const res = await this.roleRepository.save(newRole);
    return {
      ...res,
      menus: undefined,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.roleRepository.softDelete(id);
    return true;
  }

  //根据 id 集合 查询多个
  async findIds(ids: number[]) {
    for (let i = 0; i < ids.length; i++) {
      if (!(await this.roleRepository.findOne(ids[i]))) {
        throw new PreconditionFailedException(`角色id=${ids[i]}不存在`);
      }
    }
    return await this.roleRepository.findByIds(ids);
  }
}
