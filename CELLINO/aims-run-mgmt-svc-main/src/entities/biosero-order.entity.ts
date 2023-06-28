import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { BioseroOrderType } from "./biosero-order-type.entity";

@Entity({ name: "biosero_order" })
export class BioseroOrder extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "biosero_identifier", nullable: false, unique: true })
  bioseroIdentifier: string;

  @ManyToOne(
    () => BioseroOrderType,
    (bioseroOrderType) => bioseroOrderType.orders,
    { eager: true, nullable: false }
  )
  @JoinColumn({ name: "biosero_order_type_code", referencedColumnName: "code" })
  type: BioseroOrderType;

  @Column({ name: "plate_barcode", nullable: false })
  plateBarcode: string;

  @Column({ name: "protocol_configuration", nullable: true })
  protocolConfiguration: string;

  @Column({ name: "well_position", nullable: true })
  wellPosition: string;

  @Column({ name: "metadata", type: "jsonb", nullable: true })
  metadata: { [p: string]: unknown };

  @Column({ name: "acquisition_id", nullable: true })
  acquisitionId: string;

  @Column({ name: "image_event_id", type: "uuid", nullable: true })
  imageEventId: string;

  @Column({ name: "image_source", nullable: true })
  imageSource: string;
}
