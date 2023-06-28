import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { CreateImageEventRequestDTO } from "../../dto/create-image-event-request.dto";
import { ImageEventDTO } from "../../dto/image-event.dto";
import { ImageSetting } from "../../entities/image-setting.entity";
import { Well } from "../../entities/well.entity";
import { UserInfo } from "../../utils/user-info";
import { FindOptionsWhere, IsNull, Repository, Not } from "typeorm";
import { ImageEvent } from "../../entities/image-event.entity";
import { AnalysisReviewStatus } from "../../enums/analysis-review-status";
import { randomUUID } from "crypto";
import { getEnumIndex } from "../../utils/get-enum-index";
import { ReviewStatus } from "../../enums/review-status";
import { applyPatch, Operation } from "fast-json-patch";
import { WellRequest } from "../../dto/well-request.dto";
import { PlateRequest } from "../../dto/plate-request.dto";
import { GetImageEventsDto } from "../../dto/get-image-events.dto";
import { ExternalRunService } from "../../utils/external-run.service";
import { ProtocolDto } from "../../dto/protocol.dto";
import { GroupedImageEventsDTO } from "../../dto/grouped-image-events.dto";
import { ImageEventsByWellIdRequest } from "../../dto/image-event-by-well-reuqest.dto";
import { SetBaseImageRequestDTO } from "../../dto/set-base-image-request.dto";
import { ChannelType } from "../../enums/channel-type";

@Injectable()
export class ImageEventService {
  static BAD_REQUEST_EXCEPTION_MESSAGE = "`id` is not UUID";
  static NOT_FOUND_EXCEPTION_MESSAGE = "Data not found";
  private readonly logger = new Logger(ImageEventService.name);
  constructor(
    @InjectRepository(ImageEvent)
    private readonly imageEventRepository: Repository<ImageEvent>,
    @InjectRepository(ImageSetting)
    private readonly imageSettingRepository: Repository<ImageSetting>,
    @InjectRepository(Well)
    private readonly wellRepository: Repository<Well>,
    private readonly userInfo: UserInfo,
    private readonly externalRunService: ExternalRunService
  ) {}

