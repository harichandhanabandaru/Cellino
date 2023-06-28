import {
  Body,
  Controller,
  Get,
  Query,
  ValidationPipe,
  Headers,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import {
  HTTP_OK_MESSAGE,
} from "../../utils/constants";
import { ClusterAttributeService } from "../cluster-attribute-service/cluster-attribute-service.service";
import { ClusterAttributeDTO } from "../../dto/cluster-attribute.dto";
import { GetClusterAttributesRequestDTO } from "../../dto/get-cluster-attribute-request.dto";
import { CreateClusterAttributeRequestDTO } from "../../dto/create-cluster-attribute-request.dto";
import { ClusterAttributePaginatedDTO } from "src/dto/cluster-attribute-paginated.dto";

@ApiTags("Cluster Attributes")
@Controller({ path: "cluster-attributes", version: "1" })
export class ClusterAttributeController {
  constructor(private readonly clusterAttributeService: ClusterAttributeService) {}

  @Get()
  @ApiOkResponse({ type: [ClusterAttributeDTO], description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({
    description: "The provided well id or cluster artifact id is not UUID",
  })
  @ApiNotFoundResponse({
    description: "The provided well id or cluster artifact id is not found",
  })
  @ApiProduces(
    "For more details on response schema please refer to ClusterAttributePaginatedDTO from the schema section!"
  )
  async getClusterAttributes(
    @Query(new ValidationPipe({ transform: true })) query: GetClusterAttributesRequestDTO
  ): Promise<ClusterAttributePaginatedDTO> {
      return await this.clusterAttributeService.getClusterAttributes(query);
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Post()
  @ApiOkResponse({ type: ClusterAttributeDTO, description: HTTP_OK_MESSAGE })
  @ApiInternalServerErrorResponse({
    description: "Unexpected Error when processing the request",
  })
  @ApiBadRequestResponse({
    description: "The provided image event id is not UUID",
  })
  @ApiBody({
    type: CreateClusterAttributeRequestDTO,
    schema: { $ref: getSchemaPath(CreateClusterAttributeRequestDTO) },
    description:
      "For more details on request please refer to CreateClusterRequestDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to ClusterDTO from the schema section!"
  )
  async addClusterAttribute(
    @Body() createClusterRequestDTO: CreateClusterAttributeRequestDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return this.clusterAttributeService.addClusterAttribute(createClusterRequestDTO, userProfile);
  }
}
