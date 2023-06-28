import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity({ name: "object_caching_rule" })
export class ObjectCachingRule extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "object_pattern",
    nullable: false,
    length: 256,
    unique: true,
  })
  objectPattern: string;

  @Column({ name: "cache_control", nullable: false, length: 256 })
  cacheControl: string;
}
