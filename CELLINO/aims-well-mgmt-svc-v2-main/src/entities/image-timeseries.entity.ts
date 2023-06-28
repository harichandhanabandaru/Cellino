import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { ImageAnalysisRequest } from "./image-analysis-request.entity";
import { ImageEvent } from "./image-event.entity";
import { Well } from "./well.entity";

@Entity("image_timeseries")
export class ImageTimeseries extends BaseEntity {
  // PrimaryKey
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // ManyToOne
  @ManyToOne(() => Well, (well) => well.id)
  @JoinColumn({ name: "well_id" })
  well: Well;

  // OneToOne
  @OneToOne(() => ImageEvent, (event) => event.id)
  @JoinColumn({ name: "image_event_id" })
  imageEvent: ImageEvent;

  // OneToOne
  @OneToOne(() => ImageAnalysisRequest, (request) => request.id)
  @JoinColumn({ name: "image_analysis_request_id" })
  imageAnalysisRequest: ImageAnalysisRequest;

  // Json
  @Column({ name: "measurements", type: "jsonb", nullable: true })
  imageMetadata: { [p: string]: unknown };
}
