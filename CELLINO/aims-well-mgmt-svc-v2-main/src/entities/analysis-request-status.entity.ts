import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity({ name: "analysis_request_status" })
export class AnalysisRequestStatus extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "character varying", unique: true })
  code: string;

  @Column({ nullable: false })
  label: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: "is_active", nullable: false })
  isActive: boolean;
}
