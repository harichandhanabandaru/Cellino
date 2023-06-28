import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { applyPatch, Operation } from "fast-json-patch";
import { ImageEvent } from "../../entities/image-event.entity";
import { Well } from "../../entities/well.entity";
import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { WellDTO } from "../../dto/well.dto";
import { CreateWellResponseDTO } from "../../dto/create-well-response.dto";
import { ProcessStatus } from "../../enums/process-status";
import { HttpService } from "@nestjs/axios";
import { getEnumIndex } from "../../utils/get-enum-index";
import { WellStatus } from "../../enums/well-status";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { LastestArtifactDTO } from "../../dto/latest-artifact.dto";
import { CreateWellRequestDTO } from "../../dto/create-well-request.dto";
import { UserInfo } from "../../utils/user-info";
import { randomUUID } from "crypto";
import { WellReviewer } from "../../entities/well-reviewer.entity";
import { GetWellsV2Dto } from "../../dto/get-wells-v2.dto";
import { WellResponseDto } from "../../dto/well-response.dto";

@Injectable()
export class WellService {
  static PLATE_URL: string = `${process.env.RUN_MGMT_SVC}/v1/plates`;
  static RUN_METRIC_URL: string = `${process.env.RUN_MGMT_SVC}/v1/run-metrics`;
  private readonly logger = new Logger(WellService.name);

  constructor(
    @InjectRepository(ImageEvent)
    private readonly imageEventRepository: Repository<ImageEvent>,
    @InjectRepository(Well)
    private readonly wellRepository: Repository<Well>,
    private readonly httpSerivce: HttpService,
    private readonly userInfo: UserInfo,
    private readonly datasource: DataSource
  ) {}

  // GetWellById
  async getById(wellId: string): Promise<Well> {
    if (!isUUID(wellId)) {
      this.logger.error(`wellId ${wellId} should be UUID`);
      throw new BadRequestException("wellId should be UUID");
    }

    let result = await this.wellRepository.findOne({
      where: {
        id: wellId,
      },
      relations: {
        reviewers: true,
      },
    });

    if (!result) {
      throw new NotFoundException("Did not find Well with the given id");
    }
    return result;
  }

  // UpdateWell
  async update(id: string, patchOps: Operation[], userId: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("id should be UUID");
    }

    const oldData = await this.wellRepository.findOne({ where: { id: id } });
    if (!oldData) {
      throw new NotFoundException("Did not find Well with the given id");
    }

    // Updating enums to index
    patchOps.forEach((operation) => {
      if (operation.path === "/status")
        operation["value"] = getEnumIndex(operation["value"], WellStatus);
      else if (operation.path === "/processStatus")
        operation["value"] = getEnumIndex(operation["value"], ProcessStatus);
    });

    const patchedData = applyPatch({ ...oldData }, patchOps).newDocument;
    patchedData.modifiedAt = new Date();
    patchedData.modifiedBy = userId;

    // const updatedData = patchedData;
    const updatedData = await this.wellRepository.save(patchedData);

    // If process status is updated, make an patch axios call to run service on run-metric api to update the activeWells value
    if (patchOps.filter((op) => op.path === "/processStatus").length > 0) {
      try {
        // Fetch Plate data to get Run ID
        const { data: plateData } = await this.httpSerivce.axiosRef.get(
          WellService.PLATE_URL + `/${updatedData.plateId}`
        );
        const runId = plateData?.runId;

        // Fetch run-metric using the Run ID
        const { data: runMetricData } = await this.httpSerivce.axiosRef.get(
          WellService.RUN_METRIC_URL + `?runIds=${runId}`
        );
        let activeWellsCount: number = runMetricData[0]?.activeWellsCount;

        const OLD_DATA_RETIRED = [
          ProcessStatus.DROPPED,
          ProcessStatus.RETIRED,
        ].includes(oldData.processStatus);
        const NEW_DATA_RETIRED = [
          ProcessStatus.DROPPED,
          ProcessStatus.RETIRED,
        ].includes(updatedData.processStatus);

        // Check if the oldData and newData
        // XOR Operation to check if this axios call is necessary to make.
        if ((Number(OLD_DATA_RETIRED) ^ Number(NEW_DATA_RETIRED)) === 1) {
          // If OTHER Process Status -> DROPPED or RETIRED, decrease activeWellCounts--
          if (OLD_DATA_RETIRED && !NEW_DATA_RETIRED) {
            activeWellsCount++;
          }

          // Else DROPPED or RETIRED -> OTHER Process Status, increase activeWellCounts++
          else if (!OLD_DATA_RETIRED && NEW_DATA_RETIRED) {
            activeWellsCount--;
          }

          // Do Patch request
          const updateWellPatchOps: [Operation] = [
            {
              op: "replace",
              path: "/activeWellsCount",
              value: activeWellsCount,
            },
          ];

          await this.httpSerivce.axiosRef.patch(
            WellService.RUN_METRIC_URL + `/${runId}`,
            updateWellPatchOps
          );
        }
      } catch (err) {
        this.logger.error("Something unexpected happened");
        throw new InternalServerErrorException("Something unexpected happened");
      }
    }

