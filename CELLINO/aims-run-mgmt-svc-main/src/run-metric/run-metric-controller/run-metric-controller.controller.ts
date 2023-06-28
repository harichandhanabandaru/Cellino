import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Operation } from "fast-json-patch";
import { GetRunMetricQueryDTO } from "../../dto/get-run-metric-query.dto";
import { RunMetricDTO } from "../../dto/run-metric.dto";
import { RunMetric } from "../../entities/run-metric.entity";
import { Pagination } from "../../utils/pagination";
import {
  RunMetricFilters,
  RunMetricService,
} from "../run-metric-service/run-metric-service.service";

@ApiTags("Run Metric")
@Controller({ path: "run-metrics", version: "1" })
export class RunMetricController {
  constructor(private readonly runMetricService: RunMetricService) {}

  /**
   * Handler function to fetch all the Run Metrics.
   */
  @Get()
  @ApiOkResponse({ type: [RunMetric] })
  @ApiBadRequestResponse({
    description: RunMetricService.BAD_REQUEST_ERROR_MESSAGE,
  })
  async getAll(
    @Query(new ValidationPipe({ transform: true })) query: GetRunMetricQueryDTO
  ): Promise<RunMetricDTO[]> {
    const filters: RunMetricFilters = {
      runIds: query.runIds,
    };

    const metrics = await this.runMetricService.getAll(filters);

    const metricDtos = metrics.map((metric) => new RunMetricDTO(metric));
    return Promise.resolve(metricDtos);
  }

  /**
   * Handler function to update a given record.
   */
  @Patch(":runId")
  @ApiOkResponse({ type: [RunMetric] })
  @ApiBadRequestResponse({
    description: RunMetricService.BAD_REQUEST_ERROR_MESSAGE,
  })
  @ApiNotFoundResponse({
    description: RunMetricService.NOT_FOUND_ERROR_MESSAGE,
  })
  async update(@Param("runId") runId: string, @Body() data: [Operation]) {
    let metric = await this.runMetricService.update(runId, data);
    return new RunMetricDTO(metric);
  }
}
