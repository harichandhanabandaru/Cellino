import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EntityNotFoundError, FindOptionsWhere, Repository} from "typeorm";
import {ScanObject} from "../../entities/scan-object.entity";
import {GetScanObjectsRequestDto} from "../../dto/get-scan-objects-request.dto";
import {ScanObjectDto} from "../../dto/scan-object.dto";
import {ScanObjectPaginatedDTO} from "../../dto/scan-object-paginated.dto";
import {PageInfo} from "../../dto/page-info.dto";
import {ImageAnalysisRequest} from "../../entities/image-analysis-request.entity";
import {AnalysisRequestStatus} from "../../entities/analysis-request-status.entity";
import {GenerationType} from "../../entities/generation-type.entity";
import {ImageEvent} from "../../entities/image-event.entity";
import {UserInfo} from "../../utils/user-info";
import {ExternalRunService} from "../../utils/external-run.service";
import {randomUUID} from "crypto";
import {CreateScanObjectRequest} from "../../dto/create-scan-object-request.dto";
import {applyPatch, Operation} from "fast-json-patch";
import {ObjectCountByAnalysisRequestDto} from "../../dto/objects-group-by-analysis-dto";
import { StatusMessage } from "../../dto/status-message-dto";

@Injectable()
export class ScanObjectService {
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  private readonly MAX_SIZE = 200;
  constructor(
    @InjectRepository(ScanObject)
    private readonly scanObjectRepository: Repository<ScanObject>,
    @InjectRepository(ImageAnalysisRequest)
    private readonly imageAnalysisRequestRepository: Repository<ImageAnalysisRequest>,
    @InjectRepository(AnalysisRequestStatus)
    private readonly analysisRequestStatusRepository: Repository<AnalysisRequestStatus>,
    @InjectRepository(GenerationType)
    private readonly generationTypeRepository: Repository<GenerationType>,
    @InjectRepository(ImageEvent)
    private readonly imageEventRepository: Repository<ImageEvent>,
    private readonly userInfo: UserInfo,
    private readonly externalRunService: ExternalRunService
  ) {}

  async getScanObjects(request: GetScanObjectsRequestDto) {
    const limit = Math.min(
      request.size && request.size > 0 ? request.size : this.DEFAULT_SIZE,
      this.MAX_SIZE
    );
    const page =
      request.page && request.page > 0 ? request.page : this.DEFAULT_PAGE;
    const offset = (page - 1) * limit;

    const whereClause: FindOptionsWhere<ScanObject> = {};
    whereClause.isActive = true;

    if (request.imageAnalysisRequestId) {
      whereClause.imageAnalysisRequest = { id: request.imageAnalysisRequestId };
    }

    if (request.imageEventId) {
      whereClause.imageEvent = { id: request.imageEventId };
    }

    //loadRelationIds loads only the ids of relations and disableMixedMap returns it as an object of id instead of sending relationId as relation
    const [scanObjects, count] = await this.scanObjectRepository.findAndCount({
      where: whereClause,
      loadRelationIds: {
        relations: ["imageEvent", "imageAnalysisRequest", "generationType"],
        disableMixedMap: true,
      },
      order: { name: "asc" },
      skip: offset,
      take: limit,
    });
    const scanObjectsPaginatedResponse = new ScanObjectPaginatedDTO();
    const pageInfo = new PageInfo();
    scanObjectsPaginatedResponse.content = scanObjects.map(
      (scanObject) => new ScanObjectDto(scanObject)
    );
    pageInfo.page = page;
    pageInfo.size = scanObjects?.length;
    pageInfo.totalElements = count;
    scanObjectsPaginatedResponse.pageInfo = pageInfo;
    return scanObjectsPaginatedResponse;
  }

