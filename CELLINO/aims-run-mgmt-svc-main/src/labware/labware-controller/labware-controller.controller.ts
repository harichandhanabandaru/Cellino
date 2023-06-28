import { BadRequestException, Controller, Get, Param, Query, ValidationPipe } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetLabwaresRequestDTO } from "../../dto/get-labwares-request-dto";
import { GetLabwaresResponseDTO } from "../../dto/get-labwares-response-dto";
import { LabwareDTO } from "../../dto/labware.dto";
import { LabwareService } from "../labware-service/labware.service";

@ApiTags("Labware")
@Controller({ path: "labwares", version: "1" })
export class LabwareController {
  constructor(private readonly labwareService: LabwareService) {}

  @Get(":id")
  @ApiOkResponse({ type: LabwareDTO })
  @ApiBadRequestResponse({ description: "Bad Request: id is not UUID" })
  @ApiNotFoundResponse({ description: "The provided id is not found" })
  async getById(@Param("id") id: string): Promise<LabwareDTO> {
    return this.labwareService.getById(id);
  }

  @ApiOkResponse({ type: [GetLabwaresResponseDTO] })
  @ApiBadRequestResponse({ description: "Bad request format" })
  @Get()
  async getAll(@Query() request: GetLabwaresRequestDTO): Promise<GetLabwaresResponseDTO> {
    return this.labwareService.getAll(request);
  }
}

