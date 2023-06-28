import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { isUUID } from "class-validator";
import { Plate } from "../../entities/plate.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PlateStatus } from "../../enums/PlateStatus";
import { PlateContentDTO } from "../../dto/plate-content.dto";
import { PlateDTO } from "../../dto/plate.dto";
import { PageInfo } from "../../dto/page-info.dto";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { ProcessStatus } from "../../enums/ProcessStatus";
import { AnalysisStatus } from "../../enums/AnalysisStatus";
import { ReviewStatus } from "../../enums/ReviewStatus";
import { PlateReviewer } from "../../entities/plate-reviewer.entity";
import { Pagination } from "../../utils/pagination";
import { PlateDetailsDTO } from "../../dto/plate-details.dto";
import { Phase } from "../../entities/phase.entity";
import { Run } from "../../entities/run.entity";
import { CreatePlateRequestDTO } from "../../dto/plate-request.dto";
import { Labware } from "../../entities/labware.entity";
import { UserInfo } from "../../utils/UserInfo";
import { UserDTO } from "../../dto/User.dto";
import { Event } from "../../entities/event.entity";
import { getEnumIndex } from "../../utils/getEnumIndex";

@Injectable()
export class PlateService {
  static DEFAULT_SIZE: number = 20;
  static DEFAULT_PAGE: number = 0;

  static PROCESSSTATUS: string = "processStatus";
  static PROCESSSTATUSDETAIL: string = "processStatusDetail";
  static REVIEWSTATUS: string = "reviewStatus";
  static ANALYSISSTATUS: string = "analysisStatus";
  static ANALYSISSTATUSDETAIL: string = "analysisStatusDetail";

  constructor(
    @InjectRepository(Plate)
    private readonly plateRepository: Repository<Plate>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Run)
    private readonly runRepository: Repository<Run>,

    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,

    @InjectRepository(Labware)
    private readonly labwareRepository: Repository<Labware>,

