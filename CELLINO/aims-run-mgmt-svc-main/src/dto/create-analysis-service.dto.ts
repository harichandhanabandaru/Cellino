import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateAnalysisServiceDTO {
  @ApiProperty({ description: "Friendly name for the record" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Metadata information for the record" })
  @IsObject()
  metadata: { [p: string]: unknown };
}
