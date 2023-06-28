import { Controller, Get, Param } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { PhaseDto } from "../../dto/phase-dto.dto";
import { PhaseService } from "../phase-service/phase-service.service";

@ApiTags("Phase")
@Controller({ path: "phases", version: "1" })
export class PhaseController {
  constructor(private readonly phaseService: PhaseService) {}

  @ApiOkResponse({ type: [PhaseDto] })
  @Get()
  async getAllPhases(): Promise<PhaseDto[]> {
    return await this.phaseService.getAllPhases();
  }

  @ApiOkResponse({ type: PhaseDto })
  @ApiNotFoundResponse({ description: "The provided Id is not found" })
  @ApiBadRequestResponse({ description: "Phase id provided id is not an uuid" })
  @Get(":id")
  async getPhaseById(@Param("id") id: string): Promise<PhaseDto> {
    return await this.phaseService.getPhaseById(id);
  }
}
