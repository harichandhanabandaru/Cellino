import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('condition')
export class Condition extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'value', type: 'varchar' })
  value: string;
}
