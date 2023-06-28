import { LabwareType } from "../enums/LabwareType";
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

@Entity()
export class Labware extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable:true})
    name: string;

    @Column({name:"labware_type",nullable:true})
    labwareType: LabwareType;

    @Column({name:"attributes",type:"jsonb",nullable:true})
    attributes: { [key: string]: unknown};

    @ManyToOne(() => Vendor, (vendor) => vendor.id)
    @JoinColumn({name:"vendor_id"})
    vendor: Vendor;

    @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.id)
    @JoinColumn({name:"manufacturer_id"})
    manufacturer: Manufacturer;

    @Column({name:"is_active",default:true})
    isActive:boolean;
}
