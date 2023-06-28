import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { ChannelType } from "../../enums/channel-type";
import { MagnificationType } from "../../enums/maginification-type";
import { FindOptionsWhere, Raw, Repository } from "typeorm";
import { ImageSettingDTO } from "../../dto/image-setting.dto";
import { ImageSetting } from "../../entities/image-setting.entity";
import { CreateImageSettingRequest } from "../../dto/create-image-setting-request.dto";
import { randomUUID } from "crypto";
import { UserInfo } from "../../utils/user-info";
import { FindImageSettingRequest } from "../../dto/find-image-setting-request.dto";

@Injectable()
export class ImageSettingService {
  static NOT_FOUND_EXCEPTION_MESSAGE = "Data not found";
  constructor(
    @InjectRepository(ImageSetting)
    private readonly imageSettingRepository: Repository<ImageSetting>,
    private readonly userInfo: UserInfo
  ) {}

  async getById(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Image Setting Id ${id} should be UUID`);
    }

    const imageSetting = await this.imageSettingRepository.findOne({
      where: { id: id },
    });

    if (!imageSetting) {
      throw new NotFoundException(
        ImageSettingService.NOT_FOUND_EXCEPTION_MESSAGE
      );
    }

    return new ImageSettingDTO(imageSetting);
  }

  async findImageSettings(
    request: FindImageSettingRequest
  ): Promise<ImageSettingDTO[]> {
    let filter: FindOptionsWhere<ImageSetting> = {};

    if (request?.name) {
      filter.name = request.name;
    }

    if (request?.channelType) {
      filter.channelType = Object.values(ChannelType).indexOf(
        request.channelType
      ) as unknown as ChannelType;
    }

    if (request?.magnification) {
      filter.magnification = Object.values(MagnificationType).indexOf(
        request.magnification
      ) as unknown as MagnificationType;
    }

    if (request?.zarray) {
      filter.zArray = request.zarray as unknown as number;
    }

    if (request?.colorMap) {
      filter.colorMap = request.colorMap;
    }

    if (request?.metadata) {
      filter.metadata = Raw(
        (metadata) => `${metadata} @> '${JSON.stringify(request.metadata)}'`
      );
    }

    const imageSettings = await this.imageSettingRepository.find({
      where: filter,
    });

    if (imageSettings.length === 0) {
      throw new NotFoundException(
        "The provided image setting data is not present"
      );
    }

    return imageSettings.map(
      (imageSetting) => new ImageSettingDTO(imageSetting)
    );
  }

  async addImageSetting(
    request: CreateImageSettingRequest,
    userProfile: string
  ): Promise<ImageSettingDTO> {
    const imageSetting = new ImageSetting();
    imageSetting.name = request.name;
    imageSetting.channelType = Object.values(ChannelType).indexOf(
      request.channelType
    ) as unknown as ChannelType;
    imageSetting.colorMap = request.colorMap;
    imageSetting.magnification = Object.values(MagnificationType).indexOf(
      request.magnification
    ) as unknown as MagnificationType;
    imageSetting.metadata = request.metadata;
    imageSetting.zArray = request.zarray;
    const userId = this.userInfo.getUserId(userProfile);
    imageSetting.createdBy = userId;
    imageSetting.modifiedBy = userId;
    imageSetting.createdAt = new Date();
    imageSetting.modifiedAt = new Date();
    imageSetting.id = request.id ? request.id : randomUUID();
    const registeredImageSetting = await this.imageSettingRepository.save(
      imageSetting
    );
    return new ImageSettingDTO(registeredImageSetting);
  }
}
