import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { AnalysisRequestStatus } from "src/entities/analysis-request-status.entity";
import { ImageEvent } from "src/entities/image-event.entity";
import { ExternalRunService } from "src/utils/external-run.service";
import {
  EntityNotFoundError,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
} from "typeorm";
import { createFindingObjectRequest } from "../../dto/create-finding-object-request.dto";
import { FindingPaginatedResponse } from "../../dto/finding-paginated.dto";
import { FindingDTO } from "../../dto/finding.dto";
import { GetFindingRequestDTO } from "../../dto/get-finding-request.dto";
import { GetFindingsCountRequestDTO } from "../../dto/get-findings-count-request.dto";
import { ObjectCountByAnalysisRequestDto } from "../../dto/objects-group-by-analysis-dto";
import { PageInfo } from "../../dto/page-info.dto";
import { Finding } from "../../entities/finding.entity";
import { GenerationType } from "../../entities/generation-type.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { UserInfo } from "../../utils/user-info";

@Injectable()
export class FindingService {
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  private readonly MAX_SIZE = 200;

  constructor(
    @InjectRepository(Finding)
    private readonly findingRepository: Repository<Finding>,
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

  async getAll(request: GetFindingRequestDTO) {
    const {
      name,
      imageAnalysisRequestId,
      isActive,
      generationTypeCode,
      originalFindingId,
      page,
      size,
    } = request;

    const limit = Math.min(
      size && size > 0 ? size : this.DEFAULT_SIZE,
      this.MAX_SIZE
    );
    const pageNo = page && page > 0 ? page : this.DEFAULT_PAGE;
    const offset = (pageNo - 1) * limit;
    const whereClause: FindOptionsWhere<Finding> = {};
    whereClause.isActive = isActive;
    if (name) {
      whereClause.name = name;
    }
    if (imageAnalysisRequestId) {
      whereClause.imageAnalysisRequest = { id: imageAnalysisRequestId };
    }
    if (generationTypeCode) {
      whereClause.generationType = { code: generationTypeCode };
    }
    if (originalFindingId) {
      whereClause.originalFinding = { id: originalFindingId };
    }
    const [response, count] = await this.findingRepository.findAndCount({
      where: whereClause,
      skip: offset,
      take: limit,
      loadRelationIds: {
        relations: ["imageAnalysisRequest", "generationType"],
        disableMixedMap: true,
      },
    });
    const findingsList = response.map((finding) => new FindingDTO(finding));
    const pageInfo = new PageInfo();
    pageInfo.page = pageNo;
    pageInfo.size = response.length;
    pageInfo.totalElements = count;
    const paginatedFindingsResponse = new FindingPaginatedResponse();
    paginatedFindingsResponse.content = findingsList;
    paginatedFindingsResponse.pageInfo = pageInfo;
    return paginatedFindingsResponse;
  }

  async getFindingsCountGroupedByAnalysisRequest(
    request: GetFindingsCountRequestDTO
  ) {
    const findingsCountGroupByAnalysisRequest = this.findingRepository
      .createQueryBuilder()
      .select(`count(*) as count,image_analysis_request_id`)
      .where(
        `image_analysis_request_id in ('${request.imageAnalysisRequestIds.join(
          "','"
        )}')`
      )
      .groupBy("image_analysis_request_id");

    const findingObjectsWithAnalysis = this.imageAnalysisRequestRepository
      .createQueryBuilder("iar")
      .innerJoin(
        `(${findingsCountGroupByAnalysisRequest.getQuery()})`,
        "finding",
        "finding.image_analysis_request_id= iar.id"
      )
      .select(
        "finding.count as count,finding.image_analysis_request_id as image_analysis_request_id,iar.name as name"
      );

    const result = await findingObjectsWithAnalysis.getRawMany();

    return result.map((finding) => {
      const findingObjectsGroupByAnalysis =
        new ObjectCountByAnalysisRequestDto();
      findingObjectsGroupByAnalysis.imageAnalysisRequestId =
        finding.image_analysis_request_id;
      findingObjectsGroupByAnalysis.imageAnalysisRequestName = finding.name;
      findingObjectsGroupByAnalysis.count = finding.count;
      return findingObjectsGroupByAnalysis;
    });
  }

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
    analysisRequest.name = "Manual Finding object";
    analysisRequest.statusCode =
      await this.analysisRequestStatusRepository.findOneOrFail({
        where: {
          code: "SUCCESS",
        },
      });
    analysisRequest.startedAt = new Date();
    return await this.imageAnalysisRequestRepository.save(analysisRequest);
  }

  async assignAnalysisRequestToFindObject(
    type: string,
    imageAnalysisRequestId: string,
    imageEventId: string,
    userId: string
  ) {
    if (imageAnalysisRequestId) {
      return await this.imageAnalysisRequestRepository.findOneOrFail({
        where: { id: imageAnalysisRequestId },
      });
    } else {
      let imageEvent = null;
      if (imageEventId) {
        imageEvent = await this.imageEventRepository.findOneOrFail({
          where: { id: imageEventId },
        });
      }
      if (type === "MANUAL" && imageEvent) {
        const manualScanObjectProtocolName = "manual_finding_object";
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
          "imageAnalysisRequestId can't be null, except for MANUAL find objects."
        );
      }
    }
  }

  async createFindingObject(
    request: createFindingObjectRequest,
    userProfile: string
  ) {
    try {
      const finding = new Finding();
      finding.notes = request.notes;
      finding.generationType =
        await this.generationTypeRepository.findOneOrFail({
          where: { code: request.generationType },
        });
      const userId = this.userInfo.getUserId(userProfile);
      finding.imageAnalysisRequest =
        await this.assignAnalysisRequestToFindObject(
          request.generationType,
          request.imageAnalysisRequestId,
          request.imageEventId,
          userId
        );
      if (request.name && request.name.trim() !== "") {
        finding.name = request.name;
      } else {
        const [, count] = await this.findingRepository.findAndCount({
          where: {
            imageAnalysisRequest: {
              id: finding.imageAnalysisRequest.id,
            },
          },
        });
        finding.name = `${count + 1}`;
      }
      finding.createdAt = new Date();
      finding.createdBy = userId;
      finding.modifiedAt = new Date();
      finding.modifiedBy = userId;
      finding.outline = request.outline;
      finding.id = randomUUID();
      const response = await this.findingRepository.insert(finding);
      const savedFindingObject = await this.findingRepository.findOneOrFail({
        where: { id: response.raw?.[0]?.id },
        loadRelationIds: {
          relations: ["imageAnalysisRequest", "generationType"],
          disableMixedMap: true,
        },
      });
      return new FindingDTO(savedFindingObject);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new ConflictException(e.message);
      } else {
        throw new BadRequestException(e.message);
      }
    }
  }
}
