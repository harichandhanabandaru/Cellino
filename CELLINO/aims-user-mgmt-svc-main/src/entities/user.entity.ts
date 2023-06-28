import { IsEmail } from 'class-validator';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  @IsEmail()
  email: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
