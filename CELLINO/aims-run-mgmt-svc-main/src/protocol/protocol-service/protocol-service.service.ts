import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Protocol } from "../../entities/protocol.entity";
import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { CreateProtocolRequestDTO } from "../../dto/create-protocol-request.dto";
import { randomUUID } from "crypto";
import { ProtocolDefinition } from "../../entities/protocol-definition.entity";
import { UserInfo } from "../../utils/UserInfo";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { GetProtocolsQuery } from "../../dto/get-protocol-query.dto";
import { ProtocolDTO } from "../../dto/protocol.dto";
import { ProtocolContentDTO } from "../../dto/protocol-content.dto";
import { PageInfo } from "../../dto/page-info.dto";
import { GetProtocolsV2Query } from "../../dto/get-protocol-query-v2.dto";
import { ProtocolResponseV2Dto } from "../../dto/protocol-response.dto";
import { ProtocolResponseContentV2Dto } from "../../dto/protocol-content-v2.dto";

@Injectable()
export class ProtocolService {
  static BAD_REQUEST_ERROR_MESSAGE: string =
    "The provided protocol id is not an UUID";
  static NOT_FOUND_ERROR_MESSAGE: string =
    "The provided protocol id does not exist.";

  static DEFAULT_PAGE: number = 1;
  static DEFAULT_SIZE: number = 20;
  private readonly MAX_SIZE = 200;
  private readonly logger = new Logger(ProtocolService.name);

  constructor(
    @InjectRepository(Protocol)
    private readonly protocolRepository: Repository<Protocol>,
    @InjectRepository(ProtocolDefinition)
    private readonly protocolDefinitionRepository: Repository<ProtocolDefinition>,
    private readonly userInfo: UserInfo
  ) {}

  /**
   * Fetches all the data for the `Protocol` resource.
   */
  async getAll({
    phaseId,
    precedingProtocolId,
    name,
    page = ProtocolService.DEFAULT_PAGE,
    size = ProtocolService.DEFAULT_SIZE,
  }: GetProtocolsQuery): Promise<ProtocolDTO> {
    const limit = Math.min(size, 50);
    const offset = page ? (page - 1) * size : 0;
    const pageId = page ? page : 1;

    const whereClause: FindOptionsWhere<Protocol> = {};
    whereClause.phaseProtocol = {};

    if (phaseId) {
      whereClause.phaseProtocol.phase = {
        id: phaseId,
      };
    }

    if (precedingProtocolId) {
      whereClause.phaseProtocol.precedingProtocol = {
        id: precedingProtocolId,
      };
    }

    if (name) {
      whereClause.name = name;
    }

    // Fetch and return data
    const [listOfProtocols, count] = await this.protocolRepository.findAndCount(
      {
        where: whereClause,
        relations: {
          protocolDefinition: true,
          phaseProtocol: {
            phase: true,
            precedingProtocol: true,
            protocol: true,
          },
        },
        skip: offset,
        take: limit,
      }
    );

    return Promise.resolve(
      this.convertToProtocolDTO(listOfProtocols, count, pageId)
    );
  }

  async getAllV2({
    name,
    protocolDefinitionIds,
    nameLike,
    page = ProtocolService.DEFAULT_PAGE,
    size = ProtocolService.DEFAULT_SIZE,
  }: GetProtocolsV2Query): Promise<ProtocolResponseV2Dto> {
    const limit = Math.min(size, this.MAX_SIZE);
    const offset = page ? (page - 1) * size : 0;
    const pageId = page ? page : 1;

    const whereClause: FindOptionsWhere<Protocol> = {};
    whereClause.phaseProtocol = {};

    if (protocolDefinitionIds) {
      whereClause.protocolDefinition = {
        id: In(protocolDefinitionIds),
      };
    }

    if (name) {
      whereClause.name = name;
    }

    if (nameLike) {
      whereClause.name = ILike(`%${nameLike}%`);
    }

    const [listOfProtocols, count] = await this.protocolRepository.findAndCount(
      {
        where: whereClause,
        loadRelationIds: {
          relations: ["protocolDefinition"],
          disableMixedMap: true,
        },
        skip: offset,
        take: limit,
      }
    );

    return this.convertToProtocolResponseV2DTO(listOfProtocols, count, pageId);
  }

  /**
   * Fetches single record of `Protocol` resource.
   */
  async getById(id: string): Promise<Protocol> {
    // Boundary Conditions
    if (!isUUID(id)) {
      throw new BadRequestException(ProtocolService.BAD_REQUEST_ERROR_MESSAGE);
    }

    // Fetch data
    const protocol = await this.protocolRepository.findOne({
      where: { id: id },
      relations: { protocolDefinition: true, phaseProtocol: true },
    });
    // If data does not exist, throw error.
    if (!protocol) {
      throw new NotFoundException(ProtocolService.NOT_FOUND_ERROR_MESSAGE);
    }

    // Else, return data.
    return protocol;
  }

