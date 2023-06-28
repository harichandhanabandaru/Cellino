import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateImageTimeseriesRequest } from "../../dto/create-image-timeseries.dto";
import { ImageTimeseriesDTO } from "../../dto/image-timeseries.dto";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { ImageTimeseries } from "../../entities/image-timeseries.entity";
import { Repository, FindOptionsWhere } from "typeorm";
import { ImageEventService } from "../../image-event/image-event-service/image-event-service";
import { randomUUID } from "crypto";
import { UserInfo } from "../../utils/user-info";
import { ImageMeasurementsDTO } from "../../dto/image-measurements.dto";
import { GetImageTimeseriesRequestV2DTO } from "../../dto/get-image-timeseries-request-v2.dto";
import { ImageTimeseriesPaginatedResponse } from "../../dto/image-timeseries-paginated-response.dto";
import { PageInfo } from "../../dto/page-info.dto";

@Injectable()
export class ImageTimeseriesService {
  static BAD_REQUEST_EXCEPTION_MESSAGE = "`id` is not UUID";
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  private readonly MAX_SIZE = 200;
  constructor(
    @InjectRepository(ImageTimeseries)
    private readonly imageTimeseriesRepository: Repository<ImageTimeseries>,
    @InjectRepository(ImageAnalysisRequest)
    private readonly imageAnalysisRepository: Repository<ImageAnalysisRequest>,
    @InjectRepository(ImageEvent)
    private readonly imageEventRepository: Repository<ImageEvent>,
    private readonly imageEventService: ImageEventService,
    private readonly userInfo: UserInfo
  ) {}

  async saveImageTimeseries(
    imageTimeseriesRequest: CreateImageTimeseriesRequest,
    userProfile: string
  ): Promise<ImageTimeseriesDTO> {
    const imageTimeseries = new ImageTimeseries();
    const imageAnalysisRequest = await this.imageAnalysisRepository.findOne({
      where: { id: imageTimeseriesRequest.imageAnalysisRequestId },
    });
    if (imageAnalysisRequest) {
      imageTimeseries.imageAnalysisRequest = imageAnalysisRequest;
    } else {
      throw new NotFoundException(
        `The provided image analysis request id ${imageTimeseriesRequest.imageAnalysisRequestId} is not found`
      );
    }
    const imageEvent = await this.imageEventRepository.findOne({
      where: { id: imageTimeseriesRequest.imageEventId },
    });
    if (imageEvent) {
      imageTimeseries.imageEvent = imageEvent;
    } else {
      throw new NotFoundException(
        `The provided image event id ${imageTimeseriesRequest.imageEventId} is not found`
      );
    }
    imageTimeseries.well = await this.imageEventService.getWellEntity(
      imageTimeseriesRequest.plate,
      imageTimeseriesRequest.well
    );
    imageTimeseries.imageMetadata = imageTimeseriesRequest.measurements;
    const userId = this.userInfo.getUserId(userProfile);
    imageTimeseries.createdBy = userId;
    imageTimeseries.modifiedBy = userId;
    imageTimeseries.modifiedAt = new Date();
    imageTimeseries.createdAt = new Date();
    imageTimeseries.id = randomUUID();
    const savedImageTimeseries = await this.imageTimeseriesRepository.save(
      imageTimeseries
    );
    return new ImageTimeseriesDTO(savedImageTimeseries);
  }

  async getImageTimeseries({
    wellId,
    developerMode,
  }: {
    wellId: string;
    developerMode: boolean;
  }): Promise<ImageMeasurementsDTO[]> {
    return await this.imageTimeseriesRepository.query(
      'Select image_event.event_id as "eventId", ' +
        'image_event.id as "imageEventId", ' +
        'image_timeseries.measurements as "measurements", ' +
        'image_event.derived_artifacts as "derivedArtifacts", ' +
        'image_event.created_at as "createdAt", ' +
        'image_event.started_at as "startedAt" ' +
        "from image_timeseries image_timeseries " +
        "inner join image_analysis_request analysis_request on " +
        "analysis_request.id = image_timeseries.image_analysis_request_id " +
        "and analysis_request.is_developer_mode = $1 " +
        "and image_timeseries.well_id = $2 " +
        "right join image_event image_event on " +
        "image_event.id = image_timeseries.image_event_id " +
        "where image_event.well_id = $2 " +
        "order by image_event.created_at",
      [developerMode, wellId]
    );
  }

  async getImageTimeseriesV2(request: GetImageTimeseriesRequestV2DTO) {
    const { imageEventId, wellId, imageAnalysisRequestId, isDeveloperMode } =
      request;
    const limit = Math.min(
      request.size && request.size > 0 ? request.size : this.DEFAULT_SIZE,
      this.MAX_SIZE
    );
    const page =
      request.page && request.page > 0 ? request.page : this.DEFAULT_PAGE;
    const offset = (page - 1) * limit;

    const whereClause: FindOptionsWhere<ImageTimeseries> = {};
    const imageAnalysisRequestWhereClause: FindOptionsWhere<ImageAnalysisRequest> =
      {};

    if (imageEventId) {
      whereClause.imageEvent = { id: imageEventId };
    }
    if (wellId) {
      whereClause.well = { id: wellId };
    }
    if (imageAnalysisRequestId) {
      imageAnalysisRequestWhereClause.id = imageAnalysisRequestId;
    }
    imageAnalysisRequestWhereClause.isDeveloperMode = isDeveloperMode;
    whereClause.imageAnalysisRequest = imageAnalysisRequestWhereClause;

    const [imageTimeseries, count] =
      await this.imageTimeseriesRepository.findAndCount({
        where: whereClause,
        order: { createdAt: "ASC" },
        loadRelationIds: {
          relations: ["imageEvent", "imageAnalysisRequest", "well"],
          disableMixedMap: true,
        },
        skip: offset,
        take: limit,
      });
    const response = new ImageTimeseriesPaginatedResponse();
    response.content = imageTimeseries.map((it) => new ImageTimeseriesDTO(it));
    const pageInfo = new PageInfo();
    pageInfo.page = page;
    pageInfo.size = imageTimeseries.length;
    pageInfo.totalElements = count;
    response.pageInfo = pageInfo;
    return response;
  }
}
