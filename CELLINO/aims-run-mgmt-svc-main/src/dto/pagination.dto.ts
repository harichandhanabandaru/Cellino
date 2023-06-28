import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, Min } from "class-validator";

export class PaginationDTO {

    @Type(() => Number)
    @IsOptional()
    @Min(1)
    @ApiProperty({required:false})
    page: number;
  
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    @ApiProperty({required:false})
    size: number;
}