import { Column } from "typeorm";

export class BaseEntity{
    @Column({type:"uuid",name:"created_by", nullable: false})
    createdBy: string;

    @Column({name:"created_at",type:"timestamp with time zone", nullable: false})
    createdAt: Date;

    @Column({type:"uuid",name:"modified_by", nullable: false})
    modifiedBy: string;

    @Column({name:"modified_at",type:"timestamp with time zone", nullable: false})
    modifiedAt: Date;
}