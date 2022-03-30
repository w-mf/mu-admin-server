import { Entity, Column } from 'typeorm';
import { BaseEntity } from '~/common/entity/base.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'login-log' })
export class LoginLogEntity extends BaseEntity {
  /** 登录账号 */
  @Column({
    name: 'user_name',
    type: 'varchar',
    length: '128',
  })
  userName: string;

  /** 登陆地址 */
  @Column({
    name: 'ip',
    type: 'varchar',
  })
  ip: string;

  /** 登录设备 */
  @Column({
    name: 'equipment',
    type: 'varchar',
    nullable: true,
  })
  equipment?: string;

  /** 状态。1:成功，0: 失败 */
  @ApiProperty({ enum: [1, 0], default: 1 })
  @Column({
    name: 'status',
    type: 'tinyint',
    width: 1,
    default: 1,
    unsigned: true,
    comment: '状态。1:成功，0: 失败',
  })
  status: 1 | 0;

  /** 登录信息 */
  @Column({
    name: 'info',
    type: 'varchar',
    nullable: true,
  })
  info?: string;

  @ApiHideProperty()
  @Column({
    name: 'user_agent',
    type: 'varchar',
    nullable: true,
  })
  userAgent?: string;
}
