import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../../dto/User.dto";
import { ObjectCachingRule } from "../../entities/object-caching-rule.entity";
import { UserInfo } from "../../utils/UserInfo";
import tap from "tap";
import { ObjectCachingRuleService } from "./object-caching-rule.service";
import { ObjectCachingRuleDto } from "../../dto/object-caching-rule.dto";

const objectCachingRuleMock = plainToInstance(ObjectCachingRule, {
  createdBy: "d887cfda-6a62-4521-ae20-676ac4cb91b1",
  createdAt: "2023-02-14T07:49:36.390Z",
  modifiedBy: "d887cfda-6a62-4521-ae20-676ac4cb91b1",
  modifiedAt: "2023-02-14T07:49:36.390Z",
  objectPattern: "**/*/dd.dd.dd.dd.dd",
  cacheControl: "private, max-age=31536000",
  id: "2186eab8-4060-4089-8090-ba9ec2752da4",
});

const objectCachingRuleDTOMock = plainToInstance(ObjectCachingRuleDto, {
  id: "c64a1b05-8be0-4538-a19b-521975759dd8",
  objectPattern: "**/*/*.jpg",
  cacheControl: "private, max-age=31536000",
  createdBy: "d887cfda-6a62-4521-ae20-676ac4cb91b1",
  createdAt: "2023-02-14T07:49:36.390Z",
  modifiedBy: "d887cfda-6a62-4521-ae20-676ac4cb91b1",
  modifiedAt: "2023-02-14T07:49:36.390Z",
});

const mockedRepo = {
  find: (): Promise<Array<ObjectCachingRule>> => {
    return Promise.resolve([objectCachingRuleMock]);
  },
  save: (rule: ObjectCachingRule) => {
    return objectCachingRuleMock;
  },
};

const userMock: UserDTO = plainToInstance(UserDTO, {
    id: "60cc99bf-6351-40b7-af70-734fa6665559",
    firstName: "c",
    lastName: null,
    email: "c@gmail.com",
});

const mockedCorrectUserInfo = {
  getUserByEmail: (email) => {
    return userMock;
  },
  getUserById: (id) => {
    return userMock;
  },
  getUserId: (id) => {
    return "60cc99bf-6351-40b7-af70-734fa6665559";
  },
};

tap.test(
  "Object caching rule service - Create new caching rule",
  async (tap) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectCachingRuleService,
        {
          provide: getRepositoryToken(ObjectCachingRule),
          useValue: mockedRepo,
        },
        UserInfo,
        {
          provide: UserInfo,
          useValue: mockedCorrectUserInfo,
        },
      ],
    }).compile();
    const objectCachingRuleService = await module.get(ObjectCachingRuleService);
    const rule = await objectCachingRuleService.createObjectCachingRule(
      objectCachingRuleDTOMock, '{"id": "60cc99bf-6351-40b7-af70-734fa6665559"}');
    tap.equal(rule.id, "2186eab8-4060-4089-8090-ba9ec2752da4");
  }
);

tap.test("Object caching rule service - Get All", async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
        ObjectCachingRuleService,
        {
          provide: getRepositoryToken(ObjectCachingRule),
          useValue: mockedRepo,
        },
        UserInfo,
        {
          provide: UserInfo,
          useValue: mockedCorrectUserInfo,
        },
    ],
  }).compile();

  const objectCachingRuleService = await module.get(ObjectCachingRuleService);
  const rules = await objectCachingRuleService.getObjectCachingRules();
  tap.equal(rules.length, 1);
});

