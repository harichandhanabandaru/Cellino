import { ApiProperty} from "@nestjs/swagger";
import {
  IsOptional,
  IsUUID,
} from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetClusterAttributesRequestDTO  extends PaginationDTO {

  @ApiProperty({ description: "Cluster Artifact Id of Cluster Attribute" })
  @IsUUID()
  @IsOptional()
  clusterArtifactId: string;

  @ApiProperty({ description: "Well Id of Cluster Attribute" })
  @IsUUID()
  @IsOptional()
  wellId: string;
}
