import {
  isNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { WellStatus } from "../enums/well-status";

export class GetWellsV2Dto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  plateId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  wellPosition: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: "Status of well",
    enum: WellStatus,
  })
  @Matches(
    `^(${Object.values(WellStatus)
      .filter((v) => typeof v !== "number")
      .join("|")})$`,
    "",
    {
      message: `status should be any of [${Object.keys(WellStatus)
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  status: string;
}
