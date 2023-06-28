import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty,IsOptional, IsString } from "class-validator";

export class CreateLookUpDataDTO {
  @IsNotEmpty()
  @ApiProperty({ description: "code of the protocol Category" })
  @IsString()
  code: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "label to be displayed on UI for the protocol Category",
  })
  @IsString()
  label: string;

  @ApiPropertyOptional({ description: "description of the protocol Category" })
  @IsOptional()
  @IsString()
  description: string;
}
