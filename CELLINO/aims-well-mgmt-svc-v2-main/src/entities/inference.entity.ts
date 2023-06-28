import { Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { ImageEvent } from "./image-event.entity";
import { ImageAnalysisRequest } from "./image-analysis-request.entity";
import { ImageSetting } from "./image-setting.entity";

@Entity("inference_artifact")
export class Inference extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable:false})
    name: string;
    
    @Column({name:"artifact_path",type:"jsonb", nullable:true})
    artifactPath: Map<string,Object>;

    @Column({name:"metadata",type:"jsonb",nullable:true})
    metadata: { [p: string]: unknown };

    @Column({name:"protocol_id", nullable:true})
    protocolId: string;

    @ManyToOne( () => ImageEvent, (imageEvent) => imageEvent.id, { eager: true ,nullable:true})
	@JoinColumn({name : "image_event_id"})
	imageEvent: ImageEvent;

    @ManyToOne( () => ImageAnalysisRequest, (imageAnalysisRequest) => imageAnalysisRequest.id, { eager: true ,nullable:true})
	@JoinColumn({name : "image_analysis_request_id"})
	imageAnalysisRequest: ImageAnalysisRequest;

    @ManyToOne( () => ImageSetting, (imageSetting) => imageSetting.id, { eager: true ,nullable:true})
	@JoinColumn({name : "image_setting_id"})
	imageSetting: ImageSetting;
}
