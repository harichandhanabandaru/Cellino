import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Patch,
  Param,
  ParseUUIDPipe,
  Delete,
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { GetScanObjectsRequestDto } from "../../dto/get-scan-objects-request.dto";
import { ScanObjectPaginatedDTO } from "../../dto/scan-object-paginated.dto";
import { ScanObjectService } from "../scan-object-service/scan-object-service.service";
import { CreateScanObjectRequest } from "../../dto/create-scan-object-request.dto";
import { ScanObjectDto } from "../../dto/scan-object.dto";
import { HTTP_OK_MESSAGE } from "src/utils/constants";
import { Operation } from "fast-json-patch";
import { ObjectCountByAnalysisRequestDto } from "../../dto/objects-group-by-analysis-dto";
import { PatchRequestBodyDTO } from "../../dto/patch-request-body.dto";
import { StatusMessage } from "../../dto/status-message-dto";

@ApiTags("Scan Objects")
@Controller({ version: "1", path: "scan-objects" })
export class ScanObjectController {
  constructor(private readonly scanObjectService: ScanObjectService) {}

  @Get()
  @ApiOkResponse({ type: [ScanObjectPaginatedDTO] })
  async getScanObjects(@Query() request: GetScanObjectsRequestDto) {
    return await this.scanObjectService.getScanObjects(request);
  }

  @Get("image-analysis-request-id/count")
  @ApiOkResponse({ type: [ObjectCountByAnalysisRequestDto] })
  async getScanObjectsGroupedByImageAnalysis(
    @Query("imageEventId", ParseUUIDPipe) imageEventId: string
  ) {
    return await this.scanObjectService.getScanObjectsGroupedByImageAnalysis(
      imageEventId
    );
  }

  @Post()
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiBody({
    type: CreateScanObjectRequest,
    schema: { $ref: getSchemaPath(CreateScanObjectRequest) },
    description:
      "For more details on path and value please refer to CreateScanObjectRequest from the schema section!",
  })
  async createScanObject(
    @Body() request: CreateScanObjectRequest,
    @Headers("user-profile") userProfile: string
  ) {
    return await this.scanObjectService.createScanObject(request, userProfile);
  }

  @Patch(":id")
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiOkResponse({ type: ScanObjectDto, description: HTTP_OK_MESSAGE })
  @ApiNotFoundResponse({
    description: "The provided Scan Object Id is not found",
  })
  @ApiBody({
    type: [PatchRequestBodyDTO],
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to PatchRequestBodyDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on reponse schema please refer to ScanObjectDto from the schema section!"
  )
  async patchImageEventById(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ): Promise<ScanObjectDto> {
    return await this.scanObjectService.updateScanObject(id, data, userProfile);
  }

  @Delete(":id")
  @ApiNoContentResponse({
    description: "The Scan Object has been deleted.",
    schema: {
      type: "string",
    },
  })
  @ApiNotFoundResponse({
    description: "The provided Scan Object Id is not found",
  })
  @ApiHeader({
    name: "user-profile",
    required: false,
  })
  async deleteById(
    @Param("id", ParseUUIDPipe) id: string,
    @Headers("user-profile") userProfile: string 
  ): Promise<StatusMessage> {
    return await this.scanObjectService.deleteById(id, userProfile);
  }
}
