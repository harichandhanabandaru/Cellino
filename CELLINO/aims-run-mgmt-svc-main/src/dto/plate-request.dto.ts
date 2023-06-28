import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";


export class LabwareRequestDTO {
  @ApiProperty({required:false,description:"Labware id is of type uuid and is used to indentify to which type of plastic or glass the plate is.."})
  @IsUUID("all")
  @IsOptional()
  id: string | null;
  @ApiProperty({required:false,description:"The name of the labware"})
  @IsOptional()
  name: string | null;
}
export class CreatedByDTO {
  @ApiProperty({required:false,description:"The id of the user which is an uuid"})
  @IsUUID("all")
  @IsOptional()
  id: string | null;
  @ApiProperty({required:false,description:"The email of user"})
  @IsOptional()
  email: string | null;
}
export class CreatePlateRequestDTO {
  @ApiPropertyOptional({ name:"name",description:"The name of the plate" })
  @IsOptional()
  name: string;

  @ApiProperty({ name:"barcode" ,description:"The barcode of a plate Ex:001394",required: true })
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({description:"A plate is a subcategory of labware.Either of labware id or name should be provided to tie the plate to a specific labware",required:true})
  @IsNotEmpty()
  @ValidateNested()
  @Type(()=>LabwareRequestDTO)
  labware: LabwareRequestDTO;

  @ApiProperty({description:"For audit purpose the user details are stored along with the plate details and either of user id or user email should be provided",required:true})
  @IsNotEmpty()
  @ValidateNested()
  @Type(()=>CreatedByDTO)
  createdBy: CreatedByDTO;
}
