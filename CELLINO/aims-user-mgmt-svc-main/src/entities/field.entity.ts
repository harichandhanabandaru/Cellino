import { BaseEntity } from 'src/entities/base.entity';
import { Subject } from 'src/entities/subject.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('field')
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @JoinColumn({ name: 'subject_id' })
  @ManyToOne(() => Subject, (subject) => subject.id, { eager: true })
  subjects: Subject;
}
