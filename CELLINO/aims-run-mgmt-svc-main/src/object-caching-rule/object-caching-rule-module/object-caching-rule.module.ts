import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ObjectCachingRule } from "src/entities/object-caching-rule.entity";
import { UserInfo } from "src/utils/UserInfo";
import { ObjectCachingRuleController } from "../object-caching-rule-controller/object-caching-rule.controller";
import { ObjectCachingRuleService } from "../object-caching-rule-service/object-caching-rule.service";

@Module({
  controllers: [ObjectCachingRuleController],
  providers: [ObjectCachingRuleService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([ObjectCachingRule]),
    CacheModule.register(),
  ],
})
export class ObjectCachingRuleModule {}
