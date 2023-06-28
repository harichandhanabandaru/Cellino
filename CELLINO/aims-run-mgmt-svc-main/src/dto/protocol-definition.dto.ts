import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { ProtocolDefinitionContentDTO } from "./protocol-definition-content.dto";


export class ProtocolDefinitionDTO{
    @ApiProperty({type:[ProtocolDefinitionContentDTO]})
    content:ProtocolDefinitionContentDTO[];
    @ApiProperty({type:PageInfo})
    pageInfo:PageInfo
}