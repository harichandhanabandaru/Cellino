import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity()
export class Manufacturer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ name: "manufacturer_part_number", nullable: true })
  manufacturerPartNumber: string;
  @Column({ name: "is_active", default: true })
  isActive: boolean;
}
