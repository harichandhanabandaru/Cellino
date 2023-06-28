import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEventDTO, PlateDetails } from "../../dto/create-event-dto";
import { EventType } from "../../enums/EventType";
import { EventService } from "../../event/event-service/event-service.service";
import { CloneReviewStatus } from "../../enums/CloneReviewStatus";
import { RunStatus } from "../../enums/RunStatus";
import {
  EntityNotFoundError,
  FindOptionsWhere,
  ILike,
  In,
  Raw,
  Repository,
} from "typeorm";
import { Run } from "../../entities/run.entity";
import { RunContentDto } from "../../dto/run-content-dto.dto";
import { RunDTO } from "../../dto/run.dto";
import { PageInfo } from "../../dto/page-info.dto";
import { isUUID } from "class-validator";
import { RunStatusCountResult } from "../../dto/RunStatusCountResult.dto";
import { RunStatusCount } from "../../dto/RunStatusCount.dto";
import { CreateRunDto } from "../../dto/create-run.dto";
import { PartnerService } from "../../partner/partner-service/partner-service/partner-service.service";
import { WorkflowService } from "../../workflow/workflow-service/workflow-service.service";
import { UserInfo } from "../../utils/UserInfo";
import { PlateService } from "../../plate/plate-service/plate-service.service";
import { RunMetricService } from "../../run-metric/run-metric-service/run-metric-service.service";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { getEnumIndex } from "../../utils/getEnumIndex";
import { BioseroOrderConstants } from "../../constansts/biosero-order-constants";
import { RunReviewer } from "../../entities/run-reviewer.entity";
import { RunPlateService } from "../../run-plate/run-plate-service/run-plate-service.service";
import { ExternalWellService } from "../../utils/external-well-service";
import { GetWellRequestDTO } from "../../dto/get-well-request.dto";

@Injectable()
export class RunService {
  private logger = new Logger(RunService.name);
  constructor(
    @InjectRepository(Run)
    private readonly runRepository: Repository<Run>,
    @InjectRepository(RunReviewer)
    private readonly runReviewerRepository: Repository<RunReviewer>,
    private readonly partnerService: PartnerService,
    private readonly workflowService: WorkflowService,
    private readonly userInfo: UserInfo,
    private readonly plateService: PlateService,
    private readonly runMetricService: RunMetricService,
    private readonly eventService: EventService,
    private readonly runPlateService: RunPlateService,
    private readonly externalWellService: ExternalWellService
  ) {}

  async getRunById(id: string): Promise<RunContentDto> {
    let run: Run;
    if (isUUID(id)) {
      run = await this.runRepository.findOne({
        where: { id: id },
        relations: { workflow: true, partner: true, reviewers: true },
      });
    } else {
      throw new BadRequestException(`The provided Run Id ${id} is not UUID`);
    }
    if (run !== null) {
      return this.convertRunToRunContentDTO(run);
    } else {
      throw new NotFoundException(`The provided Run Id ${id} is not found`);
    }
  }

  /**
   * This service method returns list of the runs.
   * It also supports filtering based on list of ids, name, status.
   * Pagination is also supported.
   *
   * @param ids Filter based on the list of ids provided.
   * @param nameLike Filter based on name provided
   * @param status Filter based on `RunStatus`
   * @param size Pagination param - number of records to return for each response
   * @param page Pagination param - goto page number
   * @returns `Promise<RunDTO>`
   */
  async getRuns(
    ids?: string[],
    nameLike?: string,
    status?: RunStatus,
    bioseroMasterOrderId?: string,
    size?: number,
    page?: number
  ): Promise<RunDTO> {
    const limit = size ? size : 20;
    const pageId = page ? page : 1;
    const offset = page && size ? (page - 1) * size : 0;

    const whereClause: FindOptionsWhere<Run> = {};

    if (ids) {
      whereClause.id = In(ids);
    }

    if (nameLike) {
      whereClause.name = ILike(`%${nameLike}%`);
    }

    // Only checking if it is not undefined. Because if status is 0 it will skip this if
    // statement completely and still give result.
    if (status !== undefined) {
      whereClause.runStatus = status;
    }

    if (bioseroMasterOrderId) {
      whereClause.metadata = Raw(
        () =>
          `metadata::jsonb @> '${JSON.stringify({
            biosero_master_order_id: bioseroMasterOrderId,
          })}'::jsonb`
      );
    }

    const [response, count] = await this.runRepository.findAndCount({
      where: whereClause,
      relations: {
        workflow: true,
        partner: true,
        phase: true,
        reviewers: true,
      },
      skip: offset,
      take: limit,
      order: { startDate: "DESC" },
    });

    return this.convertRunEntityToDTO(response, count, pageId);
  }

