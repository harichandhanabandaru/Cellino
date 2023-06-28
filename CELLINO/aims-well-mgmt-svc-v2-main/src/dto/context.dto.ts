import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class Run {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly name?: string;
}

class Plate {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  readonly id?: string;
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly name?: string;
  @ApiProperty()
  @IsString()
  readonly barcode: string;
}

class Well {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  readonly id?: string;

  @IsString()
  @ApiProperty()
  readonly position?: string;
}

class ImageEvent {
  @ApiProperty()
  @IsUUID()
  readonly id: string;
}

export class ContextDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Run)
  readonly run?: Run;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Plate)
  @ApiProperty()
  readonly plate: Plate;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Well)
  readonly well: Well;

  @ApiProperty({ type: ImageEvent })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ImageEvent)
  readonly imageEvent: ImageEvent;

  @ApiProperty()
  @IsNotEmptyObject()
  readonly artifactPath: { [p: string]: unknown };
}
