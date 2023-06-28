import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Manufacturer } from "./manufacturer.entity";
import { Vendor } from "./vendor.entity";

@Entity("instrument")
export class Instrument extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false, unique: true })
  name: string;
  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.id, {
    eager: true,
  })
  @JoinColumn({ name: "manufacturer_id" })
  manufacturer: Manufacturer;
  @Column({ name: "manufacturer_part_number", nullable: true })
  manufacturerPartNumber: string;
  @ManyToOne(() => Vendor, (vendor) => vendor.id, { eager: true })
  @JoinColumn({ name: "vendor_id" })
  vendor: Vendor;
  @Column({ name: "vendor_part_number", nullable: true })
  vendorPartNumber: string;
  @Column({ name: "attributes", type: "jsonb", nullable: true })
  attributes: Map<String, Object>[];
  @Column({ name: "is_active", default: true })
  isActive: boolean;
}