  async getRunsCountByStatus(): Promise<RunStatusCount> {
    const result: RunStatusCountResult[] = await this.runRepository.query(
      "select count(*) , status from run group by status"
    );
    const runcountResponse = new RunStatusCount();
    let total = 0;
    result !== null &&
      result.forEach((result: RunStatusCountResult) => {
        switch (result.status) {
          case RunStatus.INPROGRESS:
            runcountResponse.inProgressRuns = +result.count;
            total = total + +result.count;
            break;
          case RunStatus.FINISHED:
            runcountResponse.completedRuns = +result.count;
            total = total + +result.count;
            break;
          case RunStatus.ABORTED:
            runcountResponse.abortedRuns = +result.count;
            total = total + +result.count;
            break;
        }
      });
    runcountResponse.totalRuns = total;
    return runcountResponse;
  }
  convertRunEntityToDTO(runs: Run[], count: number, page: number): RunDTO {
    const runsContentDTOList: RunContentDto[] = [];
    const runDTO = new RunDTO();
    const pageInfo = new PageInfo();
    runs.forEach((runs) => {
      runsContentDTOList.push(this.convertRunToRunContentDTO(runs));
    });
    runDTO.content = runsContentDTOList;
    pageInfo.page = page;
    pageInfo.totalElements = count;
    pageInfo.size = runs.length;
    runDTO.pageInfo = pageInfo;
    return runDTO;
  }

  convertRunToRunContentDTO(runData: Run): RunContentDto {
    const run = new RunContentDto();
    run.id = runData.id;
    run.name = runData.name;
    run.partnerId = runData.partner?.id;
    run.objective = runData.runObjective;
    run.summary = runData.runSummary;
    run.metadata = runData.metadata;
    run.creatorId = runData.createdBy;
    run.runOwnerId = runData.runOwnerId;
    run.phaseId = runData.phase ? runData.phase?.id : null;
    run.workflowId = runData.workflow ? runData.workflow?.id : null;
    run.reviewers = runData.reviewers?.map((ele) => ele.userId) || [];
    run.cloneReviewStatus =
      CloneReviewStatus[
        runData.cloneReviewStatus as unknown as keyof typeof CloneReviewStatus
      ];
    run.runDay = runData.runDay;
    run.processId = runData.workflow?.id;
    run.seedingDay = runData.startDate;
    run.status =
      RunStatus[runData.runStatus as unknown as keyof typeof RunStatus];
    return run;
  }

