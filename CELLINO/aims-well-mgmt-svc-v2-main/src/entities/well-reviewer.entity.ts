import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Well } from "./well.entity";

@Entity("well_reviewer")
export class WellReviewer {
  @PrimaryColumn({ name: "user_id", type: "uuid" })
  userId: string;

  @PrimaryColumn({ name: "well_id", type: "uuid" })
  well_id: string;

  @ManyToOne(() => Well, (well) => well.reviewers)
  @JoinColumn({ name: "well_id" })
  well: Well;
}
