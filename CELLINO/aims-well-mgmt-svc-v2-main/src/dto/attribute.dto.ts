import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AttributeDTO {
  @ApiProperty({ description: "Id of the attribute label" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Name of the attribute" })
  name: string;

  @ApiProperty({ description: "Label given to the attribute" })
  label: string;

  @ApiProperty({ description: "Section" })
  section: string;

  @ApiProperty({ description: "Hint" })
  hint: string;

  @ApiProperty({ description: "Default units" })
  defaultUnits: string;
}
