import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class ObjectCachingRuleDto {
  @ApiPropertyOptional()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  objectPattern: string;

  @ApiProperty()
  @IsNotEmpty()
  cacheControl: string;
}
