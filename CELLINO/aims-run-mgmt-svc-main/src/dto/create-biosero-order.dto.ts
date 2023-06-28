import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateBioseroOrder {
  @ApiProperty({
    description: "The biosero order id",
  })
  @IsNotEmpty()
  bioseroIdentifier: string;

  @ApiProperty({
    type: String,
    description:
      "The Biosero order type can be any of  enum:[analysis_stitching,analysis_multiscaling,analsyis_nuc_inference,analsyis_density_nuc]",
  })
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({ description: "The plate barcode of the biosero order" })
  @IsOptional()
  plateBarcode: string;

  @ApiPropertyOptional({
    description: "The well position of the biosero order",
  })
  @IsOptional()
  wellPosition: string;

  @ApiPropertyOptional({
    description: "The protocol configuration name of the biosero order",
  })
  @IsOptional()
  protocolConfigurationName: string;

  @ApiProperty({ description: "The creation time of the biosero order" })
  @IsNotEmpty()
  createdAt: Date;

  @ApiPropertyOptional({
    description: "The metadata of the biosero order",
  })
  @IsOptional()
  metadata: { [p: string]: unknown };

  @ApiPropertyOptional({
    description: "The acquisition id of the biosero order",
  })
  @IsOptional()
  acquisitionId: string;

  @ApiPropertyOptional({
    description: "The image source of the biosero order",
  })
  @IsOptional()
  imageSource: string;

  @ApiPropertyOptional({
    description: "The image event id of the biosero order",
  })
  @IsOptional()
  @IsUUID()
  imageEventId: string;
}
