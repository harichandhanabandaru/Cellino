import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetBioseroOrderRequest {
  @ApiPropertyOptional()
  @IsOptional()
  plateBarcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  wellPosition: string;

  @ApiPropertyOptional()
  @IsOptional()
  imageSource: string;

  @ApiPropertyOptional()
  @IsOptional()
  protocolConfigurationName: string;

  @ApiPropertyOptional()
  @IsOptional()
  type: string;

  @ApiPropertyOptional({
    description: "The acquisition id of the biosero order",
  })
  @IsOptional()
  acquisitionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  imageEventId: string;
}
