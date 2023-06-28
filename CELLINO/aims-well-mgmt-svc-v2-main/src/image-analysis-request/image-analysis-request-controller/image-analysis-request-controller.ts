import {
  Body,
  Controller,
  Param,
  Post,
  Headers,
  Patch,
  BadRequestException,
  Get,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { isUUID } from "class-validator";
import { Operation } from "fast-json-patch";
import { CreateImageAnalysisRequestDTO } from "../../dto/create-image-analysis-request.dto";
import { ImageAnalysisRequestDTO } from "../../dto/image-analysis-request.dto";
import { PatchRequestBodyDTO } from "../../dto/patch-request-body.dto";
import { ImageAnalysisRequestService } from "../image-analysis-request-service/image-analysis-request-service";
import { TriggerAnalysisRequestDto } from "../../dto/trigger-analysis-request.dto";
import { GetAnalysisRequestDto } from "../../dto/get-analysis-request.dto";

@ApiTags("Image Analysis Requests")
@Controller({ path: "image-analysis-requests", version: "1" })
export class ImageAnalysisRequestController {
  constructor(
    private readonly imageAnalysisRequestService: ImageAnalysisRequestService
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: "Image Analysis Request is created",
    type: ImageAnalysisRequestDTO,
  })
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  @ApiBody({
    type: CreateImageAnalysisRequestDTO,
    schema: { $ref: getSchemaPath(CreateImageAnalysisRequestDTO) },
    description:
      "For more details on request please refer to CreateImageAnalysisRequestDTO from the schema section!",
  })
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  async addImageAnalysisRequest(
    @Body() createImageAnalysisRequest: CreateImageAnalysisRequestDTO,
    @Headers("user-profile") userProfile: string
  ): Promise<ImageAnalysisRequestDTO> {
    return this.imageAnalysisRequestService.addImageAnalysisRequest(
      createImageAnalysisRequest,
      userProfile
    );
  }

  @Patch(":id")
  @ApiOkResponse({ type: ImageAnalysisRequestDTO })
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  @ApiNotFoundResponse({
    description: "No records found with the given Image Analysis Request ID",
  })
  @ApiInternalServerErrorResponse({ description: "Patch body is invalid" })
  @ApiBody({
    type: PatchRequestBodyDTO,
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to ImageAnalysisRequestContentDTO from the schema section!",
  })
  async update(
    @Param("id") id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException("provided analysis request id is not uuid");
    }
    let imageAnalysisRequest = await this.imageAnalysisRequestService.update(
      id,
      data,
      userProfile
    );
    return new ImageAnalysisRequestDTO(imageAnalysisRequest);
  }

  @Get(":id")
  @ApiOkResponse({ type: ImageAnalysisRequestDTO })
  @ApiNotFoundResponse({
    description: "No records found with the given Image Analysis Request ID",
  })
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  @ApiInternalServerErrorResponse({ description: "Something went wrong" })
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.imageAnalysisRequestService.getById(id);
  }

  @Post("trigger-analysis")
  @ApiOkResponse({ type: ImageAnalysisRequestDTO })
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  @ApiInternalServerErrorResponse({ description: "Body is invalid" })
  @ApiBody({
    type: TriggerAnalysisRequestDto,
    schema: {
      $ref: getSchemaPath(TriggerAnalysisRequestDto),
    },
    examples: {
      example1: {
        value: {
          protocol: {
            name: "taufiqs_density_via_nuc_v2",
          },
          settings: {
            sigma: 30,
          },
          developerMode: true,
          context: {
            plate: {
              barcode: "300002",
            },
            well: {
              position: "B5",
            },
            imageEvent: {
              id: "671e1acc-7d0b-42ee-8260-4c1d5f908e40",
            },
            artifactPath: {
              bucket: "aims-storage-dev",
              project: "project-aims-dev",
              datatype: "zarr",
              blob_path:
                "Inference_Images/300002/B5/nuc_inference_map_sendai_x1356_m2D5_z0_4_8_12/TL-20-e332a037-3501-40e1-9a5e-370774d2892f",
              time_slice_index: 1,
            },
          },
        } as unknown as TriggerAnalysisRequestDto,
      },
    },
    description:
      "For more details refer to TriggerAnalysisRequestDto from the schema section!",
  })
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  async triggerAnalysisRequest(
    @Body() triggerAnalysisRequestDto: TriggerAnalysisRequestDto,
    @Headers("user-profile") userProfile: string
  ) {
    return await this.imageAnalysisRequestService.triggerAnalysis(
      triggerAnalysisRequestDto,
      userProfile
    );
  }

  @Get()
  @ApiOkResponse({
    type: [ImageAnalysisRequestDTO],
    schema: { $ref: getSchemaPath(ImageAnalysisRequestDTO) },
  })
  async getAnalysisRequests(
    @Query() getAnalysisRequestDto: GetAnalysisRequestDto
  ) {
    return await this.imageAnalysisRequestService.getAnalysisRequests(
      getAnalysisRequestDto
    );
  }
}
