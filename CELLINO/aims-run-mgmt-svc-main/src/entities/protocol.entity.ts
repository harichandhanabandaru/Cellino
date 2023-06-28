import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { PhaseProtocol } from "./phase-protocol.entity";
import { ProtocolDefinition } from "./protocol-definition.entity";

@Entity({ name: "protocol" })
export class Protocol extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(() => ProtocolDefinition, (definition) => definition.id)
  @JoinColumn({ name: "protocol_definition_id" })
  protocolDefinition: ProtocolDefinition;

  @Column({ name: "settings", type: "jsonb", nullable: false, unique: true })
  settings: Object;

  @OneToMany(() => PhaseProtocol, (phaseProtocol) => phaseProtocol.protocol)
  phaseProtocol: PhaseProtocol[];

  @Column({ name: "is_active", default: true })
  isActive: boolean;
}
