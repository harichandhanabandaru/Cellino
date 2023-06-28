import { Column } from 'typeorm';

export class BaseEntity {
  @Column({ name: 'created_by', nullable: false, type: 'uuid' })
  createdBy: string;

  @Column({
    name: 'created_at',
    nullable: false,
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'modified_by', nullable: false, type: 'uuid' })
  modifiedBy: string;

  @Column({
    name: 'modified_at',
    nullable: false,
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @Column({ name: 'is_active', nullable: false, type: 'bool' })
  isActive: boolean;
}
