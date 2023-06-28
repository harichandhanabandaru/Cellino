import { ContextDto } from "./context.dto";
import {
  IsBoolean,
  IsNotEmptyObject,
  IsOptional,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class Protocol {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly name?: string;
}

export class TriggerAnalysisRequestDto {
  @ApiProperty({ description: "Either of protocol id or name is expected" })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Protocol)
  readonly protocol: Protocol;

  @IsBoolean()
  @ApiProperty()
  readonly developerMode: boolean;

  @ApiProperty({ description: "Context can be downloaded from ui" })
  @ValidateNested()
  @Type(() => ContextDto)
  @IsNotEmptyObject()
  readonly context: ContextDto;

  @ApiPropertyOptional()
  @IsOptional()
  readonly settings: { [p: string]: unknown };
}
