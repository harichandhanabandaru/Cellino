import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { GenerationType } from "./generation-type.entity";
import { ImageAnalysisRequest } from "./image-analysis-request.entity";
import { ImageEvent } from "./image-event.entity";
import { BaseEntity } from "./base-entity.entity";

@Entity("scan_object")
@Unique(["name", "imageAnalysisRequest"])
export class ScanObject extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false, length: 50 })
  name: string;

  @ManyToOne(() => GenerationType, (generationType) => generationType.code, {
    cascade: true,
  })
  @JoinColumn({ name: "generation_type_code", referencedColumnName: "code" })
  generationType: GenerationType;

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

  @Column({ name: "outline", type: "jsonb", nullable: false })
  outline: { [p: string]: unknown };

  @Column({ type: "jsonb" })
  attributes: { [p: string]: unknown };

  @Column({ name: "is_active" })
  isActive: boolean;

  @OneToOne(() => ScanObject, (scanObject) => scanObject.id, {
    nullable: true,
  })
  @JoinColumn({ name: "original_object_id" })
  originalObject: ScanObject;
}
