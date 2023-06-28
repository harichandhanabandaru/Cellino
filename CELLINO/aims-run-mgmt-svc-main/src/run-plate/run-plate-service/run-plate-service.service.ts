import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Phase } from "../../entities/phase.entity";
import { Plate } from "../../entities/plate.entity";
import { RunPlate } from "../../entities/run-plate.entity";
import { Run } from "../../entities/run.entity";
import { FindOptionsWhere, Repository, In, Raw } from "typeorm";
import { GetRunPlateRequestDto } from "../../dto/get-run-plate-request.dto";
import { RunPlateDto } from "../../dto/run-plate.dto";
import { RunPlateContentDto } from "../../dto/run-plate-content.dto";
import { PageInfo } from "../../dto/page-info.dto";

@Injectable()
export class RunPlateService {
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  private readonly MAX_SIZE = 100;
  constructor(
    @InjectRepository(RunPlate)
    private readonly runPlateRepository: Repository<RunPlate>,
    @InjectRepository(Plate)
    private readonly plateRepository: Repository<Plate>,
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    @InjectRepository(Run)
    private readonly runRepository: Repository<Run>
  ) {}

  async createRunPlatePhaseAssociation(
    plateBarcode: string,
    runId: string,
    phaseId: string,
    userId: string
  ) {
    const plate = await this.plateRepository.findOneOrFail({
      where: { barcode: plateBarcode },
    });
    const run = await this.runRepository.findOneOrFail({
      where: { id: runId },
    });
    const phase = await this.phaseRepository.findOneOrFail({
      where: { id: phaseId },
    });
    const runPlate = new RunPlate();
    runPlate.run = run;
    runPlate.plate = plate;
    runPlate.phase = phase;
    runPlate.createdAt = new Date();
    runPlate.modifiedAt = new Date();
    runPlate.createdBy = userId;
    runPlate.modifiedBy = userId;
    return await this.runPlateRepository.save(runPlate);
  }

  /**
   *
   * @param getRunPlateRequest
   * @returns
   */
  async getAll(
    getRunPlateRequest: GetRunPlateRequestDto
  ): Promise<RunPlateDto> {
    const limit = Math.min(
      getRunPlateRequest.size && getRunPlateRequest.size > 0
        ? getRunPlateRequest.size
        : this.DEFAULT_SIZE,
      this.MAX_SIZE
    );
    const pageId =
      getRunPlateRequest.page && getRunPlateRequest.page > 0
        ? getRunPlateRequest.page
        : this.DEFAULT_PAGE;
    const offset = (pageId - 1) * limit;

    let whereClause: FindOptionsWhere<RunPlate> = {};
    let plateWhereClause: FindOptionsWhere<Plate> = {};
    if (getRunPlateRequest.runIds && getRunPlateRequest.runIds.length > 0) {
      whereClause.runId = In(getRunPlateRequest.runIds);
    }
    if (getRunPlateRequest.plateIds && getRunPlateRequest.plateIds.length > 0) {
      whereClause.plateId = In(getRunPlateRequest.plateIds);
    }
    if (getRunPlateRequest.phaseIds && getRunPlateRequest.phaseIds.length > 0) {
      whereClause.phaseId = In(getRunPlateRequest.phaseIds);
    }
    if (getRunPlateRequest.plateNames) {
      const names = getRunPlateRequest.plateNames.map((n) => `%${n}%`);
      plateWhereClause.name = Raw(
        (alias) => `Lower(${alias}) similar to Lower('${names.join("|")}')`
      );
    }
    if (getRunPlateRequest.passageNumbers) {
      plateWhereClause.processMetadata = Raw(
        () =>
          `process_metadata->>'passage_number' in ('${getRunPlateRequest.passageNumbers.join(
            "','"
          )}')`
      );
    }
    whereClause.plate = plateWhereClause;
    const [response, count] = await this.runPlateRepository.findAndCount({
      where: whereClause,
      order: {
        run: { startDate: "ASC" },
      },
      skip: offset,
      take: limit,
      relations: { run: true, plate: true },
    });
    const runPlate = new RunPlateDto();
    const pageInfo = new PageInfo();
    runPlate.content = response.map((res) => new RunPlateContentDto(res));
    pageInfo.page = pageId;
    pageInfo.size = limit;
    pageInfo.totalElements = count;
    runPlate.pageInfo = pageInfo;
    return runPlate;
  }
}
