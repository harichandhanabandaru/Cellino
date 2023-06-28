import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Headers,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ObjectCachingRuleDto } from "../../dto/object-caching-rule.dto";
import { ObjectCachingRule } from "../../entities/object-caching-rule.entity";
import { ObjectCachingRuleService } from "../object-caching-rule-service/object-caching-rule.service";

@ApiTags("Object Caching Rule")
@Controller({ path: "object-caching-rule", version: "1" })
export class ObjectCachingRuleController {
  constructor(
    private readonly objectCachingRuleService: ObjectCachingRuleService
  ) {}

  @Get()
  @ApiOkResponse({ type: [ObjectCachingRuleDto] })
  @ApiBadRequestResponse({
    description: "The given file name is not matching to any object patteren",
  })
  @CacheKey("caching_rules")
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(+process.env.OBJECT_CACHING_RULE_TTL)
  async getObjectCachingRuleByObjectName() {
    return await this.objectCachingRuleService.getObjectCachingRules();
  }

  @Post()
  @ApiCreatedResponse({ type: ObjectCachingRule })
  @ApiBody({ type: ObjectCachingRuleDto })
  @ApiHeader({
    name: "user-profile",
    required: true,
    description: "(Leave empty.)",
  })
  async createCachingObjectRule(
    @Body() objectCchingRule: ObjectCachingRuleDto,
    @Headers("user-profile") userProfile: string
  ) {
    return await this.objectCachingRuleService.createObjectCachingRule(
      objectCchingRule,
      userProfile
    );
  }
}
