import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class BioseroTrackerDto {

  @IsOptional()
  @ApiPropertyOptional()
  id: string

  @ApiProperty()
  @IsNotEmpty()
  type: string

  @ApiPropertyOptional()
  @IsOptional()
  topic: string

  @ApiProperty()
  @IsNotEmpty()
  endTime: Date
}