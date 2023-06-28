import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import tap from "tap";
import { plainToClass } from "class-transformer";
import { UserInfo } from "../../utils/UserInfo";
import { ProtocolCategory } from "../../entities/protocol-category.entity";
import { CreateLookUpDataDTO } from "../../dto/create-lookup-data.dto";
import { ProtocolCategoryService } from "./protocol-category-service.service";


  const protocolCategoryMock = plainToClass(ProtocolCategory, {
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

  const createProtocolCategoryMock = plainToClass(CreateLookUpDataDTO, {
    code: "Test",
    label: "Test",
    description: null,
  });

const mockedRepoForCreate = {
  save: (protocolCategory: any) => {
    return protocolCategoryMock;
  }
};

const mockedRepoForGetAll = {
  findAndCount: () => {
    return [[protocolCategoryMock],1];
  },
};

const mockedUSerInfo = {
getUserId :(userProfile) => {return "98160914-f915-11ec-9674-5d27ec1cd471"}}

tap.test("protocol Category Service - GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
    ProtocolCategoryService,
      {
        provide: getRepositoryToken(ProtocolCategory),
        useValue: mockedRepoForGetAll,
      },
      UserInfo,
      {
        provide:UserInfo,
        useValue:mockedUSerInfo
      }
    ],
  }).compile();

  const protocolCategoryService = await module.get(ProtocolCategoryService);
  const protocolCategories = await protocolCategoryService.getAll({page:1,size:1});
  t.equal(protocolCategories.content.length, 1);
});


  tap.test("protocol Category Service - create", async (t) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      ProtocolCategoryService,
        {
          provide: getRepositoryToken(ProtocolCategory),
          useValue: mockedRepoForCreate,
        },
        UserInfo,
        {
          provide:UserInfo,
          useValue:mockedUSerInfo
        }
      ],
    }).compile();
  
    const protocolCategoryService = await module.get(ProtocolCategoryService);
    const protocolCategory = await protocolCategoryService.addProtocolCategory(createProtocolCategoryMock,"id:07058040-6ee9-4e94-b7b8-42f73bc59276");
    t.equal(protocolCategory.code,"Test");
  });

  
//  