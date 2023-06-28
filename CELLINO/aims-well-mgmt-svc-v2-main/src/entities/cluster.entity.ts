import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { PhenoType } from "../enums/pheno-type";
import { Clonality } from "../enums/clonality";
import { OutlineDTO } from "../dto/outine.dto";
import { ClusterOrColonyQuality } from "../enums/cluster-or-colony-quality";
import { ClusterOrColonyType } from "../enums/cluster-or-colony-type";
import { Colony } from "./colony.entity";
import { Well } from "./well.entity";
import { ImageAnalysisRequest } from "./image-analysis-request.entity";
import { ImageEvent } from "./image-event.entity";
import { ClusterLineage } from "./cluster-lineage.entity";
import { Ancestry } from "./ancestry.entity";

@Entity("cluster_artifact")
export class Cluster extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false, length: 100 })
  name: string;

  @Column({ name: "attributes", type: "jsonb", nullable: true })
  attributes: Map<String, Object>;

  @Column({ name: "phenotype", nullable: true })
  phenoType: PhenoType;

  @Column({ name: "type", nullable: true })
  type: ClusterOrColonyType;

  @Column({ name: "clonality", nullable: true })
  clonality: Clonality;

  @Column({ name: "outline", type: "jsonb", nullable: false })
  outline: { [key: string]: unknown };

  @Column({ name: "quality", nullable: true })
  quality: ClusterOrColonyQuality;

  @Column({ name: "parent_ids", type: "json", nullable: true })
  parents: Map<string, Object>;

  @ManyToOne(() => ClusterLineage, (clusterLineage) => clusterLineage.id, {
    eager: true,
  })
  @JoinColumn({ name: "cluster_lineage_id" })
  clusterLineage: ClusterLineage;

  @ManyToOne(() => Ancestry, (ancestry) => ancestry.id, { eager: true })
  @JoinColumn({ name: "ancestry_id" })
  ancestry: Ancestry;

  @ManyToOne(() => Colony, (colony) => colony.id, { eager: true })
  @JoinColumn({ name: "colony_id" })
  colony: Colony;

  @ManyToOne(() => Well, (well) => well.id, { eager: true })
  @JoinColumn({ name: "well_id" })
  well: Well;

  @ManyToOne(
    () => ImageAnalysisRequest,
    (imageAnalysisRequest) => imageAnalysisRequest.id,
    { eager: true }
  )
  @JoinColumn({ name: "image_analysis_request_id" })
  imageAnalysisRequest: ImageAnalysisRequest;

  @ManyToOne(() => ImageEvent, (imageEvent) => imageEvent.id, { eager: true })
  @JoinColumn({ name: "image_event_id" })
  imageEvent: ImageEvent;

  @Column({ name: "is_active", nullable: false })
  isActive: boolean;
}
