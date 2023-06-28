import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ClusterOrColonyType } from "../../enums/cluster-or-colony-type";
import { ClusterOrColonyQuality } from "../../enums/cluster-or-colony-quality";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { Colony } from "../../entities/colony.entity";
import { ColonyDTO } from "../../dto/colony.dto";
import { Cluster } from "../../entities/cluster.entity";
import { Well } from "../../entities/well.entity";
import { UserInfo } from "../../utils/user-info";
import { CreateColonyRequestDTO } from "../../dto/colony-request.dto";
import { randomUUID } from "crypto";
import { getEnumIndex } from "../../utils/get-enum-index";
import { ColonyCountDTO } from "../../dto/colony-count.dto";
import { ColonyCountByQualityDTO } from "../../dto/colony-count-by-quality.dto";

@Injectable()
export class ColonyService {
  constructor(
    @InjectRepository(Colony)
    private readonly colonyRepository: Repository<Colony>,
    @InjectRepository(Well)
    private readonly wellRepository: Repository<Well>,
    @InjectRepository(Cluster)
    private readonly clusterRepository: Repository<Cluster>,
    private readonly userInfo: UserInfo
  ) {}

  async getColonies(imageEventId?: string, quality?: string) {
    let colonyQuery = this.colonyRepository
      .createQueryBuilder("colony")
      .innerJoinAndSelect(Cluster, "cluster", "cluster.colony_id=colony.id")
      .select([
        'colony.id as "id"',
        'colony.name as "name"',
        'colony.is_active as "isActive"',
        'colony.is_selected as "isSelected"',
        'colony.well_id as "wellId"',
        'colony.type as "type"',
        'colony.quality as "quality"',
        'colony.image_analysis_request_id as "imageAnalysisRequestId"',
        'colony.created_at as "createdAt"',
        'colony.created_by as "createdBy"',
        'colony.modified_at as "modifiedAt"',
        'colony.modified_by as "modifiedBy"',
        'cluster.image_event_id as "image_event_id"',
        'colony.outline as "outline"',
      ])
      .distinct()
      .andWhere(`image_event_id = '${imageEventId}'`)
      .andWhere(`colony.is_active = true`);

    if (quality) {
      const qualityIndex = Object.values(ClusterOrColonyQuality).indexOf(
        quality
      );
      colonyQuery.andWhere(`colony.quality = ${qualityIndex}`);
    }
    const response = await colonyQuery.getRawMany();

    if (response) {
      const listOfColonies = await this.convertColonyEntityToDTO(response);
      return listOfColonies;
    } else {
      throw new NotFoundException(
        `Colonies for the provided Image_event_id ${imageEventId} is not found`
      );
    }
  }

  async updateByPatch(
    id: string,
    data: Operation[],
    userProfile: string
  ): Promise<ColonyDTO> {
    let colony = await this.colonyRepository.findOne({
      where: { id: id },
      relations: { well: true, imageAnalysisRequest: true },
    });
    if (!colony) {
      throw new NotFoundException(`The provided Colony Id ${id} is not found`);
    }
    data.forEach((operation) => {
      if (operation.path === "/type")
        operation["value"] = getEnumIndex(
          operation["value"],
          ClusterOrColonyType
        );
      else if (operation.path === "/quality")
        operation["value"] = getEnumIndex(
          operation["value"],
          ClusterOrColonyQuality
        );
    });
    let tempColony = deepClone(colony);
    let result = applyPatch(tempColony, deepClone(data));
    let patchedObject = result.newDocument;
    let userId = await this.userInfo.getUserId(userProfile);
    if (userId) {
      patchedObject.modifiedBy = userId;
    }
    let isColorModified = false;
    //an if condition to check if the color is modified or not
    if (colony?.outline["color"] !== patchedObject?.outline["color"]) {
      isColorModified = true;
    }
    let updatedColony = await this.colonyRepository.save(patchedObject);
    //If the color of the colony is modified, make a patch request to update all clusters color
    if (isColorModified) {
      await this.clusterRepository
        .createQueryBuilder("cluster_artifact")
        .update("cluster_artifact")
        .set({
          outline: () =>
            `jsonb_set(outline, '{color}', '"${patchedObject?.outline["color"]}"')`,
        })
        .where(`colony_id = '${id}'`)
        .execute();
    }
    return this.mapColonyDetails(updatedColony);
  }