  async createWell(wellPosition: string, plateId: string, userProfile: string) {
    //checks if the well is already registered
    const well = await this.externalWellService.fetchWell(
      new GetWellRequestDTO(plateId, wellPosition)
    );
    if (well.length > 0) {
      this.logger.log(
        `Well already exist for well position: ${wellPosition} and plate id: ${plateId}`
      );
    } else {
      const headers = {
        "user-profile": userProfile,
        "content-type": "application/json",
      };
      const body = {
        plate: {
          id: plateId,
        },
        position: wellPosition,
      };
      const res = await fetch(`${process.env.WELL_MGMT_SVC}/v1/wells`, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
      });
      if (!res.ok) {
        throw new HttpException(res.statusText, res.status);
      }
    }
  }

  async createBioseroMasterOrder(createRunDto: CreateRunDto) {
    const headers = {
      "content-type": "application/json",
    };
    const body = {
      identifier: null,
      parentIdentifier: null,
      runAfterIdentifier: null,
      restrictToModuleIds: BioseroOrderConstants.RestrictToModuleIds,
      moduleRestrictionStrategy:
        BioseroOrderConstants.ModuleRestrictionStrategy,
      createdBy: BioseroOrderConstants.CreatedBy,
      notes: null,
      scheduledStartTime: new Date().toISOString(),
      estimatedDurationInMinutes:
        BioseroOrderConstants.EstimatedDurationInMinutes,
      templateName: createRunDto.bioseroOrder.templateName,
      inputParameters: createRunDto.bioseroOrder.inputParameters.map(
        (parameter) => ({
          name: parameter.name,
          value:
            typeof parameter.value === "object"
              ? JSON.stringify(parameter.value)
              : parameter.value,
        })
      ),
      outputParameters: [],
      schedulingStrategy: BioseroOrderConstants.SchedulingStrategy,
    };

    const res = await fetch(
      `${process.env.BIOSERO_DATA_SVC}/api/v2.0/OrderService/CreateOrder`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers,
      }
    );
    if (!res.ok) {
      throw new HttpException(res.statusText, res.status);
    } else {
      const order_id = await res.text();
      try {
        return JSON.parse(order_id);
      } catch {
        return order_id;
      }
    }
  }

  async createRun(createRunDto: CreateRunDto, userProfile) {
    try {
      const runEntity: Run = await this.buildCreateRunPayload(
        createRunDto,
        userProfile
      );
      const savedRun = await this.runRepository.save(runEntity);
      // // update run metrics
      await this.runMetricService.addRunMetric(savedRun, createRunDto);
      // update plates
      await this.registerPlatesAndWellsToRun(
        createRunDto,
        savedRun,
        userProfile
      );

      // send api to biosero service
      const biosero_master_order_id = await this.createBioseroMasterOrder(
        createRunDto
      );
      savedRun.metadata = { ...savedRun.metadata, biosero_master_order_id };
      const runWithBioseroOrder = await this.runRepository.save(savedRun);

      // Create plate level seeding event
      const inputParameterNames: Array<string> =
        createRunDto.bioseroOrder.inputParameters.map(
          (parameter) => parameter.name
        );
      if (this.isStepExistsInBioseroOrder(inputParameterNames, "seeding")) {
        await this.createPlateLevelSeedingEvent(
          createRunDto,
          biosero_master_order_id,
          userProfile
        );
      }

      const reviewers = new Array<RunReviewer>();
      if (createRunDto.run_reviewer_id) {
        const reviewer = new RunReviewer();
        reviewer.userId = createRunDto.run_reviewer_id;
        reviewer.runId = runWithBioseroOrder.id;
        try {
          const runReviewer = await this.runReviewerRepository.save(reviewer);
          reviewers.push(runReviewer);
        } catch (e) {
          throw new HttpException(e.message, 500);
        }
      }

      runWithBioseroOrder.reviewers = reviewers;
      return this.convertRunToRunContentDTO(runWithBioseroOrder);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw new HttpException(e.message, 500);
    }
  }

  async buildCreateRunPayload(
    createRunDto: CreateRunDto,
    userProfile: string
  ): Promise<Run> {
    const userId = this.userInfo.getUserId(userProfile);
    const run = new Run();

    run.runDay = 0;
    run.startDate = createRunDto.start_date;
    run.runOwnerId = createRunDto.run_owner_id;
    run.runStatus = RunStatus[createRunDto.status] as unknown as RunStatus;
    run.runObjective = createRunDto.objective;
    run.metadata = JSON.parse(JSON.stringify(createRunDto)); // TODO verify
    run.runSummary = createRunDto.summary;
    run.name = createRunDto.name;
    run.partner = await this.partnerService.getPartnerById(
      createRunDto.partner_id
    );
    run.workflow = await this.workflowService.getById(createRunDto.workflow_id);
    run.createdAt = new Date();
    run.modifiedAt = new Date();
    run.createdBy = userId;
    run.modifiedBy = userId;
    return run;
  }

  async registerPlatesAndWellsToRun(
    createRunDto: CreateRunDto,
    run: Run,
    userProfile: string
  ) {
    const userId = this.userInfo.getUserId(userProfile);
    const plateWells = new Map();

    createRunDto.bioseroOrder.inputParameters
      ?.filter((param) => param?.value?.wells)
      ?.map((param) => param?.value?.wells)
      ?.flat()
      ?.forEach((wc) =>
        plateWells.has(wc?.barcode)
          ? plateWells.get(wc.barcode).push(wc.well)
          : plateWells.set(wc.barcode, [wc.well])
      );

    for (const [barcode, wells] of plateWells) {
      const updatedPlate = await this.plateService.registerPlateToRunAndPhase(
        barcode,
        run.id,
        createRunDto.phase_id,
        userId
      );
      await this.runPlateService.createRunPlatePhaseAssociation(
        barcode,
        run.id,
        createRunDto.phase_id,
        userId
      );
      const wellPositions = Array.from(new Set(wells));
      await Promise.all(
        wellPositions.map((x: string) =>
          this.createWell(x, updatedPlate.id, userProfile)
        )
      );
    }
  }

  async createPlateLevelSeedingEvent(
    createRunDTO: CreateRunDto,
    bioseroMasterOrderId: string,
    userProfile
  ) {
    const barcodes: Array<string> = Array.from(
      new Set(
        createRunDTO.bioseroOrder.inputParameters
          // filter out objects that don't have wells
          ?.filter((param) => param?.value?.wells)
          ?.map((param) => param?.value?.wells)
          ?.flat()
          ?.map((well) => well?.barcode)
      )
    );

    for (const barcode of barcodes) {
      const eventDTO = new CreateEventDTO();
      eventDTO.name = `seeding:${barcode}`;
      eventDTO.eventType = EventType[EventType.SEEDING] as unknown as EventType;
      eventDTO.plate = new PlateDetails();
      eventDTO.plate.barcode = barcode;
      eventDTO.protocol = null;
      eventDTO.metadata = {
        biosero_master_order_id: bioseroMasterOrderId,
        actual: {},
        original: createRunDTO.bioseroOrder.inputParameters.find((parameter) =>
          parameter.name.toLowerCase().includes("seeding")
        ),
      };
      eventDTO.startedAt = createRunDTO.start_date;
      await this.eventService.addEvent(eventDTO, userProfile);
    }
  }

  async updateByPatch(
    id: string,
    patchData: [Operation],
    userProfile: string
  ): Promise<RunContentDto> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Run Id ${id} should be UUID`);
    }

    const run = await this.runRepository.findOne({
      where: { id: id },
    });

    if (!run) {
      throw new NotFoundException(`The provided Run Id ${id} is not found`);
    }
    const userId = this.userInfo.getUserId(userProfile);
    patchData.forEach((operation) => {
      if (operation.path.includes("runStatus")) {
        operation["value"] = getEnumIndex(operation["value"], RunStatus);
      } else if (operation.path.includes("cloneReviewStatus")) {
        operation["value"] = getEnumIndex(
          operation["value"],
          CloneReviewStatus
        );
      }
    });
    const result = applyPatch(run, deepClone(patchData));
    const patchedObject = result.newDocument;
    patchedObject.modifiedAt = new Date();
    patchedObject.modifiedBy = userId;
    const runDetails = await this.runRepository.save(patchedObject);
    return Promise.resolve(this.convertRunToRunContentDTO(runDetails));
  }

  isStepExistsInBioseroOrder(stepNames: Array<string>, type: string) {
    let isExisted = false;
    stepNames.forEach((name) => {
      if (name.toLocaleLowerCase().includes(type.toLocaleLowerCase())) {
        isExisted = true;
      }
    });
    return isExisted;
  }
}
