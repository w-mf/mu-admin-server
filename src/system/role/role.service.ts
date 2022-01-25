import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const hasName = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (hasName) {
      throw new ConflictException(`“${createRoleDto.name}”已存在`);
    }
    const menu: Role = this.roleRepository.create(createRoleDto);
    const res = await this.roleRepository.save(menu);
    return res;
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
      throw new BadRequestException('查找的资源不存在');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);
    await this.roleRepository.update(id, updateRoleDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.roleRepository.delete(id);
    return true;
  }
}
