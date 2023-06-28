import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsUUID } from "class-validator";

export class PartnerIdsListRequest {
    @IsArray() 
    @IsUUID("all",{ each: true }) 
    @Transform(({ value }) => 
    value.toString().trim().substring().split(',').map(id=>String(id))) 
    @ApiProperty({ required:true ,format:'form',type:[String],description:"Takes ids as comma seperated values ex:id1,id2" })
    ids: string[];
}