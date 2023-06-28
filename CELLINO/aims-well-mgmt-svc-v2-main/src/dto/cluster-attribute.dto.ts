import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { CreateClusterAttributeRequestDTO } from "./create-cluster-attribute-request.dto";


export class ClusterAttributeDTO extends CreateClusterAttributeRequestDTO{

    @ApiProperty({ description: "ID of a Cluster Artifact" })
    @IsUUID()
    id: string;
    
}