import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { isUUID } from "class-validator";
import { ProtocolDefinition } from "../../entities/protocol-definition.entity";
import { CreateProtocolDefinitionDTO } from "../../dto/create-protocol-defintiion.dto";
import { randomUUID } from "crypto";
import { ProtocolDefinitionDTO } from "../../dto/protocol-definition.dto";
import { UserInfo } from "../../utils/UserInfo";
import { Instrument } from "../../entities/instrument.entity";
import { ProtocolDefinitionContentDTO } from "../../dto/protocol-definition-content.dto";
import { PageInfo } from "../../dto/page-info.dto";
import { ProtocolType } from "../../entities/protocol-type.entity";
import { ProtocolCategory } from "../../entities/protocol-category.entity";
import { GetProtocolDefinitionsQuery } from "../../dto/get-protocol-definition-query.dto";

@Injectable()
export class ProtocolDefinitionService {
  static BAD_REQUEST_ERROR_MESSAGE = "Protocol Definition ID is incorrect";
  static NOT_FOUND_ERROR_MESSAGE =
    "No records found with the given Protocol Definition ID";

  constructor(
    @InjectRepository(ProtocolDefinition)
    private readonly protocolDefinitionRepository: Repository<ProtocolDefinition>,
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,
    @InjectRepository(ProtocolType)
    private readonly protocolTypeRepository: Repository<ProtocolType>,
    @InjectRepository(ProtocolCategory)
    private readonly protocolCategoryRepository: Repository<ProtocolCategory>,
    private readonly userInfo: UserInfo
  ) {}

  /**
   * Fetches all the data of `ProtocolDefinition` table.
   *
   * @returns List of `Protocol Definitions`
   */
  async getAll({
    size,
    page,
    name,
    type,
    category,
  }: GetProtocolDefinitionsQuery): Promise<ProtocolDefinitionDTO> {
    const limit = size ? size : 20;
    const pageId = page ? page : 1;
    const offset = page && size ? (page - 1) * size : 0;

    const protocolDefinitionQuery = this.protocolDefinitionRepository
      .createQueryBuilder("protocol_definition")
      .select([
        "protocol_definition.id as id",
        "protocol_definition.name as name",
        "protocol_definition.parameters as parameters",
        "protocol_definition.protocol_category_code as protocol_category_code",
        "protocol_definition.protocol_type_code as protocol_type_code",
        "protocol_definition.related_id as related_id",
      ]);
    if (name) {
      protocolDefinitionQuery.andWhere(`Lower(name) like Lower('%${name}%')`);
    }
    if (type) {
      protocolDefinitionQuery.andWhere(`protocol_type_code = '${type}'`);
    }
    if (category) {
      protocolDefinitionQuery.andWhere(
        `protocol_category_code = '${category}'`
      );
    }

    protocolDefinitionQuery.limit(limit);
    protocolDefinitionQuery.offset(offset);
    const response = await protocolDefinitionQuery.getRawMany();

    if (response.length === 0) {
      //If there is no protcol associated with the given type fetch all distinct codes and  throw a bad request exception if the code not found
      if (type) {
        const protocolTypeCodesQuery = this.protocolTypeRepository
          .createQueryBuilder()
          .select(["code"])
          .distinct();
        const protocolTypeCodes = await protocolTypeCodesQuery.getRawMany();
        this.checkIfProtocolExists(protocolTypeCodes, type, "type");
      }
      if (category) {
        //If there is no protcol associated with the given category fetch all distinct categories throw a bad request exception if the code not found
        const protocolCategoryCodesQuery = this.protocolCategoryRepository
          .createQueryBuilder()
          .select(["code"])
          .distinct();
        const protocolCategoryCodes =
          await protocolCategoryCodesQuery.getRawMany();
        this.checkIfProtocolExists(protocolCategoryCodes, category, "category");
      }
    }
    const count = await protocolDefinitionQuery.getCount();
    return this.convertProtocolDefinitionEntityToDTO(response, count, pageId);
  }

  checkIfProtocolExists(
    protocolCodes: { code: string }[],
    value: string,
    type: string
  ) {
    const index = protocolCodes.findIndex(
      (protocol) => protocol.code === value
    );
    if (index === -1) {
      const codesList = protocolCodes.map((protocol) => protocol.code);
      throw new BadRequestException(
        `The accepted protcol ${type} values are [${codesList}]`
      );
    }
  }

  /**
   * Updates data applying the patch data. Follows JSON Patch standards.
   *
   * @param protocolDefinitionId Protocol Definition ID
   * @param patchData `RFC 6902` Format.
   * @returns
   */
  // async update(
  //   protocolDefinitionId: string,
  //   patchData: [Operation],
  //   userProfile: string
  // ): Promise<ProtocolDefinition> {
  //   // Check if the id is UUID
  //   if (!isUUID(protocolDefinitionId)) {
  //     throw new BadRequestException(
  //       ProtocolDefinitionService.BAD_REQUEST_ERROR_MESSAGE
  //     );
  //   }

