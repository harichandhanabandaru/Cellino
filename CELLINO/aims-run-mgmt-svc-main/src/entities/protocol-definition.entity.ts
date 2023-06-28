import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { ProtocolCategory } from "./protocol-category.entity";
import { ProtocolType } from "./protocol-type.entity";

@Entity("protocol_definition")
export class ProtocolDefinition extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ name: "workflow_template_name", nullable: true })
  workflowTemplateName: string;

  @Column({ name: "parameters", type: "jsonb" })
  parameters: Map<String, Object>[];

  @Column({ name: "related_id", nullable: true })
  relatedId: string;

  @ManyToOne(
    () => ProtocolCategory,
    (protocolCategory) => protocolCategory.code,
    {
      cascade: true,
    }
  )
  @JoinColumn({ name: "protocol_category_code", referencedColumnName: "code" })
  protocolCategory: ProtocolCategory;

  @ManyToOne(() => ProtocolType, (protocolType) => protocolType.code, {
    cascade: true,
  })
  @JoinColumn({ name: "protocol_type_code", referencedColumnName: "code" })
  protocolType: ProtocolType;

  @Column({ name: "is_active", default: true, nullable: false })
  isActive: boolean;
}
