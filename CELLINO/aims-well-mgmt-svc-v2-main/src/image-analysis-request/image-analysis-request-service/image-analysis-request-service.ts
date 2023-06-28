import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfo } from "../../utils/user-info";
import { EntityNotFoundError, FindOptionsWhere, In, Repository } from "typeorm";
import { randomUUID } from "crypto";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { CreateImageAnalysisRequestDTO } from "../../dto/create-image-analysis-request.dto";
import { ImageAnalysisRequestDTO } from "../../dto/image-analysis-request.dto";
import { AnalysisRequestStatus } from "../../entities/analysis-request-status.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { TriggerAnalysisRequestDto } from "../../dto/trigger-analysis-request.dto";
import { ExternalRunService } from "../../utils/external-run.service";
import { ProtocolDto } from "../../dto/protocol.dto";
import { MlAnalysisRequestPayloadDto } from "../../dto/ml-analysis-request-payload.dto";
import { PubSubPublisherService } from "../../utils/pub-sub-publisher.service";
import { merge } from "lodash";
import { GetAnalysisRequestDto } from "../../dto/get-analysis-request.dto";

@Injectable()
export class ImageAnalysisRequestService {
  static BAD_REQUEST_EXCEPTION_MESSAGE = "`id` is not UUID";
  static NOT_FOUND_EXCEPTION_MESSAGE = "Data not found";
  private readonly logger = new Logger(ImageAnalysisRequestService.name);
  constructor(
    @InjectRepository(ImageAnalysisRequest)
    private readonly imageAnalysisRequestRepository: Repository<ImageAnalysisRequest>,
    @InjectRepository(AnalysisRequestStatus)
    private readonly analysisRequestStatusRepository: Repository<AnalysisRequestStatus>,
    @InjectRepository(ImageEvent)
    private readonly imageEventRepository: Repository<ImageEvent>,
    private readonly userInfo: UserInfo,
    private readonly externalRunService: ExternalRunService,
    private readonly publisherService: PubSubPublisherService
  ) {}

  async addImageAnalysisRequest(
    request: CreateImageAnalysisRequestDTO,
    userProfile: string
  ): Promise<ImageAnalysisRequestDTO> {
    const imageAnalysisRequest = new ImageAnalysisRequest();
    let savedImageAnalysisReqeust;
    const id = randomUUID();
    imageAnalysisRequest.id = id;
    imageAnalysisRequest.name = `${request.name}-${id}`;
    if (request?.statusCode) {
      let analysisRequestStatus: AnalysisRequestStatus =
        await this.analysisRequestStatusRepository.findOne({
          where: { code: request.statusCode },
        });
      if (!analysisRequestStatus) {
        throw new NotFoundException(
          `The analysisStatusCode details with code ${request.statusCode} is not found`
        );
      }
      imageAnalysisRequest.statusCode = analysisRequestStatus;
    }
    imageAnalysisRequest.statusDetails = request?.statusDetails;
    imageAnalysisRequest.startedAt = request.startedAt;
    imageAnalysisRequest.completedAt = request?.completedAt;
    const res = await (
      await fetch(
        `${process.env.RUN_MGMT_SVC}/v1/protocols/${request.protocolId}`
      )
    ).json();
    if (res.statusCode != 404) {
      imageAnalysisRequest.protocolId = request.protocolId;
    } else {
      throw new NotFoundException("Invalid protocol Id :" + request.protocolId);
    }

    if (request.imageEventId) {
      imageAnalysisRequest.imageEvent = await this.imageEventRepository.findOne(
        {
          where: { id: request.imageEventId },
        }
      );
    }
    imageAnalysisRequest.isDeveloperMode = request.isDeveloperMode;
    imageAnalysisRequest.inputParameters = request.inputParameters;

    const userId = this.userInfo.getUserId(userProfile);
    imageAnalysisRequest.createdBy = userId;
    imageAnalysisRequest.modifiedBy = userId;
    imageAnalysisRequest.createdAt = new Date();
    imageAnalysisRequest.modifiedAt = new Date();
    try {
      savedImageAnalysisReqeust =
        await this.imageAnalysisRequestRepository.save(imageAnalysisRequest);
    } catch (e) {
      this.logger.error(
        "Exception encountered while saving ImageAnalysisRequest to DB :" + e
      );
      throw new InternalServerErrorException(
        "Exception encountered while saving ImageAnalysisRequest to DB :" + e
      );
    }
    return new ImageAnalysisRequestDTO(savedImageAnalysisReqeust);
  }

  async update(
    imageAnalysisRequestId: string,
    patchData: Operation[],
    userProfile: string
  ): Promise<ImageAnalysisRequest> {
    const imageAnalysisRequest =
      await this.imageAnalysisRequestRepository.findOne({
        where: { id: imageAnalysisRequestId },
      });
    if (!imageAnalysisRequest) {
      throw new NotFoundException(
        ImageAnalysisRequestService.NOT_FOUND_EXCEPTION_MESSAGE
      );
    }
    // Update the record
    const result = applyPatch(imageAnalysisRequest, deepClone(patchData));
    const patchedObject = result.newDocument;
    const userId = await this.userInfo.getUserId(userProfile);
    if (userId) {
      patchedObject.modifiedBy = userId;
    }
    patchedObject.modifiedAt = new Date();
    const updatedImageAnalysisReqeust =
      await this.imageAnalysisRequestRepository.save(patchedObject);
    // Return the updated record.
    return Promise.resolve(updatedImageAnalysisReqeust);
  }