  //   // Check if there is a record existing already
  //   let protocolDefinition = await this.protocolDefinitionRepository.findOne({
  //     where: { id: protocolDefinitionId },
  //   });
  //   if (!protocolDefinition) {
  //     throw new NotFoundException(
  //       ProtocolDefinitionService.NOT_FOUND_ERROR_MESSAGE
  //     );
  //   }

  //   // Update the record
  //   let result = applyPatch(protocolDefinition, deepClone(patchData));
  //   let patchedObject = result.newDocument;
  //   let userId = await this.userInfo.getUserId(userProfile);
  //   if (userId) {
  //     patchedObject.modifiedBy = userId;
  //   }
  //   let updatedProtocolDefinition =
  //     await this.protocolDefinitionRepository.save(patchedObject);
  //   // Return the updated record.
  //   return Promise.resolve(updatedProtocolDefinition);
  // }

  async addProtocolDefinition(
    protocolDefinitionRequest: CreateProtocolDefinitionDTO,
    userProfile: string
  ) {
    const protocolDefinition: ProtocolDefinition =
      await this.mapProtocolDefinitionDTOtoEntity(
        protocolDefinitionRequest,
        userProfile
      );
    try {
      const savedProtocolDefinition =
        await this.protocolDefinitionRepository.save(protocolDefinition);
      return new ProtocolDefinitionContentDTO(savedProtocolDefinition);
    } catch (e) {
      throw new InternalServerErrorException(
        "Unexpected error while saving the protocol definition"
      );
    }
  }

  async mapProtocolDefinitionDTOtoEntity(
    protocolDefinitionRequest: CreateProtocolDefinitionDTO,
    userProfile: string
  ): Promise<ProtocolDefinition> {
    let protocolDefinition: ProtocolDefinition = new ProtocolDefinition();
    protocolDefinition.id = randomUUID();
    protocolDefinition.name = protocolDefinitionRequest.name;
    protocolDefinition.workflowTemplateName =
      protocolDefinitionRequest.workflowTemplateName;
    protocolDefinition.relatedId = protocolDefinitionRequest?.relatedId
      ? protocolDefinitionRequest?.relatedId
      : null;
    if (protocolDefinitionRequest.protocolType) {
      let protocolType: ProtocolType =
        await this.protocolTypeRepository.findOne({
          where: { code: protocolDefinitionRequest.protocolType },
        });
      protocolDefinition.protocolType = protocolType;
    }
    if (protocolDefinitionRequest.protocolCategory) {
      let protocolCategory: ProtocolCategory =
        await this.protocolCategoryRepository.findOne({
          where: { code: protocolDefinitionRequest.protocolCategory },
        });
      protocolDefinition.protocolCategory = protocolCategory;
    }
    protocolDefinition.parameters = protocolDefinitionRequest.parameters;
    protocolDefinition.createdAt = new Date();
    protocolDefinition.modifiedAt = new Date();
    let userId = await this.userInfo.getUserId(userProfile);
    protocolDefinition.createdBy = userId;
    protocolDefinition.modifiedBy = userId;
    protocolDefinition.isActive = true;
    return protocolDefinition;
  }

  convertProtocolDefinitionEntityToDTO(
    protocolDefinitions: ProtocolDefinition[],
    count: number,
    page: number
  ): ProtocolDefinitionDTO {
    let protocolDefinitionDTO = new ProtocolDefinitionDTO();
    const protocolDefinitionContentDTOList: ProtocolDefinitionContentDTO[] = [];
    const pageInfo = new PageInfo();
    protocolDefinitions.forEach((protocolDefinition) => {
      protocolDefinitionContentDTOList.push(
        new ProtocolDefinitionContentDTO(protocolDefinition)
      );
    });
    protocolDefinitionDTO.content = protocolDefinitionContentDTOList;
    pageInfo.page = page;
    pageInfo.totalElements = count;
    pageInfo.size = protocolDefinitions.length;
    protocolDefinitionDTO.pageInfo = pageInfo;
    return protocolDefinitionDTO;
  }

  async getById(id: string): Promise<ProtocolDefinitionContentDTO> {
    try {
      const protocolDefinition: ProtocolDefinition =
        await this.protocolDefinitionRepository.findOneOrFail({
          where: { id: id },
          loadRelationIds: {
            relations: ["protocolType", "protocolCategory"],
            disableMixedMap: true,
          },
        });
      return new ProtocolDefinitionContentDTO(protocolDefinition);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
