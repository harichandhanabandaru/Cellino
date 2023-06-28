import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Cluster } from "../../entities/cluster.entity";
import { randomUUID } from "crypto";
import { Well } from "../../entities/well.entity";
import { UserInfo } from "../../utils/user-info";
import { ClusterAttributeDTO } from "../../dto/cluster-attribute.dto";
import { ClusterAttribute } from "../../entities/cluster-attribute.entity";
import { CreateClusterAttributeRequestDTO } from "../../dto/create-cluster-attribute-request.dto";
import { GetClusterAttributesRequestDTO } from "../../dto/get-cluster-attribute-request.dto";
import { ClusterAttributePaginatedDTO } from "../../dto/cluster-attribute-paginated.dto";
import { PageInfo } from "../../dto/page-info.dto";

@Injectable()
export class ClusterAttributeService {
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  private readonly MAX_SIZE = 200;
  private readonly logger = new Logger(ClusterAttributeService.name);
  constructor(
    @InjectRepository(ClusterAttribute)
    private readonly clusterAttributeRepository: Repository<ClusterAttribute>,
    @InjectRepository(Well)
    private readonly wellRepository: Repository<Well>,
    @InjectRepository(Cluster)
    private readonly clusterRepository: Repository<Cluster>,
    private readonly userInfo: UserInfo
  ) {}

  async getClusterAttributes(query?: GetClusterAttributesRequestDTO) {
    const limit = Math.min(
      query.size && query.size > 0 ? query.size : this.DEFAULT_SIZE,
      this.MAX_SIZE
    );
    const page = query.page && query.page > 0 ? query.page : this.DEFAULT_PAGE;
    const offset = (page - 1) * limit;
    const clusterArtifactId = query.clusterArtifactId;
    const wellId = query?.wellId;
    const whereClause: FindOptionsWhere<ClusterAttribute> = {};
    if (clusterArtifactId) {
      const whereClusterClause: FindOptionsWhere<Cluster> = {};
      whereClusterClause.id = clusterArtifactId;
      whereClause.cluster = whereClusterClause;
    }
    if (wellId) {
      const whereWellClause: FindOptionsWhere<Well> = {};
      whereWellClause.id = wellId;
      whereClause.well = whereWellClause;
    }
    let [response,count] = await this.clusterAttributeRepository.findAndCount({
      where: whereClause,
      loadRelationIds: true,
      skip: offset,
      take: limit,
    });
    if (response) {
      return this.convertClusterAttributeEntityToDTO(response,count,page);
    } else {
      throw new NotFoundException(
        `Cluster Attributes for the provided cluster_artifact_id ${clusterArtifactId} is not found`
      );
    }
  }

  async convertClusterAttributeEntityToDTO(
    clusterAttributes: ClusterAttribute[], count: number, page: number
  ) {
    const clusterAttributePaginatedDTO  = new ClusterAttributePaginatedDTO();
    const clusterAttributeList: ClusterAttributeDTO[] = await Promise.all(
      clusterAttributes.map((clusterAttribute) =>
        this.mapClusterAttributeDetails(clusterAttribute)
      )
    );
    clusterAttributePaginatedDTO.content=clusterAttributeList;
    const pageInfo = new PageInfo();
    pageInfo.totalElements=count;
    pageInfo.page=page;
    pageInfo.size=clusterAttributeList?.length;
    clusterAttributePaginatedDTO.pageInfo=pageInfo;
    return clusterAttributePaginatedDTO;
  }

  async mapClusterAttributeDetails(
    response: any
  ): Promise<ClusterAttributeDTO> {
    const clusterAttributeDTO = new ClusterAttributeDTO();
    clusterAttributeDTO.id = response.id;
    clusterAttributeDTO.source = response?.source;
    clusterAttributeDTO.key = response?.key;
    clusterAttributeDTO.value = response?.value;
    clusterAttributeDTO.clusterArtifactId =
      response?.cluster?.id || response?.cluster;
    clusterAttributeDTO.wellId = response.well?.id || response?.well;
    return clusterAttributeDTO;
  }

  async addClusterAttribute(
    clusterAttributeRequest: CreateClusterAttributeRequestDTO,
    userProfile: string
  ): Promise<ClusterAttributeDTO> {
    const clusterAttribute: ClusterAttribute = await this.convertDtoToEntity(
      clusterAttributeRequest,
      userProfile
    );
    let savedClusterAttribute: ClusterAttribute;
    try {
      savedClusterAttribute = await this.clusterAttributeRepository.save(
        clusterAttribute
      );
    } catch (e) {
      throw new InternalServerErrorException(
        "Unexpected error while saving the cluster"
      );
    }
    return this.mapClusterAttributeDetails(savedClusterAttribute);
  }

  async convertDtoToEntity(
    createClusterRequest: CreateClusterAttributeRequestDTO,
    userProfile: string
  ): Promise<ClusterAttribute> {
    let clusterAttribute = new ClusterAttribute();
    try {
      clusterAttribute.cluster = await this.clusterRepository.findOneOrFail({
        where: { id: createClusterRequest.clusterArtifactId },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        `The provided cluster artifact id ${createClusterRequest.clusterArtifactId} is invalid`
      );
    }
    if (createClusterRequest.wellId) {
      try {
        clusterAttribute.well = await this.wellRepository.findOneOrFail({
          where: { id: createClusterRequest.wellId },
        });
      } catch (e) {
        this.logger.error(e.message);
        throw new BadRequestException(
          `The provided well id ${createClusterRequest.wellId} is invalid`
        );
      }
    }
    clusterAttribute.source = createClusterRequest?.source;
    clusterAttribute.key = createClusterRequest.key;
    clusterAttribute.value = createClusterRequest.value;
    let userId = this.userInfo.getUserId(userProfile);
    clusterAttribute.createdAt = new Date();
    clusterAttribute.createdBy = userId;
    clusterAttribute.modifiedAt = new Date();
    clusterAttribute.modifiedBy = userId;
    clusterAttribute.id = randomUUID();
    return clusterAttribute;
  }
}
