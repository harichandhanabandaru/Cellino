import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectCachingRuleDto } from "../../dto/object-caching-rule.dto";
import { ObjectCachingRule } from "../../entities/object-caching-rule.entity";
import { UserInfo } from "../../utils/UserInfo";
import { Repository } from "typeorm";

@Injectable()
export class ObjectCachingRuleService {
  constructor(
    @InjectRepository(ObjectCachingRule)
    private readonly objectCachingRuleRepository: Repository<ObjectCachingRule>,
    private readonly userInfo:UserInfo
  ) {}

  async getObjectCachingRules(): Promise<Array<ObjectCachingRuleDto>> {
    const objectCachingRules: ObjectCachingRule[] =
      await this.objectCachingRuleRepository.find();
    return objectCachingRules.map((objectCachingRule) =>
      this.convertObjectCachingRuleEntityToDTO(objectCachingRule)
    );
  }

  convertObjectCachingRuleEntityToDTO(
    objectCachingRule: ObjectCachingRule
  ): ObjectCachingRuleDto {
    const objectCachingRuleDTO: ObjectCachingRuleDto =
      new ObjectCachingRuleDto();
    objectCachingRuleDTO.id = objectCachingRule.id;
    objectCachingRuleDTO.cacheControl = objectCachingRule.cacheControl;
    objectCachingRuleDTO.objectPattern = objectCachingRule.objectPattern;
    return objectCachingRuleDTO;
  }

  async createObjectCachingRule(objectCachingRuleDTO: ObjectCachingRuleDto, userProfile: string): Promise<ObjectCachingRule> {
    const objectCachingRule: ObjectCachingRule = new ObjectCachingRule()
    const userId = this.userInfo.getUserId(userProfile)
    objectCachingRule.objectPattern = objectCachingRuleDTO.objectPattern
    objectCachingRule.cacheControl = objectCachingRuleDTO.cacheControl
    objectCachingRule.createdBy = userId
    objectCachingRule.modifiedBy = userId
    objectCachingRule.createdAt = new Date()
    objectCachingRule.modifiedAt = new Date()
    return await this.objectCachingRuleRepository.save(objectCachingRule)
  }
}