import { ApiProperty } from "@nestjs/swagger";

export class BioseroOrderInputParametersDTO {
  @ApiProperty({
    description: "The biosero template name",
  })
  templateName: string;

  @ApiProperty({
    description: "The input parameters required for the biosero order",
  })
  inputParameters: Array<BioseroOrderInputParameterDTO>;
}

export class BioseroOrderInputParameterDTO {
  @ApiProperty({
    description: "The config name of the input parameter of the biosero order",
  })
  name: string;

  @ApiProperty({ description: "The parameter value of the biosero order" })
  value: any;
}