    private readonly userInfo: UserInfo
  ) {}

  async updateByPatch(
    id: string,
    patchData: [Operation],
    userProfile: string
  ): Promise<PlateContentDTO> {
    /**
     * NOTE:
     *
     * Currently, the only fields allowed to update are mentioned below:-
     *
     * - name: string
     * - barCode: string
     * - plateStatus: number (enum)
     * - plateStatusReason: string
     * - processMetadata: jsonb
     *
     * Previously, there but not working anymore are (as these columns are now shifted to `PlateEvent` entity/resource):-
     *
     * - analysisStatus: number (enum)
     * - analysisStatusDetail: string
     * - processStatus: number (enum)
     * - processStatusDetail: string
     * - reviewStatus: number (enum)
     */

    // Check if the id is UUID
    if (!isUUID(id)) {
      throw new BadRequestException(`Plate Id ${id} should be UUID`);
    }

    // Check if there is a record existing already
    let plate = await this.plateRepository.findOne({
      where: { id: id },
      relations: { labware: true, phase: true, run: true, reviewers: true },
    });

    if (!plate) {
      throw new NotFoundException(`The provided Plate Id ${id} is not found`);
    }
    let plateDetails;
    let userId = this.userInfo.getUserId(userProfile);
    let plateEventDetailsModified = false;
    patchData.map((op) => {
      if (
        op.path === "/processStatus" ||
        op.path === "/processStatusDetail" ||
        op.path === "/reviewStatus" ||
        op.path === "/analysisStatus" ||
        op.path === "/analysisStatusDetail"
      ) {
        plateEventDetailsModified = true;
      }
    });
    if (plateEventDetailsModified) {
      let eventId = await this.plateRepository
        .query(`select e.id from plate p left join event e on e.plate_id = p.id 
        where p.id ='${id}' ORDER BY e.started_at DESC limit 1`);

      let event = await this.eventRepository.findOne({
        where: { id: eventId[0].id },
      });

      //consistent with changing enum values in other patch requests
      patchData.forEach((operation) => {
        if (operation.path === "/reviewStatus")
          operation["value"] = getEnumIndex(operation["value"], ReviewStatus);
        if (operation.path === "/processStatus")
          operation["value"] = getEnumIndex(operation["value"], ProcessStatus);
        if (operation.path === "/analysisStatus")
          operation["value"] = getEnumIndex(operation["value"], AnalysisStatus);
        if (operation.path === "/plateStatus")
          operation["value"] = getEnumIndex(operation["value"], PlateStatus);
      });

      let result = applyPatch(event, deepClone(patchData));
      let patchedObject = result.newDocument;
      patchedObject.modifiedAt = new Date();
      patchedObject.modifiedBy = userId;
      await this.eventRepository.save(patchedObject);
    }
    let result = applyPatch(plate, deepClone(patchData));
    let patchedObject = result.newDocument;
    patchedObject.modifiedAt = new Date();
    patchedObject.modifiedBy = userId;
    await this.plateRepository.save(patchedObject);

    // Update the record

    plateDetails = await this.getPlateById(id);

    // Return DTO
    return Promise.resolve(plateDetails);
  }

  async getPlateById(id: string): Promise<PlateContentDTO> {
    let response;
    if (isUUID(id, "all")) {
      response = await this.plateRepository.query(
        `select p.id as plate_id,p.name,p.barcode,p.status,p.status_reason,p.process_metadata,p.labware_id,p.phase_id,p.run_id,
         e.process_status,e.process_status_detail,e.review_status,e.analysis_status,e.analysis_status_detail,
         (select array_agg(distinct user_id) from plate_reviewer where plate_id = p.id ) as reviewers from plate p 
         left join event e on e.plate_id = p.id where p.id ='${id}' ORDER BY e.started_at DESC limit 1;`
      );
    } else {
      throw new BadRequestException(`Plate Id ${id} should be UUID`);
    }
    if (response) return await this.mapPlateDetails(response[0]);
    else
      throw new NotFoundException(`The provided Plate Id ${id} is not found`);
  }

  async getPlates(
    runIds?: string[],
    reviewerIds?: string[],
    currentPhaseId?: string,
    name?: string[],
    passagenumbers?: string[],
    barcode?: string,
    pagination: Pagination = {
      page: PlateService.DEFAULT_PAGE,
      size: PlateService.DEFAULT_SIZE,
    }
  ) {
    const {
      page = PlateService.DEFAULT_PAGE,
      size = PlateService.DEFAULT_SIZE,
    } = pagination;

    const limit = size ? size : 20;
    const pageId = page ? page : 1;
    const offset = page && size ? (page - 1) * size : 0;

    // Inner Query to calculate the rank of each record.
    const rankQuery = this.plateRepository
      .createQueryBuilder("inner_plate")
      .leftJoinAndSelect(Event, "e", "inner_plate.id = e.plate_id")
      .select([
        "inner_plate.id as plate_id",
        "inner_plate.name as name",
        "inner_plate.barcode as barcode",
        "inner_plate.status as status",
        "inner_plate.status_reason as status_reason",
        "inner_plate.process_metadata as process_metadata",
        "inner_plate.process_metadata->>'passage_number' as passage_number",
        "inner_plate.labware_id as labware_id",
        "inner_plate.phase_id as phase_id",
        "inner_plate.run_id as run_id",
        "e.process_status as process_status",
        "e.process_status_detail as process_status_detail",
        "e.review_status as review_status",
        "e.analysis_status as analysis_status",
        "e.analysis_status_detail as analysis_status_detail",
      ])
      .addSelect(
        'rank() over(PARTITION BY e.plate_id ORDER BY e.started_at DESC) as "rank"'
      );
    // Apply filters

    if (runIds && runIds.length > 0) {
      rankQuery.where(`run_id in ('${runIds.join("','")}')`);
    }
    if (passagenumbers) {
      rankQuery.andWhere(
        `process_metadata->>'passage_number' in ('${passagenumbers.join(
          "','"
        )}')`
      );
    }
    if (name) {
      name = name.map((n) => "%" + n + "%");
      rankQuery.andWhere(
        `Lower("inner_plate"."name") similar to Lower('${name.join("|")}')`
      );
    }
    if (currentPhaseId) {
      rankQuery.andWhere(`phase_id = '${currentPhaseId}'`);
    }

    // Outer Query which will select only the top-most rank (i.e., 1) and returns that record for that particular ID.
    const query = this.plateRepository
      .createQueryBuilder()
      .innerJoin(
        "(" + rankQuery.getQuery() + ")",
        "rank_filter",
        "rank_filter.plate_id = Plate.id"
      )
      .leftJoin(PlateReviewer, "pr", "Plate.id = pr.plate_id")
      .select("rank_filter")
      .addSelect('array_agg(distinct user_id) as "reviewers"')
      .groupBy("rank_filter.plate_id")
      .addGroupBy("rank_filter.rank")
      .addGroupBy("rank_filter.name")
      .addGroupBy("rank_filter.barcode")
      .addGroupBy("rank_filter.status")
      .addGroupBy("rank_filter.status_reason")
      .addGroupBy("rank_filter.process_metadata")
      .addGroupBy("rank_filter.labware_id")
      .addGroupBy("rank_filter.phase_id")
      .addGroupBy("rank_filter.run_id")
      .addGroupBy("rank_filter.process_status")
      .addGroupBy("rank_filter.process_status_detail")
      .addGroupBy("rank_filter.review_status")
      .addGroupBy("rank_filter.analysis_status")
      .addGroupBy("rank_filter.analysis_status_detail")
      .addGroupBy("rank_filter.passage_number")
      .distinct()
      .where("rank = 1")
      .addOrderBy("rank_filter.passage_number");

    // Filter by reviewers
    if (reviewerIds && reviewerIds.length > 0) {
      // Check if the given string is only 1 value and if it is an empty string, then return the values of plates who do not have any reviewers with them.
      if (reviewerIds.length === 1 && reviewerIds[0] === "") {
        query.andWhere(
          `rank_filter.plate_id not in (select distinct "plate_reviewer".plate_id from "plate_reviewer")`
        );
      } else {
        query.andWhere(`user_id in ('${reviewerIds.join("','")}')`);
      }
    }
    if (barcode) {
      query.andWhere(`Plate.barcode = '${barcode}'`);
    }

    // Pagination
    query.limit(limit);
    query.offset(offset);
    query.distinct();
    const response = await query.getRawMany();
    const count = await query.getCount();
    return this.convertPlateEntityToDTO(response, count, pageId);
  }

  async convertPlateEntityToDTO(plates: Plate[], count: number, page: number) {
    const plateDTO = new PlateDTO();
    const pageInfo = new PageInfo();
    // Fetch all the data in parallel.
    const platesContentList: PlateContentDTO[] = await Promise.all(
      plates.map((plate) => this.mapPlateDetails(plate))
    );
    plateDTO.content = platesContentList;
    pageInfo.page = page;
    pageInfo.totalElements = count;
    pageInfo.size = plates.length;
    plateDTO.pageInfo = pageInfo;
    return plateDTO;
  }

  async mapPlateDetails(response: any): Promise<PlateContentDTO> {
    const plateContentDTO = new PlateContentDTO();
    plateContentDTO.id = response?.plate_id;
    plateContentDTO.name = response?.name;
    plateContentDTO.reviewers =
      response?.reviewers && response.reviewers.filter((ele) => ele !== null);
    plateContentDTO.currentPhaseId = response?.phase_id
      ? response.phase_id
      : null;
    plateContentDTO.runId = response?.run_id;
    plateContentDTO.barcode = response?.barcode;
    plateContentDTO.labwareId = response?.labware_id
      ? response.labware_id
      : null;
    plateContentDTO.plateStatus =
      PlateStatus[response?.status as unknown as keyof typeof PlateStatus];
    plateContentDTO.plateStatusReason = response?.status_reason;
    plateContentDTO.processMetadata = response?.process_metadata;
    plateContentDTO.processStatus =
      response?.process_status != null && response?.process_status >= 0
        ? ProcessStatus[
            response?.process_status as unknown as keyof typeof ProcessStatus
          ]
        : null;
    plateContentDTO.processStatusDetail = response?.process_status_detail;
    plateContentDTO.reviewStatus =
      response?.review_status != null && response?.review_status >= 0
        ? ReviewStatus[
            response?.review_status as unknown as keyof typeof ReviewStatus
          ]
        : null;
    plateContentDTO.analysisStatus =
      response?.analysis_status != null && response?.analysis_status >= 0
        ? AnalysisStatus[
            response?.analysis_status as unknown as keyof typeof AnalysisStatus
          ]
        : null;
    plateContentDTO.analysisStatusDetail = response?.analysis_status_detail;
    return plateContentDTO;
  }

  /* Adding a new plate to the DB 
     It takes plate information where name,barcode,created_by,labware details are mandatory  
  */
  async addPlate(plateRequest: CreatePlateRequestDTO) {
    const plate = new Plate();
    plate.barcode = plateRequest.barcode;
    plate.name =
      plateRequest?.name && plateRequest?.name?.trim() !== ""
        ? plateRequest.name
        : `CELL-${plateRequest.barcode}`;
    /* Labware object takes id and name providing either of them is mandatory */
    if (plateRequest?.labware) {
      let labware = null;
      if (plateRequest.labware?.id) {
        labware = await this.labwareRepository.findOne({
          where: { id: plateRequest.labware.id },
        });
      }
      if (
        labware === null &&
        plateRequest.labware?.name &&
        plateRequest.labware?.name?.trim() !== ""
      ) {
        labware = await this.labwareRepository.findOne({
          where: { name: plateRequest.labware.name },
        });
      }
      if (labware) {
        plate.labware = labware;
      } else {
        console.log(
          `The provided Labware Details ${JSON.stringify(
            plateRequest.labware
          )} is invalid.`
        );
        throw new NotFoundException(
          `The provided Labware Details ${JSON.stringify(
            plateRequest.labware
          )} is invalid.`
        );
      }
    }
    let userInfo: UserDTO = null;
    /* CreatedBy object takes id and email providing either of them is mandatory */
    if (plateRequest?.createdBy) {
      if (plateRequest.createdBy?.id) {
        try {
          userInfo = await this.userInfo.getUserById(plateRequest.createdBy.id);
        } catch (e) {
          throw new NotFoundException(
            `The provided createdBy id ${plateRequest.createdBy.id} is not found`
          );
        }
      }
      if (
        userInfo === null &&
        plateRequest.createdBy?.email &&
        plateRequest.createdBy?.email.trim() !== ""
      ) {
        userInfo = await this.userInfo.getUserByEmail(
          plateRequest.createdBy.email
        );
      }
      if (userInfo) {
        plate.createdBy = userInfo.id;
        plate.modifiedBy = userInfo.id;
      } else {
        console.log(
          `The provided CreatedBy Details ${JSON.stringify(
            plateRequest.createdBy
          )} is invalid.`
        );
        throw new NotFoundException(
          `The provided CreatedBy Details ${JSON.stringify(
            plateRequest.createdBy
          )} is invalid.`
        );
      }
    }
    plate.createdAt = new Date();
    plate.modifiedAt = new Date();
    try {
      const savedPlate = await this.plateRepository.save(plate);
      const plateDetails = new PlateDetailsDTO();
      plateDetails.id = savedPlate.id;
      plateDetails.name = savedPlate.name;
      plateDetails.barcode = savedPlate.barcode;
      plateDetails.plateStatus =
        PlateStatus[
          savedPlate?.plateStatus as unknown as keyof typeof PlateStatus
        ];
      plateDetails.plateStatusReason = savedPlate.plateStatusReason;
      plateDetails.currentPhaseId = savedPlate?.phase
        ? savedPlate.phase.id
        : null;
      plateDetails.labwareId = savedPlate?.labware
        ? savedPlate.labware.id
        : null;
      plateDetails.runId = savedPlate?.run ? savedPlate.run.id : null;
      plateDetails.processMetadata = savedPlate?.processMetadata
        ? savedPlate?.processMetadata
        : null;
      return plateDetails;
    } catch (e) {
      throw new InternalServerErrorException(
        `Error while storing the data ${e}`
      );
    }
  }

  async registerPlateToRunAndPhase(
    plateBarcode: string,
    runId: string,
    phaseId: string,
    userId: string
  ) {
    const plate = await this.plateRepository.findOneOrFail({
      where: {
        barcode: plateBarcode,
      },
    });
    plate.run = await this.runRepository.findOneOrFail({
      where: { id: runId },
    });
    plate.phase = await this.phaseRepository.findOneOrFail({
      where: { id: phaseId },
    });
    plate.modifiedAt = new Date();
    plate.modifiedBy = userId;
    return await this.plateRepository.save(plate);
  }

  async getPlatesWithPlateIds(ids: string[]): Promise<PlateContentDTO[]> {
    const response = await this.plateRepository.query(
      `select * from 
      (select Rank() OVER (PARTITION BY p.id ORDER BY e.created_at DESC) rank , 
       p.id as plate_id,p.name,p.barcode,p.status,p.status_reason,p.process_metadata,p.labware_id,p.phase_id,p.run_id,
       e.process_status,e.process_status_detail,e.review_status,e.analysis_status,e.analysis_status_detail,
       (select array_agg(distinct user_id) from plate_reviewer where plate_id = p.id ) as reviewers from plate p 
       left join event e on e.plate_id = p.id where p.id in ('${ids.join(
         "','"
       )}')) as plates where plates.rank=1 `
    );
    return await Promise.all(
      response.map((plate) => this.mapPlateDetails(plate))
    );
  }
}
