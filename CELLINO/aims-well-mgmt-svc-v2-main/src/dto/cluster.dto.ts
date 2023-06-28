import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ClusterOrColonyType } from "../enums/cluster-or-colony-type";
import { PhenoType } from "../enums/pheno-type";
import { CreateClusterRequestDTO } from "./cluster-request.dto";
import { Clonality } from "../enums/clonality";

export class ClusterDTO extends CreateClusterRequestDTO{

    @ApiProperty({description:'nameId of the cluster'})
    nameId:string;

    @ApiProperty({required:false, description:'parent Ids of the cluster'})
    parents:Map<string,object>;
    
    @ApiProperty({description:'cluster attributes has area, circularity, cells#, perimeter info'})
    attributes:Map<string,object>;
}