  /**
   * addProtocol
   * @param protocolRequest CreateProtocolRequestDTO
   * @param userProfile string
   * @returns
   */
  async addProtocol(
    protocolRequest: CreateProtocolRequestDTO,
    userProfile: string
  ): Promise<ProtocolContentDTO> {
    //Find if the protocol with the given settings already exists
    const settingsQuery = this.protocolRepository
      .createQueryBuilder()
      .select(["count(*)"])
      .where(
        `settings::jsonb = '${JSON.stringify(protocolRequest.settings)}'::jsonb`
      );
    const settingsCount = await settingsQuery.getCount();

    //throw a bad request exception if the protocol with the same settings exists
    if (settingsCount > 0) {
      throw new ConflictException(
        `Protocol with the given settings already exists`
      );
    }

    let protocol: Protocol = await this.convertDtoToEntity(
      protocolRequest,
      userProfile
    );

    // update the settings json with the default value for the parameter name,if parameter names are not specified
    const parameters = protocol.protocolDefinition.parameters;
    const updatedSettings = { ...protocol.settings };
    if (Array.isArray(parameters)) {
      parameters?.map((param: any) => {
        const field = param?.field;
        if (field && !protocolRequest.settings.hasOwnProperty(field)) {
          updatedSettings[`${field}`] =
            param?.defaultValue !== undefined ? param.defaultValue : null;
        }
      });
      protocol.settings = updatedSettings;
    }

    let savedProtocol: Protocol;
    try {
      savedProtocol = await this.protocolRepository.save(protocol);
    } catch (e) {
      this.logger.error(`Unexpected error while processing the request : ${e}`);
      throw new ConflictException(
        `Error while saving the Request : ${JSON.stringify(
          protocolRequest,
          null,
          2
        )}`,
        `${e?.detail}`
      );
    }
    let protocolContentDto: ProtocolContentDTO = new ProtocolContentDTO(
      savedProtocol
    );
    return Promise.resolve(protocolContentDto);
  }

  /**
   * updateByPatch
   * @param protocolId string
   * @param patchData [Operation]
   * @param userProfile string
   * @returns
   */
  // async updateByPatch(
  //   protocolId: string,
  //   patchData: Operation[],
  //   userProfile: string
  // ): Promise<ProtocolContentDTO> {
  //   if (!protocolId) {
  //     throw new NotFoundException(ProtocolService.NOT_FOUND_ERROR_MESSAGE);
  //   }

  //   const protocol = await this.protocolRepository.findOne({
  //     where: { id: protocolId },
  //     loadRelationIds: {
  //       relations: ["protocolDefinition"],
  //       disableMixedMap: true,
  //       },
  //   });
  //   const result = applyPatch(protocol, deepClone(patchData));
  //   let patchedObject = result.newDocument;
  //   let userId = await this.userInfo.getUserId(userProfile);
  //   if (userId) {
  //     patchedObject.modifiedBy = userId;
  //   }
  //   patchedObject.modifiedAt = new Date();
  //   await this.protocolRepository.save(patchedObject);
  //   let updatedProtocol = await this.protocolRepository.findOne({
  //     where: { id: protocolId },
  //     relations: { protocolDefinition: true, phaseProtocol: true },
  //   });
  //   return Promise.resolve(new ProtocolContentDTO(updatedProtocol));
  // }

  convertToProtocolResponseV2DTO(
    protocols: Protocol[],
    count: number,
    page: number
  ): ProtocolResponseV2Dto {
    const protocolDTO = new ProtocolResponseV2Dto();
    const pageInfo = new PageInfo();
    protocolDTO.content = protocols.map(
      (protocol) => new ProtocolResponseContentV2Dto(protocol)
    );
    pageInfo.page = page;
    pageInfo.totalElements = count;
    pageInfo.size = protocols.length;
    protocolDTO.pageInfo = pageInfo;
    return protocolDTO;
  }
  async convertDtoToEntity(
    protocolRequest: CreateProtocolRequestDTO,
    userProfile: string
  ): Promise<Protocol> {
    let protocol: Protocol = new Protocol();
    protocol.id = randomUUID();
    protocol.name = protocolRequest.name;
    if (protocolRequest.protocolDefintionId) {
      let protocolDefinition: ProtocolDefinition =
        await this.protocolDefinitionRepository.findOne({
          where: { id: protocolRequest.protocolDefintionId },
        });
      protocol.protocolDefinition = protocolDefinition;
    }
    protocol.settings = protocolRequest.settings;
    protocol.createdAt = new Date();
    protocol.modifiedAt = new Date();
    let userId = await this.userInfo.getUserId(userProfile);
    protocol.createdBy = userId;
    protocol.modifiedBy = userId;
    protocol.isActive = true;
    return protocol;
  }

  convertToProtocolDTO(
    protocols: Protocol[],
    count: number,
    page: number
  ): ProtocolDTO {
    const protocolContentList: ProtocolContentDTO[] = [];
    const protocolDTO = new ProtocolDTO();
    const pageInfo = new PageInfo();
    // Fetch all the data in parallel.
    protocols.forEach(async (protocol) => {
      protocolContentList.push(new ProtocolContentDTO(protocol));
    });
    protocolDTO.content = protocolContentList;
    pageInfo.page = page;
    pageInfo.totalElements = count;
    pageInfo.size = protocols.length;
    protocolDTO.pageInfo = pageInfo;
    return protocolDTO;
  }
}