  async addColony(
    colonyRequestDTO: CreateColonyRequestDTO,
    userProfile: string
  ): Promise<ColonyDTO> {
    const colony: Colony = await this.convertDtoToEntity(
      colonyRequestDTO,
      userProfile
    );
    let savedColony: Colony;
    try {
      savedColony = await this.colonyRepository.save(colony);
    } catch (e) {
      throw new InternalServerErrorException(
        "Unexpected error while saving the Colony"
      );
    }
    return this.mapColonyDetails(savedColony);
  }

  async convertColonyEntityToDTO(colonies: Colony[]) {
    // Fetch all the data in parallel.
    const colonyList: ColonyDTO[] = await Promise.all(
      colonies.map((colony) => this.mapColonyDetails(colony))
    );

    return colonyList;
  }

  async mapColonyDetails(response: any): Promise<ColonyDTO> {
    const colonyDTO = new ColonyDTO();
    colonyDTO.id = response?.id;
    colonyDTO.name = response?.name;
    colonyDTO.type =
      ClusterOrColonyType[
        response?.type as unknown as keyof ClusterOrColonyType
      ];
    colonyDTO.wellId = response?.wellId || response?.well?.id;
    colonyDTO.imageAnalysisRequestId =
      response?.imageAnalysisRequestId ||
      response?.imageAnalysisRequest?.id ||
      null;
    colonyDTO.quality =
      ClusterOrColonyQuality[
        response?.quality as unknown as keyof ClusterOrColonyQuality
      ];
    colonyDTO.isSelected = response?.isSelected;
    colonyDTO.isActive = response?.isActive;
    colonyDTO.outline = response?.outline;
    return colonyDTO;
  }

  async convertDtoToEntity(
    colonyDTO: CreateColonyRequestDTO,
    userProfile: string
  ): Promise<Colony> {
    let colony = new Colony();
    colony.id = randomUUID();
    colony.name = colonyDTO?.name;
    colony.isActive = true;
    colony.isSelected = colonyDTO?.isSelected;
    colony.outline = colonyDTO?.outline;
    colony.type = ClusterOrColonyType.MANUAL;
    colony.createdAt = new Date();
    colony.modifiedAt = new Date();
    let userId = await this.userInfo.getUserId(userProfile);
    colony.createdBy = userId;
    colony.modifiedBy = userId;
    let qualityEnums = Object.keys(ClusterOrColonyQuality).filter(
      (x) => !(parseInt(x) >= 0)
    );
    const status = colonyDTO?.quality as unknown as string;
    const index = qualityEnums.indexOf(status);
    colony.quality = index >= 0 ? index : ClusterOrColonyQuality.UNKNOWN;
    if (colonyDTO?.wellId) {
      colony.well = await this.wellRepository.findOne({
        where: { id: colonyDTO.wellId },
      });
      if (!colony.well) {
        throw new NotFoundException("provided wellId is invalid");
      }
    }
    return colony;
  }

  async getColonyCountByQuality(
    imageEventId?: string
  ): Promise<ColonyCountDTO> {
    const colonyQuery = this.colonyRepository
      .createQueryBuilder("colony")
      .innerJoinAndSelect(Cluster, "cluster", "cluster.colony_id=colony.id")
      .select([
        'count( distinct colony.id) as "count"',
        'colony.quality as "quality"',
      ])
      .distinct()
      .andWhere(`image_event_id = '${imageEventId}'`)
      .andWhere(`colony.is_active = true`)
      .groupBy("colony.quality");
    const colonyCountsData = await colonyQuery.getRawMany();
    return this.convertToColonyCountDTO(colonyCountsData, imageEventId);
  }

  convertToColonyCountDTO(colonyCountsData: any, imageEventId: string) {
    const colonyCountDTO: ColonyCountDTO = new ColonyCountDTO();
    const colonyCountByQuality: ColonyCountByQualityDTO[] =
      colonyCountsData.map((colonyCountByQuality) =>
        this.mapcolonyCountByQuality(colonyCountByQuality)
      );
    colonyCountDTO.imageEventId = imageEventId;
    colonyCountDTO.colonyCountByQuality = colonyCountByQuality;
    return colonyCountDTO;
  }

  mapcolonyCountByQuality(colonyCountByQuality: any) {
    let colonyCountByQualityDTO: ColonyCountByQualityDTO =
      new ColonyCountByQualityDTO();
    colonyCountByQualityDTO.count = colonyCountByQuality.count;
    colonyCountByQualityDTO.quality =
      ClusterOrColonyQuality[
        colonyCountByQuality?.quality as unknown as keyof typeof ClusterOrColonyQuality
      ];
    return colonyCountByQualityDTO;
  }
}