  private createMlAnalysisRequestPayload(
    analysisRequest: ImageAnalysisRequest,
    triggerAnalysisRequestDto: TriggerAnalysisRequestDto
  ) {
    const mlAnalysisRequestPayloadDto = new MlAnalysisRequestPayloadDto();
    mlAnalysisRequestPayloadDto.id = analysisRequest.id;
    mlAnalysisRequestPayloadDto.image_event_id = analysisRequest.imageEvent.id;
    mlAnalysisRequestPayloadDto.name = analysisRequest.name;
    mlAnalysisRequestPayloadDto.biosero_order_identifier = null;
    mlAnalysisRequestPayloadDto.is_developer_mode =
      analysisRequest.isDeveloperMode;
    mlAnalysisRequestPayloadDto.plate_barcode =
      triggerAnalysisRequestDto.context.plate.barcode;
    mlAnalysisRequestPayloadDto.protocol_id = analysisRequest.protocolId;
    mlAnalysisRequestPayloadDto.started_at = analysisRequest.startedAt;
    mlAnalysisRequestPayloadDto.well_position =
      triggerAnalysisRequestDto.context.well.position;
    mlAnalysisRequestPayloadDto.status = analysisRequest.statusCode.code;
    mlAnalysisRequestPayloadDto.input_parameters =
      analysisRequest.inputParameters;
    console.log("payload for ml : ", mlAnalysisRequestPayloadDto);
    return mlAnalysisRequestPayloadDto;
  }

  async getById(id: string): Promise<ImageAnalysisRequestDTO> {
    try {
      const analysisRequest = await this.imageAnalysisRequestRepository.findOne(
        {
          where: {
            id,
          },
          loadRelationIds: true,
        }
      );
      return new ImageAnalysisRequestDTO(analysisRequest);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      } else throw new InternalServerErrorException(e.message);
    }
  }

  async triggerAnalysis(
    triggerAnalysisRequestDto: TriggerAnalysisRequestDto,
    userProfile: string
  ) {
    let analysisRequest = new ImageAnalysisRequest();
    analysisRequest.imageEvent = await this.imageEventRepository.findOneOrFail({
      where: {
        id: triggerAnalysisRequestDto.context.imageEvent.id,
      },
    });
    const protocol: ProtocolDto = triggerAnalysisRequestDto.protocol.id
      ? await this.externalRunService.fetchProtocolById(
          triggerAnalysisRequestDto.protocol.id
        )
      : await this.externalRunService.fetchProtocolByName(
          triggerAnalysisRequestDto.protocol.name
        );
    if (!protocol) {
      throw new NotFoundException("Protocol for given name or id don't exist");
    }
    const id = randomUUID();
    analysisRequest.id = id;
    analysisRequest.name = `${protocol.name}-${id}`;
    const inputParameters: { [p: string]: unknown } =
      triggerAnalysisRequestDto?.settings
        ? merge(protocol.settings, triggerAnalysisRequestDto.settings)
        : protocol.settings;
    inputParameters["artifact_path"] =
      triggerAnalysisRequestDto.context.artifactPath;
    analysisRequest.protocolId = protocol.id;
    analysisRequest.startedAt = new Date();
    analysisRequest.createdAt = new Date();
    analysisRequest.modifiedAt = new Date();
    analysisRequest.inputParameters = JSON.parse(
      JSON.stringify(inputParameters)
    );
    const userId = this.userInfo.getUserId(userProfile);
    analysisRequest.modifiedBy = userId;
    analysisRequest.createdBy = userId;
    analysisRequest.isDeveloperMode = triggerAnalysisRequestDto.developerMode;
    analysisRequest.statusCode =
      await this.analysisRequestStatusRepository.findOneOrFail({
        where: {
          code: "INQUEUE",
        },
      });

    analysisRequest = await this.imageAnalysisRequestRepository.save(
      analysisRequest
    );
    const payload = this.createMlAnalysisRequestPayload(
      analysisRequest,
      triggerAnalysisRequestDto
    );
    await this.publisherService.publishAnalysisRequest(payload);
    return new ImageAnalysisRequestDTO(analysisRequest);
  }

  async getAnalysisRequests(getAnalysisRequestDto: GetAnalysisRequestDto) {
    const { imageEventId, protocolIds, developerMode, status } =
      getAnalysisRequestDto;
    const whereClause: FindOptionsWhere<ImageAnalysisRequest> = {};
    if (status) {
      try {
        const statusCode =
          await this.analysisRequestStatusRepository.findOneOrFail({
            where: {
              code: status,
            },
          });
        whereClause.statusCode = { code: statusCode.code };
      } catch (e) {
        throw new BadRequestException(e.message);
      }
    }
    whereClause.imageEvent = { id: imageEventId };
    if (protocolIds?.length > 0) {
      whereClause.protocolId = In(protocolIds);
    }
    whereClause.isDeveloperMode = developerMode;
    const imageAnalysisRequests =
      await this.imageAnalysisRequestRepository.find({
        where: whereClause,
        loadRelationIds: {
          relations: ["imageEvent", "statusCode"],
          disableMixedMap: true,
        },
        order: {
          startedAt: "desc",
        },
      });
    return imageAnalysisRequests.map(
      (imageAnalysisRequest) =>
        new ImageAnalysisRequestDTO(imageAnalysisRequest)
    );
  }
}
