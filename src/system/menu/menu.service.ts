import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const hasName = await this.menuRepository.findOne({
      where: { name: createMenuDto.name },
    });
    if (hasName) {
      throw new ConflictException(`“${createMenuDto.name}”已存在`);
    }
    const menu: Menu = this.menuRepository.create(createMenuDto);
    const res = await this.menuRepository.save(menu);
    return res;
  }

  async findAll(findMenuDto: FindMenuDto) {
    const { pageNo, pageSize } = findMenuDto;
    const [menus, total] = await this.menuRepository.findAndCount({
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
      list: menus,
    };
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne(id);
    if (!menu || Object.keys(menu).length === 0) {
      throw new BadRequestException('查找的资源不存在');
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    await this.findOne(id);
    await this.menuRepository.update(id, updateMenuDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.menuRepository.delete(id);
    return true;
  }
}
