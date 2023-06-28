import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetRunPlateRequestDto } from "../../dto/get-run-plate-request.dto";
import { RunPlateDto } from "../../dto/run-plate.dto";
import { RunPlateService } from "../run-plate-service/run-plate-service.service";

@ApiTags("Run Plate")
@Controller({ path: "run-plates", version: "1" })
export class RunPlateController {
  constructor(private readonly runPlateService: RunPlateService) {}

  @Get()
  @ApiOkResponse({ type: [RunPlateDto] })
  async getAll(@Query() getRunPlateRequest: GetRunPlateRequestDto) {
    return await this.runPlateService.getAll(getRunPlateRequest);
  }
}
