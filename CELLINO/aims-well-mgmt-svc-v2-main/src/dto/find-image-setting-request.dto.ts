import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  isNumberString,
  IsOptional,
  Matches,
} from "class-validator";
import { ChannelType } from "../enums/channel-type";
import { MagnificationType } from "../enums/maginification-type";

export class FindImageSettingRequest {
  @ApiPropertyOptional({ description: "Name of image seting" })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: "channel type of image setting ",
    enum: ChannelType,
  })
  @IsOptional()
  @Matches(
    `^${Object.values(ChannelType)
      .filter((v) => typeof v !== "number")
      .join("|")}$`,
    "",
    {
      message: `channelType should be any of [${Object.keys(ChannelType)
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  channelType?: ChannelType;

  @ApiPropertyOptional({
    description: "Magnification used in image setting",
    enum: MagnificationType,
  })
  @IsOptional()
  @Matches(
    `^${Object.values(MagnificationType)
      .filter((v) => typeof v !== "number")
      .join("|")}$`,
    "",
    {
      message: `Magnification should be any of [${Object.keys(MagnificationType)
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  magnification?: MagnificationType;

  @ApiPropertyOptional({ description: "Color map of image setting" })
  @IsOptional()
  colorMap?: string;

  @ApiPropertyOptional({ description: "Z array of image setting" })
  @IsOptional()
  zarray?: Array<number>;

  @ApiPropertyOptional({ description: "Metadata of image setting" })
  @IsOptional()
  metadata?: { [p: string]: unknown };
}
