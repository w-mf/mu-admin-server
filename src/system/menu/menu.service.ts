import { Injectable, PreconditionFailedException, NotImplementedException } from '@nestjs/common';
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

  //查询结果是否以tree格式返回
  async findAll(isTree = true) {
    if (isTree) return await getTreeRepository(MenuEntity).findTrees();
    return await getTreeRepository(MenuEntity).find({
      order: {
        sort: 'ASC',
      },
    });
  }

  async findOne(id: number, isFindAll = false) {
    let menu;
    if (isFindAll) {
      const queryBuilder = this.menuRepository.createQueryBuilder('menu');
      menu = await queryBuilder.select().where('menu.id = :id', { id }).addSelect('menu.sysInternal').getOne();
    } else {
      menu = await this.menuRepository.findOne(id);
    }
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
    const parentCategory = await this.findOne(id, true);
    const childrenCount = await getTreeRepository(MenuEntity).countDescendants(parentCategory);
    if (childrenCount > 1) {
      throw new NotImplementedException('存在子菜单不允许删除');
    }
    if (parentCategory.sysInternal) {
      throw new NotImplementedException('该菜单为系统内置，不允许删除');
    }
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
