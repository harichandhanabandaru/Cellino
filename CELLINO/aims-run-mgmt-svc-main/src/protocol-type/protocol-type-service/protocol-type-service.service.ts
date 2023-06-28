import {
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { UserInfo } from "../../utils/UserInfo";
import { PageInfo } from "../../dto/page-info.dto";
import { ProtocolType } from "../../entities/protocol-type.entity";
import { LookUpDTO } from "../../dto/lookup.dto";
import { CreateLookUpDataDTO } from "../../dto/create-lookup-data.dto";
import { LookUpContentDTO } from "../../dto/lookup-content.dto";
import { PaginationDTO } from "../../dto/pagination.dto";

@Injectable()
export class ProtocolTypeService {

  static DEFAULT_PAGE: number = 1;
  static DEFAULT_SIZE: number = 20;
  private readonly logger = new Logger(ProtocolTypeService.name);

  constructor(
    @InjectRepository(ProtocolType)
    private readonly protocolTypeRepository: Repository<ProtocolType>,
    private readonly userInfo: UserInfo
  ) {}

  /**
   * Fetches all the data for the `Protocol Type` resource.
   */
  async getAll({
    page = ProtocolTypeService.DEFAULT_PAGE,
    size = ProtocolTypeService.DEFAULT_SIZE,
  }: PaginationDTO): Promise<LookUpDTO> {
    const limit = Math.min(size, 50);
    const offset = page ? (page - 1) * size : 0;
    const pageId = page ? page : 1;

    // Fetch and return data
    const [protocolTypeList, count] =
      await this.protocolTypeRepository.findAndCount({
        skip: offset,
        take: limit,
      });

    return Promise.resolve(
      this.convertToProtocolTypeDTO(protocolTypeList, count, pageId)
    );
  }

  async addProtocolType(
    protocolTypeRequest: CreateLookUpDataDTO,
    userProfile: string
  ): Promise<LookUpContentDTO> {
    let protocolType: ProtocolType = await this.convertDtoToEntity(
      protocolTypeRequest,
      userProfile
    );
    let savedProtocolType: ProtocolType;
    try {
      savedProtocolType = await this.protocolTypeRepository.save(protocolType);
    } catch (e) {
      this.logger.error("Unexpected error while saving the protocol type");
      throw new InternalServerErrorException(
        "Unexpected error while saving the protocol type"
      );
    }
    let protocolTypeContentDto: LookUpContentDTO =
      new LookUpContentDTO(savedProtocolType);
    return Promise.resolve(protocolTypeContentDto);
  }

  async convertDtoToEntity(
    protocolTypeRequest: CreateLookUpDataDTO,
    userProfile: string
  ): Promise<ProtocolType> {
    let protocolType: ProtocolType = new ProtocolType();
    protocolType.id = randomUUID();
    protocolType.code = protocolTypeRequest.code;
    protocolType.label = protocolTypeRequest.label;
    protocolType.description = protocolTypeRequest?.description || null;
    protocolType.createdAt = new Date();
    protocolType.modifiedAt = new Date();
    let userId = await this.userInfo.getUserId(userProfile);
    protocolType.createdBy = userId;
    protocolType.modifiedBy = userId;
    protocolType.isActive = true;
    return protocolType;
  }

  convertToProtocolTypeDTO(
    protocolTypes: ProtocolType[],
    count: number,
    page: number
  ): LookUpDTO {
    const protocolTypeDTOList: LookUpContentDTO[] = [];
    const protocolTypeDTO = new LookUpDTO();
    const pageInfo = new PageInfo();
    protocolTypes.forEach(async (protocolType) => {
      protocolTypeDTOList.push(new LookUpContentDTO(protocolType));
    });
    protocolTypeDTO.content = protocolTypeDTOList;
    pageInfo.page = page;
    pageInfo.totalElements = count;
    pageInfo.size = protocolTypes.length;
    protocolTypeDTO.pageInfo = pageInfo;
    return protocolTypeDTO;
  }
}