    return this.wellRepository.findOne({
      where: { id: updatedData.id },
      relations: { reviewers: true },
    });
  }

  // GetImageDetailsByWellId
  getImageDetailsByWellId(wellId: string): Promise<LastestArtifactDTO> {
    const imageEventQuery = this.imageEventRepository
      .createQueryBuilder("ie")
      .innerJoin(
        ImageAnalysisRequest,
        "iar",
        `iar.image_event_id = ie.id and iar.status_code='SUCCESS' and ie.well_id='${wellId}'`
      )
      .select([
        `ie.artifact_path as "artifactPath"`,
        `ie.created_at as "createdAt"`,
        `ie.review_status as "reviewStatus"`,
        `ie.analysis_status as "analysisStatus"`,
        `ie.analysis_status_detail as "analysisStatusDetail"`,
      ])
      .orderBy("ie.created_at", "DESC")
      .limit(1);
    return imageEventQuery.getRawOne();
  }

  async getAllWells(plateId: string, activeWells?: boolean) {
    // query to get image events which has analysis request
    const getImageEventsWhichHasAnalysisRequest = this.imageEventRepository
      .createQueryBuilder("ie")
      .innerJoin(
        ImageAnalysisRequest,
        "iar",
        `iar.image_event_id = ie.id and iar.status_code='SUCCESS'`
      )
      .select([
        `ie.id,ie.well_id,ie.created_at,ie.review_status,
         ie.analysis_status,ie.analysis_status_detail,
         CASE when (iar.id is not null) then ie.artifact_path else null end as "artifact_path"`,
      ])
      .distinct();

    //given plateId, partition by well id and order by image_event created_at to get latest image event details
    const getWellsWithRank = this.wellRepository
      .createQueryBuilder("w")
      .leftJoin(
        `(${getImageEventsWhichHasAnalysisRequest.getQuery()})`,
        "iar_ie",
        `iar_ie.well_id = w.id where w.plate_id ='${plateId}'`
      )
      .select([
        `w.id,iar_ie.id as "imageEventId",w.name,
        w.position,w.process_status as "processStatus", w.process_status_detail as "processStatusDetail",
        w.process_metadata as "processMetadata",
        w.plate_id as "plateId",w.well_status as "status",w.well_status_reason as "statusReason",
        iar_ie.review_status as "reviewStatus",iar_ie.analysis_status as "analysisStatus",
        iar_ie.analysis_status_detail as "analysisStatusDetail",
        iar_ie.artifact_path as "artifactPath",
        Rank() over(Partition by w.id order by iar_ie.created_at desc) as rank`,
      ]);

    const outerWellQuerytoGetLatestArtifafctPath = this.datasource
      .createQueryBuilder()
      .addFrom(`(${getWellsWithRank.getQuery()})`, "wells")
      .leftJoin(WellReviewer, "wr", `wr.well_id = wells.id`)
      .select("wells.*")
      .addSelect('array_agg(distinct user_id) as "reviewers"')
      .groupBy(
        `wells.id, wells."imageEventId", wells.position, wells."processStatus", wells."processStatusDetail"`
      )
      .addGroupBy(
        `wells."processMetadata",wells."plateId", wells.status,wells."statusReason",wells."reviewStatus"`
      )
      .addGroupBy(
        `wells."analysisStatus",wells."analysisStatusDetail",wells."artifactPath", wells.rank, wells.name`
      )
      .where(`wells.rank=1`);

    //any well having an imaging event and it's processStatus is not retired or dropped
    if (activeWells) {
      outerWellQuerytoGetLatestArtifafctPath.andWhere(
        `wells."imageEventId" is not null and wells."processStatus" not in (4,5)`
      );
    }
    const response = await outerWellQuerytoGetLatestArtifafctPath.getRawMany();
    if (response.length === 0 && activeWells) {
      throw new NotFoundException(
        `There are no active wells for the given plateId`
      );
    }
    return response.map(
      (well) =>
        new WellDTO(
          {
            ...well,
            reviewers: well.reviewers
              ? well.reviewers.map((ele) => {
                  return { userId: ele }; // to use existing well dto logic
                })
              : [],
          },
          well
        )
    );
  }

  async buildWellWithTimeSeriesAndImageEventData(well: Well): Promise<WellDTO> {
    const imageEventData: LastestArtifactDTO =
      await this.getImageDetailsByWellId(well.id);
    return new WellDTO(well, imageEventData);
  }

  async addWell(wellRequest: CreateWellRequestDTO, userProfile: string) {
    const well = new Well();
    let plateId = null;
    let plateName = null;
    well.status = WellStatus.KEEP;
    if (wellRequest.plate?.id) {
      const response = await (
        await fetch(`${WellService.PLATE_URL}/${wellRequest.plate.id}`)
      ).json();
      plateId = response?.id;
      plateName = response?.name;
    }
    if (!plateId && wellRequest.plate?.barcode) {
      try {
        const response = await (
          await fetch(
            `${WellService.PLATE_URL}?barcode=${wellRequest.plate.barcode}`
          )
        ).json();
        plateId = response?.content[0]?.id;
        plateName = response?.content[0]?.name;
      } catch (e) {
        this.logger.error(
          `Error while processing the provided barcode ${wellRequest.plate.barcode}. Exception : ${e.message}`
        );
        throw new InternalServerErrorException(
          `Error while processing the provided barcode ${wellRequest.plate.barcode}`
        );
      }
    }
    if (!plateId) {
      throw new BadRequestException(
        `The provided plate information ${JSON.stringify(
          wellRequest.plate,
          null,
          2
        )} is invalid`
      );
    }
    well.plateId = plateId;
    well.position = wellRequest.position;
    well.name = wellRequest?.name
      ? wellRequest.name
      : `${plateName}:${wellRequest.position}`;

    //get user id from userProfile
    const userId = this.userInfo.getUserId(userProfile);
    well.createdBy = userId;
    well.modifiedBy = userId;
    well.createdAt = new Date();
    well.modifiedAt = new Date();
    well.id = randomUUID();
    try {
      const savedWell = await this.wellRepository.save(well);
      return new CreateWellResponseDTO(savedWell);
    } catch (e) {
      this.logger.error(`error while processing the request : ${e}`);
      throw new UnprocessableEntityException(
        `Error while saving the Request : ${JSON.stringify(
          wellRequest,
          null,
          2
        )}`,
        `${e}`
      );
    }
  }

  async getAllWellsV2(getWellsV2Dto: GetWellsV2Dto) {
    const { plateId, status, wellPosition } = getWellsV2Dto;
    const whereClause: FindOptionsWhere<Well> = {};
    if (!(plateId || wellPosition)) {
      throw new BadRequestException(`plateId or wellPosition is required`);
    }
    if (plateId) {
      whereClause.plateId = plateId;
    }
    if (wellPosition) {
      whereClause.position = wellPosition;
    }
    if (status) {
      whereClause.status = WellStatus[status];
    }
    const wells = await this.wellRepository.find({ where: whereClause });
    return wells.map((well) => new WellResponseDto(well));
  }
}
