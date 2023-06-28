import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { FindOptionsWhere, IsNull, Repository, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Cluster } from "../../entities/cluster.entity";
import { ClusterDTO } from "../../dto/cluster.dto";
import { ImageEvent } from "../../entities/image-event.entity";
import { ClusterOrColonyType } from "../../enums/cluster-or-colony-type";
import { ClusterOrColonyQuality } from "../../enums/cluster-or-colony-quality";
import { Clonality } from "../../enums/clonality";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { Colony } from "../../entities/colony.entity";
import { randomUUID } from "crypto";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { Well } from "../../entities/well.entity";
import { PhenoType } from "../../enums/pheno-type";
import { UserInfo } from "../../utils/user-info";
import { CreateClusterRequestDTO } from "../../dto/cluster-request.dto";
import { getEnumIndex } from "../../utils/get-enum-index";
import { GetClusterRequestDTO } from "../../dto/get-cluster-request.dto";
import { ClusterPaginatedDTO } from "../../dto/cluster-paginated.dto";
import { ObjectCountByAnalysisRequestDto } from "../../dto/objects-group-by-analysis-dto";
import { PageInfo } from "../../dto/page-info.dto";
import { GetClustersCountGroupedByImageAnalysisDTO } from "../../dto/get-clusters-count-grouped-by-image-analysis";

@Injectable()
export class ClusterService {
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  constructor(
    @InjectRepository(Cluster)
    private readonly clusterRepository: Repository<Cluster>,
    @InjectRepository(ImageEvent)
    private readonly imageEventRepository: Repository<ImageEvent>,
    @InjectRepository(Colony)
    private readonly colonyRepository: Repository<Colony>,
    @InjectRepository(Well)
    private readonly wellRepository: Repository<Well>,
    @InjectRepository(ImageAnalysisRequest)
    private readonly imageAnalysisRequestRepository: Repository<ImageAnalysisRequest>,
    private readonly userInfo: UserInfo
  ) {}

  async getClusters(query?: GetClusterRequestDTO) {
    const limit = query.size && query.size > 0 ? query.size : this.DEFAULT_SIZE;
    const page = query.page && query.page > 0 ? query.page : this.DEFAULT_PAGE;
    const offset = (page - 1) * limit;
    let whereClause: FindOptionsWhere<Cluster> = {};
    let whereImageEventClause: FindOptionsWhere<ImageEvent> = {};
    let whereImageAnalysisRequestClause: FindOptionsWhere<ImageAnalysisRequest> =
      {};

    if (query?.imageEventId) {
      whereImageEventClause.id = query.imageEventId;
      whereClause.imageEvent = whereImageEventClause;
    }

    if (query?.imageAnalysisRequestId) {
      whereImageAnalysisRequestClause.id = query.imageAnalysisRequestId;
      whereClause.imageAnalysisRequest = whereImageAnalysisRequestClause;
    }

    if (query?.freeClusters) {
      whereClause.colony = IsNull();
    }

    if (query?.colonyIds) {
      whereClause.colony = {
        id: In(query.colonyIds),
      };
    }

    whereClause.isActive = true;

    let [response, count] = await this.clusterRepository.findAndCount({
      where: whereClause,
      loadRelationIds: true,
      order: { createdAt: "ASC" },
      skip: offset,
      take: limit,
    });
    return this.convertClusterEntityToDTO(response, count, page);
  }

