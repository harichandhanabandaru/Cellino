import { ApiProperty } from "@nestjs/swagger";

export class BioseroParameterValueDTO {
  @ApiProperty({
    description: "Deprecated field. Do not use this field as it will be deleted at a later time",
  })
  protocol_name: string;

  @ApiProperty({
    description: "Array of wells and the protocol that need to be applied to each well",
  })
  wells: Array<BioseroWellConfiguration>;
}

export class BioseroWellConfiguration {
  @ApiProperty({ description: "Plate barcode of the well" })
  barcode: string;

  @ApiProperty({ description: "Well position" })
  well: string;

  @ApiProperty({ description: "Parameters of the protocol configuration." })
  parameters: Array<Object>;
}
