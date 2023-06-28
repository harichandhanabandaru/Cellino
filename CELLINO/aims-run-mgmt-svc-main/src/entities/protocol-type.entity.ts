import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity({ name: "protocol_type" })
export class ProtocolType extends BaseEntity{
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique:true})
    code:string;
    
    @Column({nullable:false})
    label:string;

    @Column({nullable:true})
    description:string;

    @Column({name:"is_active",default:true,nullable:false})
    isActive:boolean;
}