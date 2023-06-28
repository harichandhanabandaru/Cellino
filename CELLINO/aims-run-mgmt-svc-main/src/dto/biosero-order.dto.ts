import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { BioseroOrder } from "../entities/biosero-order.entity";

export class BioseroOrderDTO {
  @ApiProperty({ description: "The ID of the BioseroOrder in AIMS" })
  id: string;

  @ApiProperty({
    description: "The biosero order id in data services",
  })
  bioseroIdentifier: string;

  @ApiProperty({
    description:
      "The Biosero order type enum:[analysis_stitching,analysis_multiscaling,analsyis_nuc_inference,analsyis_density_nuc]",
  })
  type: string;

  @ApiProperty({ description: "The plate barcode of the biosero order" })
  plateBarcode: string;

  @ApiPropertyOptional({
    description: "The well position of the biosero order",
  })
  wellPosition: string;

  @ApiPropertyOptional({
    description: "The protocol configuration of the biosero order",
  })
  protocolConfiguration: string;

  @ApiProperty({ description: "The creation time od the biosero order" })
  createdAt: Date;

  @ApiPropertyOptional({
    description: "The metadata of the biosero order",
  })
  metadata: { [p: string]: unknown };

  @ApiPropertyOptional({
    description: "The acquisition id of the biosero order",
  })
  acquisitionId: string;

  @ApiPropertyOptional({description: "The image Event Id of the biosero order"})
  @IsUUID('all')
  imageEventId: string

  @ApiPropertyOptional({description: "The image source of the biosero order"})
  imageSource: string

  constructor(order: BioseroOrder) {
    this.id = order.id;
    this.bioseroIdentifier = order.bioseroIdentifier;
    this.plateBarcode = order.plateBarcode;
    this.wellPosition = order.wellPosition;
    this.protocolConfiguration = order.protocolConfiguration;
    this.type = order.type.code;
    this.createdAt = order.createdAt;
    this.metadata = order.metadata;
    this.imageSource = order.imageSource;
    this.acquisitionId = order.acquisitionId;
  }
}
