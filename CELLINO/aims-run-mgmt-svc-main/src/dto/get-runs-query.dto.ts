
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";


import {
  IsArray,
  IsOptional,
  IsUUID,
  Min
} from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetRunsRequestDTO extends PaginationDTO{
  @IsOptional()
  @IsArray() 
  @IsUUID("all",{ each: true }) 
  @Transform(({ value }) => 
  value.toString().trim().substring().split(',').map(id=>String(id))) 
  @ApiProperty({ required:false ,format:'form',type:[String],description:"Takes ids as comma seperated values ex:id1,id2" })
  ids: string[];
  
  @IsOptional()
  @ApiProperty({required:false})
  nameLike: string;

  @IsOptional()
  @ApiProperty({required:false})
  status: string;

  @IsOptional()
  @ApiProperty({required:false})
  bioseroMasterOrderId: string;
}