  //todo: can we do it in a better way?
  async createManualAnalysisRequest(
    imageEvent: ImageEvent,
    protocolId: string,
    userId: string
  ) {
    const analysisRequest = new ImageAnalysisRequest();
    analysisRequest.id = randomUUID();
    analysisRequest.protocolId = protocolId;
    analysisRequest.imageEvent = imageEvent;
    analysisRequest.createdBy = userId;
    analysisRequest.modifiedBy = userId;
    analysisRequest.modifiedAt = new Date();
    analysisRequest.createdAt = new Date();
    analysisRequest.isDeveloperMode = false;
    // what should be the name of analysis?
    analysisRequest.name = "Manual scan object";
    analysisRequest.statusCode =
      await this.analysisRequestStatusRepository.findOneOrFail({
        where: {
          code: "SUCCESS",
        },
      });
    analysisRequest.startedAt = new Date();
    return await this.imageAnalysisRequestRepository.save(analysisRequest);
  }

  async assignAnalysisRequestToScanObject(
    type: string,
    imageAnalysisRequestId: string,
    imageEvent: ImageEvent,
    userId: string
  ) {
    if (imageAnalysisRequestId) {
      return await this.imageAnalysisRequestRepository.findOneOrFail({
        where: { id: imageAnalysisRequestId },
      });
    } else {
      if (type === "MANUAL") {
        const manualScanObjectProtocolName = "manual_scan_object";
        const protocol = await this.externalRunService.fetchProtocolByName(
          manualScanObjectProtocolName
        );
        let imageAnalysisRequest =
          await this.imageAnalysisRequestRepository.findOne({
            where: {
              imageEvent: {
                id: imageEvent.id,
              },
              protocolId: protocol.id,
            },
          });
        if (!imageAnalysisRequest) {
          imageAnalysisRequest = await this.createManualAnalysisRequest(
            imageEvent,
            protocol.id,
            userId
          );
        }
        return imageAnalysisRequest;
      } else {
        throw new Error(
          "imageAnalysisRequestId can't be null, except MANUAL scan objects."
        );
      }
    }
  }