  async updateByPatch(
    id: string,
    data: Operation[],
    userProfile: string
  ): Promise<ClusterDTO> {
    const cluster = await this.clusterRepository.findOne({
      where: { id: id },
      relations: {
        well: true,
        imageEvent: true,
        imageAnalysisRequest: true,
        colony: true,
      },
    });
    if (!cluster) {
      throw new NotFoundException(`The provided Cluster Id ${id} is not found`);
    }

    data.forEach((operation) => {
      if (operation.path === "/phenoType")
        operation["value"] = getEnumIndex(operation["value"], PhenoType);
      else if (operation.path === "/type")
        operation["value"] = getEnumIndex(
          operation["value"],
          ClusterOrColonyType
        );
      else if (operation.path === "/clonality")
        operation["value"] = getEnumIndex(operation["value"], Clonality);
      else if (operation.path === "/quality")
        operation["value"] = getEnumIndex(
          operation["value"],
          ClusterOrColonyQuality
        );
    });
    const result = applyPatch(cluster, deepClone(data));
    const patchedObject = result.newDocument;

    const userId = this.userInfo.getUserId(userProfile);
    if (userId) {
      patchedObject.modifiedBy = userId;
    }
    try {
      const updatedCluster = await this.clusterRepository.save(patchedObject);
      return this.mapClusterDetails(updatedCluster);
    } catch (e) {
      throw new InternalServerErrorException(
        "Persistance exception encountered while saving to database"
      );
    }
  }

  async convertClusterEntityToDTO(
    clusters: Cluster[],
    count: number,
    page: number
  ) {
    // Fetch all the data in parallel.
    const clusterList: ClusterDTO[] = await Promise.all(
      clusters.map((cluster) => this.mapClusterDetails(cluster))
    );
    const clusterPagniatedDto = new ClusterPaginatedDTO();
    clusterPagniatedDto.content = clusterList;
    const pageInfo = new PageInfo();
    pageInfo.size = clusters.length;
    pageInfo.page = page;
    pageInfo.totalElements = count;
    clusterPagniatedDto.pageInfo = pageInfo;
    return clusterPagniatedDto;
  }

  async mapClusterDetails(response: any): Promise<ClusterDTO> {
    const clusterDTO = new ClusterDTO();
    clusterDTO.id = response?.id;
    clusterDTO.name = response?.name;
    clusterDTO.type =
      ClusterOrColonyType[
        response?.type as unknown as keyof typeof ClusterOrColonyType
      ];
    clusterDTO.nameId = response?.nameId;
    clusterDTO.wellId = response.well?.id || response?.well;
    clusterDTO.colonyId = response.colony?.id || response?.colony;
    clusterDTO.imageEventId = response.imageEvent?.id || response?.imageEvent;
    clusterDTO.imageAnalysisRequestId =
      response?.imageAnalysisRequest?.id || response?.imageAnalysisRequest;
    clusterDTO.clonality =
      Clonality[response?.clonality as unknown as keyof typeof Clonality];
    clusterDTO.quality = ClusterOrColonyQuality[
      response?.quality
    ] as unknown as typeof ClusterOrColonyQuality;
    clusterDTO.attributes = response?.attributes;
    clusterDTO.parents = response?.parents;
    clusterDTO.outline = response?.outline;
    clusterDTO.phenoType =
      PhenoType[response?.phenoType as unknown as keyof typeof PhenoType];
    return clusterDTO;
  }

  async addCluster(
    clusterRequest: CreateClusterRequestDTO,
    userProfile: string
  ): Promise<ClusterDTO> {
    const cluster: Cluster = await this.convertDtoToEntity(
      clusterRequest,
      userProfile
    );
    let savedCluster: Cluster;
    try {
      savedCluster = await this.clusterRepository.save(cluster);
    } catch (e) {
      throw new InternalServerErrorException(
        "Unexpected error while saving the cluster"
      );
    }
    return this.mapClusterDetails(savedCluster);
  }

