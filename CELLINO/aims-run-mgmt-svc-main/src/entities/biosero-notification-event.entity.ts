import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity({name: 'biosero_notification_event'})
export class BioseroNotificationEvent extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name:"end_time",type:"timestamp with time zone", nullable: false})
    endTime: Date
}