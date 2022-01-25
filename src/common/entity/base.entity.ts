import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'int',
  })
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
