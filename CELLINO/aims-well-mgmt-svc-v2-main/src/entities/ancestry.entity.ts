import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity("ancestry")
export class Ancestry extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", length: 100, nullable: false, unique: true })
  name: string;
}
