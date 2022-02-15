import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getTreeRepository } from 'typeorm';
import { MenuEntity } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const hasName = await this.menuRepository.findOne({
      where: { name: createMenuDto.name },
    });
    if (hasName) {
      throw new PreconditionFailedException(`“${createMenuDto.name}”已存在`);
    }
    const menu: MenuEntity = this.menuRepository.create(createMenuDto);
    if (createMenuDto.parentId) {
      const parentMenu = await this.menuRepository.findOne(createMenuDto.parentId);
      if (!parentMenu) throw new PreconditionFailedException('父级资源不存在');
      menu.parent = parentMenu;
    }
    const res = await this.menuRepository.save(menu);
    return {
      ...res,
      parentId: res.parent ? res.parent.id : undefined,
      parent: undefined,
    };
  }

  async findAll() {
    return await getTreeRepository(MenuEntity).findTrees();
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne(id);
    if (!menu || Object.keys(menu).length === 0) {
      throw new PreconditionFailedException('查找的资源不存在');
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    await this.findOne(id);
    await getTreeRepository(MenuEntity).update(id, updateMenuDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await getTreeRepository(MenuEntity).softDelete(id);
    return true;
  }

  //根据 id 集合 查询多个
  async findIds(ids: number[]) {
    for (let i = 0; i < ids.length; i++) {
      if (!(await this.menuRepository.findOne(ids[i]))) {
        throw new PreconditionFailedException(`菜单id=${ids[i]}不存在`);
      }
    }
    return await this.menuRepository.findByIds(ids);
  }
}
