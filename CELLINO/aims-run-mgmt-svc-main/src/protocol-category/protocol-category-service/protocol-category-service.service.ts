import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { UserInfo } from "../../utils/UserInfo";
import { PageInfo } from "../../dto/page-info.dto";
import { PaginationDTO } from "../../dto/pagination.dto";
import { ProtocolCategory } from "../../entities/protocol-category.entity";
import { LookUpDTO } from "../../dto/lookup.dto";
import { CreateLookUpDataDTO } from "../../dto/create-lookup-data.dto";
import { LookUpContentDTO } from "../../dto/lookup-content.dto";

@Injectable()
export class ProtocolCategoryService {
  static DEFAULT_PAGE: number = 1;
  static DEFAULT_SIZE: number = 20;
  private readonly logger = new Logger(ProtocolCategoryService.name);

  constructor(
    @InjectRepository(ProtocolCategory)
    private readonly protocolCategoryRepository: Repository<ProtocolCategory>,
    private readonly userInfo: UserInfo
  ) {}

  /**
   * Fetches all the data for the `Protocol Category` resource.
   */
  async getAll({
    page = ProtocolCategoryService.DEFAULT_PAGE,
    size = ProtocolCategoryService.DEFAULT_SIZE,
  }: PaginationDTO): Promise<LookUpDTO> {
    const limit = Math.min(size, 50);
    const offset = page ? (page - 1) * size : 0;
    const pageId = page ? page : 1;

    // Fetch and return data
    const [protocolTypeList, count] =
      await this.protocolCategoryRepository.findAndCount({
        skip: offset,
        take: limit,
      });

    return Promise.resolve(
      this.convertToProtocolCategoryDTO(protocolTypeList, count, pageId)
    );
  }

  async addProtocolCategory(
    protocolCategoryRequest: CreateLookUpDataDTO,
    userProfile: string
  ): Promise<LookUpContentDTO> {
    let protocolCategory: ProtocolCategory = await this.convertDtoToEntity(
      protocolCategoryRequest,
      userProfile
    );
    let savedProtocolCategory: ProtocolCategory;
    try {
      savedProtocolCategory = await this.protocolCategoryRepository.save(
        protocolCategory
      );
    } catch (e) {
      this.logger.error("Unexpected error while saving the protocol type");
      throw new InternalServerErrorException(
        "Unexpected error while saving the protocol type"
      );
    }
    let protocolCategoryContentDto: LookUpContentDTO =
      new LookUpContentDTO(savedProtocolCategory);
    return Promise.resolve(protocolCategoryContentDto);
  }

  async convertDtoToEntity(
    protocolCategoryRequest: CreateLookUpDataDTO,
    userProfile: string
  ): Promise<ProtocolCategory> {
    let protocolCategory: ProtocolCategory = new ProtocolCategory();
    protocolCategory.id = randomUUID();
    protocolCategory.code = protocolCategoryRequest.code;
    protocolCategory.label = protocolCategoryRequest.label;
    protocolCategory.description = protocolCategoryRequest?.description || null;
    protocolCategory.createdAt = new Date();
    protocolCategory.modifiedAt = new Date();
    let userId = await this.userInfo.getUserId(userProfile);
    protocolCategory.createdBy = userId;
    protocolCategory.modifiedBy = userId;
    protocolCategory.isActive = true;
    return protocolCategory;
  }

  convertToProtocolCategoryDTO(
    protocolCategories: ProtocolCategory[],
    count: number,
    page: number
  ): LookUpDTO {
    const protocolTypeDTOList: LookUpContentDTO[] = [];
    const protocolTypeDTO = new LookUpDTO();
    const pageInfo = new PageInfo();
    protocolCategories.forEach(async (protocolCategory) => {
      protocolTypeDTOList.push(
        new LookUpContentDTO(protocolCategory)
      );
    });
    protocolTypeDTO.content = protocolTypeDTOList;
    pageInfo.page = page;
    pageInfo.totalElements = count;
    pageInfo.size = protocolCategories.length;
    protocolTypeDTO.pageInfo = pageInfo;
    return protocolTypeDTO;
  }
}
