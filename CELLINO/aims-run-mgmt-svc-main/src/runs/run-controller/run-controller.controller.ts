import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { RunDTO } from "../../dto/run.dto";
import { GetRunsRequestDTO } from "../../dto/get-runs-query.dto";
import { RunService } from "../run-service/run-service.service";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RunContentDto } from "../../dto/run-content-dto.dto";
import { RunStatusCount } from "../../dto/RunStatusCount.dto";
import { RunStatus } from "../../enums/RunStatus";
import { CreateRunDto } from "../../dto/create-run.dto";
import { Operation } from "fast-json-patch";

@ApiTags("Run")
@Controller({ path: "runs", version: "1" })
export class RunController {
  constructor(private readonly runService: RunService) {}

  @Get(":id")
  @ApiOkResponse({ type: RunContentDto })
  @ApiBadRequestResponse({ description: "Bad Request : id is not UUID" })
  @ApiNotFoundResponse({
    description: "Not Found : The provided id is not present in Runs",
  })
  async getRunById(@Param("id") id: string): Promise<RunContentDto> {
    return await this.runService.getRunById(id);
  }

  @ApiOkResponse({ type: RunDTO })
  @ApiBadRequestResponse({ description: "Bad request format" })
  @Get()
  async getRuns(
    @Query(new ValidationPipe({ transform: true })) query: GetRunsRequestDTO
  ): Promise<RunDTO> {
    // Check if the request param 'status' is not a number and is part of the enum 'RunStatus'.
    if (query?.status) {
      if (!isNaN(Number(query.status)) || !(query.status in RunStatus)) {
        throw new BadRequestException(
          "'status' should be " +
            Object.values(RunStatus).filter((s) => typeof s === "string")
        );
      }
    }

    if (typeof query?.ids === "string") {
      const list = new Array(query.ids);
      return this.runService.getRuns(
        list,
        query?.nameLike,
        RunStatus[query?.status as unknown as keyof typeof RunStatus],
        query?.bioseroMasterOrderId,
        query?.size,
        query?.page
      );
    } else {
      return this.runService.getRuns(
        query?.ids,
        query?.nameLike,
        RunStatus[query?.status as unknown as keyof typeof RunStatus],
        query?.bioseroMasterOrderId,
        query?.size,
        query?.page
      );
    }
  }

  @Get("/run-status-count")
  @ApiOkResponse({ type: RunStatusCount })
  async getRunStatusAggragation(): Promise<RunStatusCount> {
    return await this.runService.getRunsCountByStatus();
  }

  @Post()
  @ApiHeader({
    name: "user-profile",
    required: true,
  })
  @ApiCreatedResponse({ description: "Run is created", type: RunContentDto })
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  async createRun(
    @Body() createRunDto: CreateRunDto,
    @Headers("user-profile") userProfile: string
  ) {
    return await this.runService.createRun(createRunDto, userProfile);
  }

  @Patch(":id")
  @ApiOkResponse({ type: RunContentDto })
  @ApiNotFoundResponse({ description: "The provided Run Id is not found" })
  @ApiBadRequestResponse({ description: "Run id provided is not an uuid" })
  async patchPlateById(
    @Param("id",ParseUUIDPipe) id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ): Promise<RunContentDto> {
    return this.runService.updateByPatch(id, data, userProfile);
  }
}
