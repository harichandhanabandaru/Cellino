import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "../../utils/pagination";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { RunMetric } from "../../entities/run-metric.entity";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { isUUID } from "class-validator";
import { CreateRunDto } from "../../dto/create-run.dto";
import { Run } from "../../entities/run.entity";

/**
 * Filter interface for `RunMetricService`.
 */
export interface RunMetricFilters {
  runIds?: String[];
}

/**
 * Service class for `RunMetric` entity.
 */
@Injectable()
export class RunMetricService {
  static DEFAULT_SIZE: number = 20;
  static DEFAULT_PAGE: number = 0;

  static BAD_REQUEST_ERROR_MESSAGE = "Run ID is incorrect";
  static NOT_FOUND_ERROR_MESSAGE = "No records found with the given Run ID";

  constructor(
    @InjectRepository(RunMetric)
    private readonly runMetricRespository: Repository<RunMetric>
  ) {}

  /**
   * Fetches all the data of `RunMetric` table.
   *
   * @param filters Can filter based on list of Run Ids
   * @param pagination Can use pagination. Size and page.
   * @returns List of `RunMetric`
   */
  async getAll(filters?: RunMetricFilters): Promise<RunMetric[]> {

    // Filter variables
    const whereClause: FindOptionsWhere<RunMetric> = {};

    if (filters?.runIds) {
      whereClause.run = {
        id: In(filters.runIds),
      };
    }

    // Fetch data based on filter
    const metrics = await this.runMetricRespository.find({
      where: whereClause,
    });

    // Return the data.
    return Promise.resolve(metrics);
  }

  /**
   * Updates data applying the patch data. Follows JSON Patch standards.
   *
   * @param runId Run ID
   * @param patchData `RFC 6902` Format.
   * @returns
   */
  async update(runId: string, patchData: [Operation]): Promise<RunMetric> {
    // Check if the id is UUID
    if (!isUUID(runId)) {
      throw new BadRequestException(RunMetricService.BAD_REQUEST_ERROR_MESSAGE);
    }

    // Check if there is a record existing already
    let metric = await this.runMetricRespository.findOne({
      where: { run: { id: runId } },
    });
    if (!metric) {
      throw new NotFoundException(RunMetricService.NOT_FOUND_ERROR_MESSAGE);
    }

    // Update the record
    let result = applyPatch(metric, deepClone(patchData));
    let patchedObject = result.newDocument;

    let updatedMetric = await this.runMetricRespository.save(patchedObject);

    // Return the updated record.
    return Promise.resolve(updatedMetric);
  }

  async addRunMetric(run: Run, createRunDto: CreateRunDto) {
    const runMetric = new RunMetric();
    runMetric.run = run;
    runMetric.runId = run.id;
    const wellCount = this.getWellCount(createRunDto);
    const platesCount = this.getPlateCount(createRunDto);
    runMetric.originalWellCount = wellCount;
    runMetric.originalPlateCount = platesCount;
    runMetric.platesCount = platesCount;
    runMetric.wellsCount = wellCount;
    runMetric.activePlatesCount = platesCount;
    runMetric.activeWellsCount = wellCount;
    return await this.runMetricRespository.save(runMetric);
  }

  getWellCount(createRunDto: CreateRunDto) {
    const plateWells: Array<string> = createRunDto.bioseroOrder.inputParameters
      // filter out objects that don't have wells
      ?.filter((param) => param?.value?.wells)
      ?.map((param) => param?.value?.wells)
      ?.flat()
      // get plate+well combination
      ?.map((w) => `${w?.barcode}${w?.well}`);

    return new Set(plateWells).size;
  }

  getPlateCount(createRunDto: CreateRunDto) {
    const barcodes: Array<string> = createRunDto.bioseroOrder.inputParameters
      // filter out objects that don't have wells
      ?.filter((param) => param?.value?.wells)
      ?.map((param) => param?.value?.wells)
      ?.flat()
      ?.map((well) => well?.barcode);

    return new Set(barcodes).size;
  }
}
