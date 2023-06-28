import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity()
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ name: "vendor_part_number", nullable: true })
  vendorPartNumber: string;
  @Column({ name: "is_active", default: true })
  isActive: boolean;
}