  async getById(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        ImageEventService.BAD_REQUEST_EXCEPTION_MESSAGE
      );
    }
    const imageEvent = await this.imageEventRepository.findOne({
      where: { id: id },
      relations: { imageSetting: true, well: true },
    });
    if (imageEvent) {
      return new ImageEventDTO(imageEvent);
    } else
      throw new NotFoundException(
        `The provided Image Event id ${id} is not found`
      );
  }

  async addImageEvent(
    request: CreateImageEventRequestDTO,
    userProfile: string
  ): Promise<ImageEventDTO> {
    const imageEvent = new ImageEvent();
    imageEvent.id = request?.id ? request.id : randomUUID();
    imageEvent.name = request.name;
    imageEvent.metadata = request?.metadata;
    try {
      imageEvent.imageSetting = await this.imageSettingRepository.findOneOrFail(
        {
          where: { id: request.imageSettingId },
        }
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        `The provided image setting id ${request.imageSettingId} is invalid`
      );
    }
    try {
      const event = await this.externalRunService.fetchEventById(
        request.eventId
      );
      imageEvent.eventId = event.id;

      let protocol: ProtocolDto;
      if (request.protocol?.id) {
        protocol = await this.externalRunService.fetchProtocolById(
          request.protocol.id
        );
      } else if (request.protocol?.name) {
        protocol = await this.externalRunService.fetchProtocolByName(
          request.protocol.name
        );
      }
      imageEvent.protocolId = protocol.id;
      imageEvent.well = await this.getWellEntity(request.plate, request.well);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
    imageEvent.analysisStatus = AnalysisReviewStatus[
      request.analysisStatus
    ] as unknown as AnalysisReviewStatus;
    imageEvent.startedAt = request.startedAt;
    const userId = this.userInfo.getUserId(userProfile);
    imageEvent.createdBy = userId;
    imageEvent.modifiedBy = userId;
    imageEvent.createdAt = new Date();
    imageEvent.modifiedAt = new Date();
    const imageEventSaved = await this.imageEventRepository.save(imageEvent);
    return new ImageEventDTO(imageEventSaved);
  }

  async getWellEntity(
    plateRequest: PlateRequest,
    wellRequest: WellRequest
  ): Promise<Well> {
    if (wellRequest.id) {
      return await this.wellRepository.findOneOrFail({
        where: { id: wellRequest.id },
      });
    }
    let plateId: string;
    if (plateRequest.id) {
      const plate = await this.externalRunService.fetchPlateById(
        plateRequest.id
      );
      plateId = plate.id;
    }
    if (plateRequest.barcode && !plateId) {
      const plate = await this.externalRunService.fetchPlateByBarcode(
        plateRequest.barcode
      );
      plateId = plate.id;
    }
    if (plateId && wellRequest.wellPosition) {
      return await this.wellRepository.findOneOrFail({
        where: { plateId: plateId, position: wellRequest.wellPosition },
      });
    } else {
      throw new Error("Provided well or plate information is invalid.");
    }
  }

  async UpdateImageEvent(
    id: string,
    data: Array<Operation>,
    userProfile: string
  ): Promise<ImageEventDTO> {
    const imageEvent = await this.imageEventRepository.findOne({
      where: { id: id },
      loadRelationIds: {
        relations: ["imageSetting", "well"],
        disableMixedMap: true,
      },
    });
    if (!imageEvent) {
      throw new NotFoundException(
        `The provided Image Event Id ${id} is not found`
      );
    }
    data.forEach((operation) => {
      if (operation.path === "/reviewStatus") {
        operation["value"] = getEnumIndex(operation["value"], ReviewStatus);
      } else if (operation.path === "/analysisStatus") {
        operation["value"] = getEnumIndex(
          operation["value"],
          AnalysisReviewStatus
        );
      }
    });

    let result = applyPatch(imageEvent, data);
    let patchedObject = result.newDocument;
    let userId = await this.userInfo.getUserId(userProfile);
    if (userId) {
      patchedObject.modifiedBy = userId;
    }
    patchedObject.modifiedAt = new Date();
    let updatedImageEvent = await this.imageEventRepository.save(patchedObject);
    return new ImageEventDTO(updatedImageEvent);
  }

  async getImageEvents(getImageEventsDto: GetImageEventsDto) {
    const { eventId, wellId, analysisStatus, isBaseImage } = getImageEventsDto;
    if (!(eventId || wellId)) {
      throw new BadRequestException(
        "At least one of eventId or wellId should be provided."
      );
    }
    const whereClause: FindOptionsWhere<ImageEvent> = {};
    const whereWellClause: FindOptionsWhere<Well> = {};
    if (eventId) {
      whereClause.eventId = eventId;
    }
    if (wellId) {
      whereWellClause.id = wellId;
      whereClause.well = whereWellClause;
    }
    if (analysisStatus !== undefined) {
      whereClause.analysisStatus = AnalysisReviewStatus[analysisStatus];
    }
    if (isBaseImage === true || isBaseImage === false) {
      whereClause.isBaseImage = isBaseImage;
    }
    const imageEvents = await this.imageEventRepository.find({
      where: whereClause,
      loadRelationIds: {
        relations: ["well", "imageSetting"],
        disableMixedMap: true,
      },
      order: { createdAt: "ASC" },
    });
    return imageEvents.map((event) => new ImageEventDTO(event));
  }

  async imageEventsGroupedByEventId(request: ImageEventsByWellIdRequest) {
    const imageEvents = await this.imageEventRepository.find({
      where: {
        well: { id: request.wellId },
        analysisStatus: 3,
        imageSetting: { id: Not(IsNull()) },
      },
      order: { createdAt: "ASC" },
      relations: { imageSetting: true },
      loadRelationIds: {
        relations: ["well"],
        disableMixedMap: true,
      },
    });
    const eventIndexMap = new Map();
    const groupedImageEvents: GroupedImageEventsDTO[] = [];
    imageEvents?.map((imageEvent) => {
      const imageEventDTO = new ImageEventDTO(imageEvent);
      const eventIndex = eventIndexMap.get(imageEventDTO.eventId);
      if (Number.isFinite(eventIndex)) {
        groupedImageEvents[eventIndex].imageEvents.push(imageEventDTO);
      } else {
        const groupedImageEvent = new GroupedImageEventsDTO();
        groupedImageEvent.eventId = imageEventDTO.eventId;
        groupedImageEvent.imageEvents = [imageEventDTO];
        groupedImageEvents.push(groupedImageEvent);
        eventIndexMap.set(imageEventDTO.eventId, eventIndexMap.size);
      }
    });
    return groupedImageEvents;
  }

  async setBaseImage(request: SetBaseImageRequestDTO, userProfile: string) {
    //validate the input request and return the image event object of image event id provided in request
    const imageEvent = await this.validateRequestAndReturnImageEvent(request);

    const userId = this.userInfo.getUserId(userProfile);

    //find the base image event for the provided wellId and eventId
    const baseImageEvent = await this.imageEventRepository.findOne({
      where: {
        well: { id: request.wellId },
        eventId: request.eventId,
        isBaseImage: true,
      },
      relations: { imageSetting: true },
      loadRelationIds: { relations: ["well"], disableMixedMap: true },
    });

    //if there is base image event and the incoming image event is of type BRT
    //1. set the is_base_image of base image event to false
    //2. set the is_base_image of incoming image event to true
    //3. save these in db
    if (
      baseImageEvent &&
      Object.values(ChannelType)[imageEvent?.imageSetting.channelType] === "BRT"
    ) {
      imageEvent.isBaseImage = true;
      imageEvent.modifiedAt = new Date();
      imageEvent.modifiedBy = userId;
      baseImageEvent.isBaseImage = false;
      baseImageEvent.modifiedAt = new Date();
      baseImageEvent.modifiedBy = userId;
      await this.imageEventRepository.save(baseImageEvent);
      const updatedImageEvent = await this.imageEventRepository.save(
        imageEvent
      );
      return new ImageEventDTO(updatedImageEvent);
    }
    //If there is no base image event set the is_base_image to true for the incoming image event
    else if (!baseImageEvent) {
      imageEvent.isBaseImage = true;
      imageEvent.modifiedAt = new Date();
      imageEvent.modifiedBy = userId;
      const updatedImageEvent = await this.imageEventRepository.save(
        imageEvent
      );
      return new ImageEventDTO(updatedImageEvent);
    }
    return new ImageEventDTO(imageEvent);
  }

  async validateRequestAndReturnImageEvent(request: SetBaseImageRequestDTO) {
    try {
      await this.wellRepository.findOneOrFail({
        where: { id: request.wellId },
      });
      await this.externalRunService.fetchEventById(request.eventId);
      return await this.imageEventRepository.findOneOrFail({
        where: { id: request.imageEventId },
        relations: { imageSetting: true },
        loadRelationIds: { relations: ["well"], disableMixedMap: true },
      });
    } catch (e) {
      throw new BadRequestException(
        `The provided request is invalid : ${e.message}`
      );
    }
  }
}
