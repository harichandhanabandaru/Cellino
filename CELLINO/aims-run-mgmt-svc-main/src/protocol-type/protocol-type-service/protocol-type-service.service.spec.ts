import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import tap from "tap";
import { plainToClass } from "class-transformer";
import { UserInfo } from "../../utils/UserInfo";
import { ProtocolType } from "../../entities/protocol-type.entity";
import { ProtocolTypeService } from "./protocol-type-service.service";
import { CreateLookUpDataDTO } from "../../dto/create-lookup-data.dto";


  const protocolTypeMock = plainToClass(ProtocolType, {
    id: "0712b029-1dde-4fc4-9df2-22ad681feeee",
    code: "Test",
    label: "Test",
    description: null,
    createdAt: '2022-06-29T03:57:16.297Z',
    createdBy: '98160914-f915-11ec-9674-5d27ec1cd471',
    modifiedAt:'2022-06-29T03:57:16.297Z',
    modifiedBy:'98160914-f915-11ec-9674-5d27ec1cd471',
    isActive:true
  });

  const createProtocolTypeMock = plainToClass(CreateLookUpDataDTO, {
    code: "Test",
    label: "Test",
    description: null,
  });

const mockedRepoForCreate = {
  save: (protocolType: any) => {
    return protocolTypeMock;
  }
};

const mockedRepoForGetAll = {
  findAndCount: () => {
    return [[protocolTypeMock],1];
  },
};

const mockedUSerInfo = {
getUserId :(userProfile) => {return "98160914-f915-11ec-9674-5d27ec1cd471"}}

tap.test("protocol Type Service - GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
    ProtocolTypeService,
      {
        provide: getRepositoryToken(ProtocolType),
        useValue: mockedRepoForGetAll,
      },
      UserInfo,
      {
        provide:UserInfo,
        useValue:mockedUSerInfo
      }
    ],
  }).compile();

  const protocolTypeService = await module.get(ProtocolTypeService);
  const protocolTypes = await protocolTypeService.getAll({page:1,size:1});
  t.equal(protocolTypes.content.length, 1);
});


  tap.test("protocol Type Service - create", async (t) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      ProtocolTypeService,
        {
          provide: getRepositoryToken(ProtocolType),
          useValue: mockedRepoForCreate,
        },
        UserInfo,
        {
          provide:UserInfo,
          useValue:mockedUSerInfo
        }
      ],
    }).compile();
  
    const protocolTypeService = await module.get(ProtocolTypeService);
    const protocolType = await protocolTypeService.addProtocolType(createProtocolTypeMock,"id:07058040-6ee9-4e94-b7b8-42f73bc59276");
    t.equal(protocolType.code,"Test");
  });

  
//  