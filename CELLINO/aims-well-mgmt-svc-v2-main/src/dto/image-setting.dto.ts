import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { ImageSetting } from "../entities/image-setting.entity";
import { ChannelType } from "../enums/channel-type";
import { MagnificationType } from "../enums/maginification-type";

export class ImageSettingDTO {
  @ApiProperty({ description: "ID of the Image Setting" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Name of the Image Setting" })
  name: string;

  @ApiProperty({ enum: ChannelType })
  channelType: ChannelType;

  @ApiProperty({ enum: MagnificationType })
  magnification: string | null;

  @ApiProperty({ description: "Colormap information" })
  colorMap: string;

  @ApiProperty({ description: "A list of all Z steps" })
  zarray: Array<number>;

  @ApiProperty({ description: "Metadata information" })
  metadata: { [p: string]: unknown };

  @ApiProperty({ description: "Minimum value of all the Z steps" })
  zmin: number;

  @ApiProperty({ description: "Maximum value of all the Z steps" })
  zmax: number;

  @ApiProperty({ description: "Number of Z steps" })
  numberOfZStep: number;

  constructor(imageSetting: ImageSetting) {
    this.id = imageSetting.id;
    this.name = imageSetting.name;
    this.channelType = Object.values(ChannelType)[imageSetting.channelType];
    this.magnification =
      Object.values(MagnificationType)[imageSetting.magnification];
    this.colorMap = imageSetting.colorMap;
    this.metadata = imageSetting.metadata;
    this.zarray = imageSetting.zArray;
    if (imageSetting.zArray.length > 0 && imageSetting.zArray !== null) {
      imageSetting.zArray.sort((a, b) => {
        return a < b ? -1 : 1;
      });
      this.zmin = imageSetting.zArray[0];
      this.zmax = imageSetting.zArray[imageSetting.zArray.length - 1];
      this.numberOfZStep = imageSetting.zArray.length;
    }
  }
}
