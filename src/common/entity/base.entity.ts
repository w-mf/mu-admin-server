import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export abstract class BaseEntity {
  /** 唯一标识 */
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'int',
  })
  id: number;

  /** 创建时间 */
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  /** 更新时间 */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ApiHideProperty()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', select: false, nullable: true })
  deletedAt: Date;
}
