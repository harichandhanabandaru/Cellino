import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { IsUUID } from "class-validator";
import { ImageEvent } from "./image-event.entity";
import { AnalysisRequestStatus } from "./analysis-request-status.entity";

@Entity("image_analysis_request")
export class ImageAnalysisRequest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", type: "text" })
  name: string;

  @Column({ name: "protocol_id",type:"uuid" , nullable:true})
  protocolId: string;

  @ManyToOne(
    () => AnalysisRequestStatus,
    (analysisRequestStatus) => analysisRequestStatus.code,
    {
      cascade: true,
    }
  )
  @JoinColumn({
    name: "status_code",
    referencedColumnName: "code",
  })
  statusCode: AnalysisRequestStatus;

  @Column({ name: "status_details", nullable: true, type: "text" })
  statusDetails: string;

  @Column({ name: "input_parameters", type: "jsonb" })
  inputParameters: { [p: string]: unknown };

  @Column({
    name: "started_at",
    type: "timestamp with time zone",
    nullable: false,
  })
  startedAt: Date;

  @Column({
    name: "completed_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  completedAt: Date;

  @Column({ name: "is_developer_mode", nullable: false, type: "boolean" })
  isDeveloperMode: boolean;

  @ManyToOne(() => ImageEvent, (imageEvent) => imageEvent.id, { eager: true })
  @JoinColumn({ name: "image_event_id" })
  imageEvent: ImageEvent;
}
