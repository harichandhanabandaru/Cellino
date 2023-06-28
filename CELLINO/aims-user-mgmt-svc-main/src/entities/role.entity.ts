import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'rule', type: 'jsonb', array: true, default: [] })
  rule: Array<Map<string, object>>;
}
