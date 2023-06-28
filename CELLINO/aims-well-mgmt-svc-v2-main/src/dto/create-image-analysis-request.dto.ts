import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from "class-validator";

export class CreateImageAnalysisRequestDTO {
  @ApiProperty({ description: "Name of Image Analysis Request" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Image Analysis Request starting date" })
  @IsDateString()
  @IsNotEmpty()
  startedAt: Date;

  @ApiPropertyOptional({ description: "Image Analysis Request completed date" })
  @IsDateString()
  @IsOptional()
  completedAt: Date;

  @ApiProperty({ description: "Protocol Id of Image Analysis Request" })
  @IsUUID()
  @IsNotEmpty()
  protocolId: string;

  @ApiProperty({ description: "Image Event Id of Image Analysis Request" })
  @IsUUID()
  @IsNotEmpty()
  imageEventId: string;

  @ApiProperty({
    description: "Status Code of Image Analysis Request",
  })
  @IsNotEmpty()
  statusCode: string;

  @ApiPropertyOptional({
    description: "Status Details of Image Analysis Request",
  })
  @IsOptional()
  statusDetails: string;

  @ApiProperty({
    description:
      "Boolean flag Indicating If the Analysis Request is Experimental or not",
  })
  @IsBoolean()
  @IsNotEmpty()
  isDeveloperMode: boolean;

  @ApiProperty({
    description: "Input Parameters of the Image Analysis Request",
  })
  @IsNotEmpty()
  inputParameters: { [p: string]: unknown };
}
