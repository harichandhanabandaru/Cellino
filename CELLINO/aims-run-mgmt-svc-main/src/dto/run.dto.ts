import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { RunContentDto } from "./run-content-dto.dto";




export class RunDTO{
    @ApiProperty({type:[RunContentDto]})
    content:RunContentDto[];
    @ApiProperty({type:PageInfo})
    pageInfo:PageInfo
}