  async createScanObject(
    request: CreateScanObjectRequest,
    userProfile: string
  ) {
    const scanObject = new ScanObject();
    try {
      scanObject.attributes = request.attributes;
      scanObject.imageEvent = await this.imageEventRepository.findOneOrFail({
        where: { id: request.imageEventId },
      });
      scanObject.generationType =
        await this.generationTypeRepository.findOneOrFail({
          where: { code: request.type },
        });
      const userId = this.userInfo.getUserId(userProfile);
      scanObject.imageAnalysisRequest = await this.assignAnalysisRequestToScanObject(
        request.type,
        request.imageAnalysisRequestId,
        scanObject.imageEvent,
        userId
      );

      //if name is sent in request store it
      //else get the total count of scan objects for a given analysis request and increment it by 1 and use it for name
      if (request.name && request.name.trim() !== "") {
        scanObject.name = request.name;
      } else {
        const [, count] = await this.scanObjectRepository.findAndCount({
          where: {
            imageAnalysisRequest: {
              id: scanObject.imageAnalysisRequest.id,
            },
          },
        });
        scanObject.name = `${count + 1}`;
      }
      scanObject.createdAt = new Date();
      scanObject.modifiedAt = new Date();
      scanObject.createdBy = userId;
      scanObject.modifiedBy = userId;
      scanObject.outline = request.outline;
      scanObject.id = randomUUID();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    try {
      const entity = await this.scanObjectRepository.insert(scanObject);
      const savedScanObject = await this.scanObjectRepository.findOneOrFail({
        where: { id: entity.raw?.[0]?.id },
        loadRelationIds: {
          relations: ["imageEvent", "imageAnalysisRequest", "generationType"],
          disableMixedMap: true,
        },
      });
      return new ScanObjectDto(savedScanObject);
    } catch (e) {
      throw new ConflictException(JSON.stringify(e, null, 2));
    }
  }

  createCopy(scanObject: ScanObject, userId: string) {
    const clone = { ...scanObject };
    clone.id = randomUUID();
    clone.name = `${scanObject.name}-copy`;
    clone.originalObject = scanObject;
    clone.isActive = false;
    clone.createdBy = userId;
    clone.modifiedBy = userId;
    clone.createdAt = new Date();
    clone.modifiedAt = new Date();
    return clone as ScanObject;
  }

  async applyPatchOperation(
    scanObject: ScanObject,
    patchOperations: Operation[],
    edited: GenerationType,
    userId: string
  ) {
    const patchedObject = applyPatch(scanObject, patchOperations).newDocument;
    patchedObject.modifiedAt = new Date();
    patchedObject.generationType = edited;
    patchedObject.modifiedBy = userId;
    return await this.scanObjectRepository.save(patchedObject);
  }

  async updateScanObject(
    id: string,
    data: Array<Operation>,
    userProfile: string
  ) {
    if (
      data.some(
        (d) => d.path.includes("generationType") || d.path === "/isActive"
      )
    ) {
      throw new BadRequestException(
        `Cannot update generation type or isActive using patch API`
      );
    }
    try {
      let userId = this.userInfo.getUserId(userProfile);
      const scanObject = await this.scanObjectRepository.findOneOrFail({
        where: { id: id, isActive: true },
        relations: {
          imageAnalysisRequest: true,
          generationType: true,
          imageEvent: true,
        },
      });
      const edited = await this.generationTypeRepository.findOne({
        where: { code: "EDITED" },
      });
      let patchedScanObject: ScanObject;

      //Allow the patch operation only on manual or edited scan objects
      if (scanObject.generationType.code === "SYSTEMGENERATED") {
        const clone = this.createCopy(scanObject, userId);
        patchedScanObject = await this.applyPatchOperation(
          scanObject,
          data,
          edited,
          userId
        );
        await this.scanObjectRepository.save(clone);
      } else {
        patchedScanObject = await this.applyPatchOperation(
          scanObject,
          data,
          edited,
          userId
        );
      }
      return new ScanObjectDto(patchedScanObject);
    } catch (e) {
      if (e instanceof EntityNotFoundError)
        throw new NotFoundException(`The provided id ${id} is not found`);
      else {
        throw new UnprocessableEntityException(
          `Failed to process the request : ${e?.message || JSON.stringify(e)}`
        );
      }
    }
  }
  async getScanObjectsGroupedByImageAnalysis(imageEventId: string) {
    const scanObjectsCountGroupByAnalysisRequest =
      await this.scanObjectRepository
        .createQueryBuilder()
        .select(`count(*) as count,image_analysis_request_id`)
        .where(`image_event_id = '${imageEventId}' and is_active=true`)
        .groupBy("image_analysis_request_id");

    const scanObjectsByImageEventId = this.imageAnalysisRequestRepository
      .createQueryBuilder("iar")
      .innerJoin(
        `(${scanObjectsCountGroupByAnalysisRequest.getQuery()})`,
        "sc",
        "sc.image_analysis_request_id= iar.id"
      )
      .select(
        "sc.count as count,sc.image_analysis_request_id as image_analysis_request_id,iar.name as name"
      );

    const result = await scanObjectsByImageEventId.getRawMany();

    return result.map((sc) => {
      const scanObjectsGroupByAnalysis = new ObjectCountByAnalysisRequestDto();
      scanObjectsGroupByAnalysis.imageAnalysisRequestId =
        sc.image_analysis_request_id;
      scanObjectsGroupByAnalysis.imageAnalysisRequestName = sc.name;
      scanObjectsGroupByAnalysis.count = sc.count;
      return scanObjectsGroupByAnalysis;
    });
  }
  async deleteById(id: string, userProfile: string): Promise<StatusMessage> {
    try {
      const scanObject = await this.scanObjectRepository.findOneOrFail({
        where: { id: id }
      });
      const userId = this.userInfo.getUserId(userProfile);
      scanObject.isActive = false;  
      scanObject.modifiedAt = new Date();
      scanObject.modifiedBy = userId;
      this.scanObjectRepository.save(scanObject);
      return new StatusMessage("Success", "Removed record"); 
    } catch (e) {
      if (e instanceof EntityNotFoundError)
        throw new NotFoundException(`The provided id ${id} is not found`);
      else {
        throw new UnprocessableEntityException(
          `Failed to process the request : ${e?.message || JSON.stringify(e)}`
        );
      }
    }
  }
}
