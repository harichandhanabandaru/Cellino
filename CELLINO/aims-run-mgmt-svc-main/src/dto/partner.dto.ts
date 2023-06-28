import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PartnerType } from "../enums/PartnerType";

export class PartnerDTO{
    @ApiProperty()
    @IsUUID("all")
    @ApiProperty()
    id:string;
    @ApiProperty()
    name:string;
    @ApiProperty({enum:['COLLABORATOR','PARTNER']})
    type:PartnerType;
}