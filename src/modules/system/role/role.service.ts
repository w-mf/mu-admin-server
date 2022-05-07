import { Injectable, NotImplementedException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
import { MenuService } from '~/modules/system/menu/menu.service';
import { whereHandle } from '~/common/utils/findHandle';

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
  async findAll() {
    const res = await this.roleRepository.find({
      order: {
        id: 'ASC',
      },
    });
    return res.map((item) => ({ label: item.name, value: item.id }));
  }
  async findPage(findRoleDto: FindRoleDto) {
    const { pageNo, pageSize, status, name } = findRoleDto;
    const where = whereHandle({ status, name }, ['status']);
    const [roles, total] = await this.roleRepository.findAndCount({
      order: {
        id: 'ASC',
      },
      where,
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

  async findOne(id: number, isFindAll = false) {
    let role;
    if (isFindAll) {
      const queryBuilder = this.roleRepository.createQueryBuilder('role');
      role = await queryBuilder.select().where('role.id = :id', { id }).addSelect('role.sysInternal').getOne();
    } else {
      role = await this.roleRepository.findOne(id);
    }
    if (!role || Object.keys(role).length === 0) {
      throw new PreconditionFailedException('查找的资源不存在');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);
    await this.roleRepository.update(id, updateRoleDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.findOne(id);
    if (res.sysInternal) {
      throw new NotImplementedException('该记录为系统内置，不允许删除');
    }
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
