import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { Inference } from "../entities/inference.entity";

export class InferenceDTO {
  @ApiProperty({ description: "ID of an Inference" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Name of an Inference" })
  @IsUUID()
  name: string;

  @ApiProperty({ description: "Inference zarr image bucket name, folder name" })
  artifactPath: Map<String, Object>;

  @ApiProperty({ description: "Metadata information" })
  metadata: { [p: string]: unknown };

  @ApiProperty({ description: "Protocol ID associated with Inference" })
  protocolId: string;

  @ApiProperty({ description: "ImageSetting ID associated with Inference" })
  imageSettingId: string;

  @ApiProperty({ description: "ImageEvent ID associated with an Inference" })
  imageEventId: string;

  @ApiProperty({
    description: "ImageAnalysisRequest ID associated with Inference",
  })
  imageAnalysisRequestId: string;

  constructor(inference: Inference) {
    this.id = inference.id;
    this.name = inference?.name;
    this.artifactPath = inference?.artifactPath;
    this.metadata = inference?.metadata;
    this.protocolId = inference?.protocolId;
    this.imageEventId = inference?.imageEvent?.id;
    this.imageSettingId = inference?.imageSetting?.id;
    this.imageAnalysisRequestId = inference?.imageAnalysisRequest?.id;
  }
}
