import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  isNumberString,
  IsOptional,
  IsUUID,
  Matches,
} from "class-validator";
import { ChannelType } from "../enums/channel-type";
import { MagnificationType } from "../enums/maginification-type";

export class CreateImageSettingRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  id:string

  @ApiProperty({ description: "Name of image seting" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "channel type of image setting ",
    enum: ChannelType,
  })
  @IsNotEmpty()
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
  channelType: ChannelType;

  @ApiProperty({
    description: "Magnification used in image setting",
    enum: MagnificationType,
  })
  @IsNotEmpty()
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
  magnification: MagnificationType;

  @ApiProperty({ description: "Color map of image setting" })
  @IsNotEmpty()
  colorMap: string;

  @ApiProperty({ description: "Z array of image setting" })
  @IsNotEmpty()
  zarray: Array<number>;

  @ApiProperty({ description: "Metadata of image setting" })
  @IsNotEmptyObject()
  metadata: { [p: string]: unknown };
}
