import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity("generation_type")
export class GenerationType extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, length: 50, unique: true })
  code: string;

  @Column({ nullable: false, length: 50 })
  label: string;

  @Column()
  description: string;

  @Column({ name: "is_active" })
  isActive: boolean;
}
