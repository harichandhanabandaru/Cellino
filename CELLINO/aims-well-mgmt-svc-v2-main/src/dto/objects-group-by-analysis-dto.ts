import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class ObjectCountByAnalysisRequestDto {
  @ApiProperty()
  @IsUUID()
  imageAnalysisRequestId: string;

  @ApiProperty()
  @IsString()
  imageAnalysisRequestName: string;

  @ApiProperty()
  @IsNumber()
  count: number;
}
