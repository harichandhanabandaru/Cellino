import { ApiProperty } from "@nestjs/swagger";

export class PageInfo
{
    @ApiProperty()
    totalElements:number;
    @ApiProperty()
    size:number;
    @ApiProperty()
    page:number;
}