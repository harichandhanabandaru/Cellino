import {
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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { InferenceService } from "../inference-service/inference-service.service";
import { InferenceDTO } from "../../dto/inference.dto";
import { GetInferenceRequestDTO } from "../../dto/get-inference-request.dto";
import {
  BAD_REQUEST_EXCEPTION_MESSAGE,
  HTTP_OK_MESSAGE,
  NOT_FOUND_EXCEPTION_MESSAGE,
} from "../../utils/constants";
import { CreateInferenceRequest } from "src/dto/create-inference.dto";
import { Operation } from "fast-json-patch";
import { PatchRequestBodyDTO } from "src/dto/patch-request-body.dto";

@ApiTags("Inferences")
@Controller({ path: "inferences", version: "1" })
export class InferenceController {
  constructor(private readonly inferenceService: InferenceService) {}

  @Get()
  @ApiOkResponse({ type: [InferenceDTO], description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({ description: BAD_REQUEST_EXCEPTION_MESSAGE })
  @ApiNotFoundResponse({ description: NOT_FOUND_EXCEPTION_MESSAGE })
  @ApiProduces(
    "For more details on reponse schema please refer to InferenceDTO from the schema section!"
  )
  async getInferences(
    @Query(new ValidationPipe({ transform: true }))
    query: GetInferenceRequestDTO
  ): Promise<InferenceDTO[]> {
    return this.inferenceService.getInferences(query);
  }

  @Post()
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiOkResponse({ type: InferenceDTO, description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({ description: "Bad request body provided" })
  @ApiNotFoundResponse({ description: NOT_FOUND_EXCEPTION_MESSAGE })
  @ApiBody({
    type: CreateInferenceRequest,
    schema: { $ref: getSchemaPath(CreateInferenceRequest) },
    description:
      "For more details on path and value please refer to CreateInferenceRequest from the schema section!",
  })
  @ApiProduces(
    "For more details on reponse schema please refer to InferenceDTO from the schema section!"
  )
  async create(
    @Body() reqBody: CreateInferenceRequest,
    @Headers("user-profile") userProfile: string
  ) {
    return this.inferenceService.create(reqBody, userProfile);
  }

  @Patch(":id")
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiOkResponse({ type: InferenceDTO, description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({ description: "Bad request body provided" })
  @ApiNotFoundResponse({ description: NOT_FOUND_EXCEPTION_MESSAGE })
  @ApiBody({
    type: [PatchRequestBodyDTO],
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to PatchRequestBodyDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on reponse schema please refer to InferenceDTO from the schema section!"
  )
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() patchOps: Operation[],
    @Headers("user-profile") userProfile: string
  ) {
    return this.inferenceService.update(id, patchOps, userProfile);
  }
}
