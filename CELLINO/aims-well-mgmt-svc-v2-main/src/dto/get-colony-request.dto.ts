import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  isNumberString,
  IsOptional,
  IsUUID,
  Matches,
} from "class-validator";
import { ClusterOrColonyQuality } from "src/enums/cluster-or-colony-quality";

export class GetColonyRequestDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  imageEventId: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: "Quality of Colony",
    enum: ClusterOrColonyQuality,
    required: false,
  })
  @Matches(
    `^(${Object.values(ClusterOrColonyQuality)
      .filter((v) => typeof v !== "number")
      .join("|")})$`,
    "",
    {
      message: `clusterOrColonyQuality should be any of [${Object.keys(
        ClusterOrColonyQuality
      )
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  quality: string;
}
