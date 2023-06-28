import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { ClusterOrColonyQuality } from "../enums/cluster-or-colony-quality";
import { ClusterOrColonyType } from "../enums/cluster-or-colony-type";
import { Well } from "./well.entity";
import { ImageAnalysisRequest } from "./image-analysis-request.entity";
import { Cluster } from "./cluster.entity";

@Entity("colony_artifact")
export class Colony extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ name: "type", nullable: true })
  type: ClusterOrColonyType;

  @Column({ name: "quality", nullable: true })
  quality: ClusterOrColonyQuality;

  @Column({ name: "is_active", nullable: false })
  isActive: boolean;

  @Column({ name: "outline", type: "jsonb", nullable: true })
  outline: Map<String, Object>;

  @ManyToOne(() => Well, (well) => well.id, { eager: true })
  @JoinColumn({ name: "well_id" })
  well: Well;

  @Column({ name: "is_selected", nullable: false })
  isSelected: boolean;

  @ManyToOne(
    () => ImageAnalysisRequest,
    (imageAnalysisRequest) => imageAnalysisRequest.id,
    { eager: true, nullable: true }
  )
  @JoinColumn({ name: "image_analysis_request_id" })
  imageAnalysisRequest: ImageAnalysisRequest;

  @OneToMany((type) => Cluster, (cluster) => cluster.colony)
  clusters: Cluster[];
}
