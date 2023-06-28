import {BaseEntity} from "src/entities/base-entity.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "biosero_tracker"})
export class BioseroTracker extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({name: "type", nullable: false})
  type: string

  @Column({name: "topic", nullable: true})
  topic: string

  @Column({name:"end_time",type:"timestamp with time zone", nullable: false})
  endTime: Date

}