  async convertDtoToEntity(
    clusterRequest: CreateClusterRequestDTO,
    userProfile: string
  ): Promise<Cluster> {
    let cluster = new Cluster();

    cluster.id = clusterRequest?.id ?? randomUUID();
    cluster.name = clusterRequest.name;
    cluster.outline = clusterRequest?.outline;

    const imageEvent = await this.imageEventRepository.findOne({
      where: { id: clusterRequest.imageEventId },
    });
    if (imageEvent !== null) {
      cluster.imageEvent = imageEvent;
    } else {
      console.log(
        `The provided image event id ${clusterRequest.imageEventId} is not found `
      );
      throw new NotFoundException("image event id is not found");
    }

    if (clusterRequest?.colonyId) {
      cluster.colony = await this.colonyRepository.findOne({
        where: { id: clusterRequest.colonyId },
      });
      if (!cluster.colony)
        throw new NotFoundException(
          `colony Id: ${clusterRequest.colonyId} not found`
        );
    }
    if (clusterRequest?.wellId) {
      cluster.well = await this.wellRepository.findOne({
        where: { id: clusterRequest.wellId },
      });
      if (!cluster.well)
        throw new NotFoundException(
          `well Id: ${clusterRequest.wellId} not found`
        );
    }
    if (clusterRequest?.imageAnalysisRequestId) {
      cluster.imageAnalysisRequest =
        await this.imageAnalysisRequestRepository.findOne({
          where: { id: clusterRequest.imageAnalysisRequestId },
        });
      if (!cluster.imageAnalysisRequest)
        throw new NotFoundException(
          `imageAnalysisRequest Id: ${clusterRequest.imageAnalysisRequestId} not found`
        );
    }

    cluster.clonality =
      Clonality[
        Clonality[
          getEnumIndex(
            (clusterRequest.clonality as unknown as string) || "UNKNOWN",
            Clonality
          )
        ]
      ];

    cluster.phenoType =
      PhenoType[
        PhenoType[
          getEnumIndex(
            (clusterRequest.phenoType as unknown as string) || "UNKNOWN",
            PhenoType
          )
        ]
      ];

    cluster.type =
      ClusterOrColonyType[
        ClusterOrColonyType[
          getEnumIndex(
            (clusterRequest.type as unknown as string) || "MANUAL",
            ClusterOrColonyType
          )
        ]
      ];

    cluster.quality =
      ClusterOrColonyQuality[
        ClusterOrColonyQuality[
          getEnumIndex(
            (clusterRequest.quality as unknown as string) || "UNKNOWN",
            ClusterOrColonyQuality
          )
        ]
      ];

    const userId = await this.userInfo.getUserId(userProfile);

    cluster.createdAt = new Date();
    cluster.createdBy = userId;
    cluster.modifiedAt = new Date();
    cluster.modifiedBy = userId;

    return cluster;
  }

  async getClusterObjectsGroupedByImageAnalysis({
    imageEventId,
    freeClusters,
  }: GetClustersCountGroupedByImageAnalysisDTO) {
    const clusterObjectsCountGroupByAnalysisRequest = this.clusterRepository
      .createQueryBuilder("ca")
      .select(`count(*) as count,image_analysis_request_id`)
      .where(`image_event_id = '${imageEventId}' and is_active=true`)
      .groupBy("image_analysis_request_id");

    if (freeClusters) {
      clusterObjectsCountGroupByAnalysisRequest.andWhere(`colony_id is null`);
    }

    const clusterObjectsByImageEventId = this.imageAnalysisRequestRepository
      .createQueryBuilder("iar")
      .innerJoin(
        `(${clusterObjectsCountGroupByAnalysisRequest.getQuery()})`,
        "cl",
        "cl.image_analysis_request_id= iar.id"
      )
      .select(
        "cl.count as count,cl.image_analysis_request_id as image_analysis_request_id,iar.name as name"
      );

    const result = await clusterObjectsByImageEventId.getRawMany();

    return result.map((cl) => {
      const clustersGroupByAnalysis = new ObjectCountByAnalysisRequestDto();
      clustersGroupByAnalysis.imageAnalysisRequestId =
        cl.image_analysis_request_id;
      clustersGroupByAnalysis.imageAnalysisRequestName = cl.name;
      clustersGroupByAnalysis.count = cl.count;
      return clustersGroupByAnalysis;
    });
  }
}
