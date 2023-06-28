import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { BioseroOrder } from "./biosero-order.entity";

@Entity({ name: "biosero_order_type" })
export class BioseroOrderType extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "code", nullable: false, unique: true })
  code: string;

  @Column({ name: "label", nullable: false })
  label: string;

  @OneToMany(() => BioseroOrder, (bioseroOrder) => bioseroOrder.type)
  orders: BioseroOrder[];
}
