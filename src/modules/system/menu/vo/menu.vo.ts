import { MenuEntity } from '../entities/menu.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MenuTreeListVo extends MenuEntity {
  @ApiPropertyOptional({ description: '子级', type: () => [MenuEntity] })
  children: MenuTreeListVo[];
}
