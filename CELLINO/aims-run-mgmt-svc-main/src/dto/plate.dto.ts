import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { PlateContentDTO } from "./plate-content.dto";

export class PlateDTO{
    @ApiProperty({type:[PlateContentDTO]})
    content:PlateContentDTO[];
    @ApiProperty({type:PageInfo})
    pageInfo:PageInfo
}