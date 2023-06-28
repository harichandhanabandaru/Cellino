import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import tap from "tap";
import { plainToInstance } from "class-transformer";
import { ProtocolDefinition } from "../../entities/protocol-definition.entity";
import { ProtocolDefinitionService } from "./protocol-definition.service";
import { Instrument } from "../../entities/instrument.entity";
import { UserInfo } from "../../utils/UserInfo";
import { CreateProtocolDefinitionDTO } from "../../dto/create-protocol-defintiion.dto";
import { ProtocolType } from "../../entities/protocol-type.entity";
import { GetProtocolDefinitionsQuery } from "../../dto/get-protocol-definition-query.dto";
import { ProtocolCategory } from "../../entities/protocol-category.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

const protocolDefinitionMock = plainToInstance(ProtocolDefinition, {
  id: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  name: "testProtocolDefinition",
  parameters: null,
  instrument: null,
  protocolType: null,
  isActive: true,
});

const protocolDefinitionsMock: ProtocolDefinition[] = plainToInstance(
  ProtocolDefinition,
  [
    {
      id: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
      name: "testProtocolDefinition",
      parameters: null,
      instrument: null,
      protocolType: null,
      isActive: true,
    },
  ]
);

const createProtocolDefinitionMock: CreateProtocolDefinitionDTO =
  plainToInstance(CreateProtocolDefinitionDTO, {
    name: "test",
    parameters: {},
    protocolType: null,
    relatedId: "0712b029-1dde-4fc4-9df2-22ad681feeee",
  });
// const protocolDefinitionDTOMock = plainToInstance(ProtocolDefinitionDTO, {
//     id: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
//     name: "testProtocolDefinition",
//     parameters: null,
//     relatedId: "0712b029-1dde-4fc4-9df2-22ad681feeee",
//     protocolType: null,
//     isActive: true,
//   });

const instrumentMock = plainToInstance(Instrument, {
  id: "0712b029-1dde-4fc4-9df2-22ad681feeee",
  name: "testInstrument",
  manufacturer: null,
  manufacturerPartNumber: null,
  vendor: null,
  vendorPartNumber: null,
  attributes: null,
  isActive: true,
});

const protocolTypeMock = plainToInstance(ProtocolType, {
  id: "0712b029-1dde-4fc4-9df2-22ad681feeee",
  name: "INSTRUMENT",
  label: null,
  description: null,
  createdAt: null,
  createdBy: null,
  modifiedAt: null,
  modifiedBy: null,
  isActive: true,
});

const mockedRepoForCreate = {
  save: (protocolDefinition: any) => {
    return protocolDefinitionMock;
  },
};

const mockedRepoForUpdate = {
  findOne: (id: any): Promise<ProtocolDefinition> => {
    return Promise.resolve(protocolDefinitionMock);
  },
  save: (protocolDefinition: any) => {
    return protocolDefinitionMock;
  },
};

const mockedRepoForGetAll = {
  findAndCount: () => {
    return [protocolDefinitionsMock, 1];
  },
  createQueryBuilder: (data: any) => {
    return {
      select: (data: any) => {
        return {
          limit: (limit: any) => {},
          offset: (offset: any) => {},
          getRawMany: () => [protocolDefinitionMock],
          getCount: () => 1,
        };
      },
    };
  },
};

const mockedInstrumentRepoForGet = {
  findOne: (): Promise<Instrument> => {
    return Promise.resolve(instrumentMock);
  },
};

const mockedPlateTypeRepoForGet = {
  findOne: (): Promise<ProtocolType> => {
    return Promise.resolve(protocolTypeMock);
  },
};

const mockedUSerInfo = {
  getUserId: (userProfile) => {
    return "98160914-f915-11ec-9674-5d27ec1cd471";
  },
};

const mockedProtocolCategory = {
  getUserId: (userProfile) => {
    return "98160914-f915-11ec-9674-5d27ec1cd471";
  },
};
const protocolDefinitionMockedRepo = {
  findOneOrFail: (_id: any) => {
    return protocolDefinitionMock;
  },
};
tap.test("protocol definition Service - GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProtocolDefinitionService,
      {
        provide: getRepositoryToken(ProtocolDefinition),
        useValue: mockedRepoForGetAll,
      },
      {
        provide: getRepositoryToken(ProtocolType),
        useValue: mockedPlateTypeRepoForGet,
      },
      {
        provide: getRepositoryToken(Instrument),
        useValue: mockedInstrumentRepoForGet,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
      {
        provide: getRepositoryToken(ProtocolCategory),
        useValue: {},
      },
    ],
  }).compile();

  const protocolDefinitionService = await module.get(ProtocolDefinitionService);
  const protocolDefinitions = await protocolDefinitionService.getAll(
    plainToInstance(GetProtocolDefinitionsQuery, {
      size: 10,
      page: 1,
      type: null,
      category: null,
    })
  );
  t.equal(protocolDefinitions.content.length, 1);
});

// tap.test("protocol definition Service - patch", async (t) => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [
//       ProtocolDefinitionService,
//       {
//         provide: getRepositoryToken(ProtocolDefinition),
//         useValue: mockedRepoForUpdate,
//       },
//       {
//         provide: getRepositoryToken(ProtocolType),
//         useValue: mockedPlateTypeRepoForGet,
//       },
//       {
//         provide: getRepositoryToken(Instrument),
//         useValue: mockedInstrumentRepoForGet,
//       },
//       UserInfo,
//       {
//         provide: UserInfo,
//         useValue: mockedUSerInfo,
//       },
//       {
//         provide: getRepositoryToken(ProtocolCategory),
//         useValue: {},
//       },
//     ],
//   }).compile();

//   const protocolDefinitionService = await module.get(ProtocolDefinitionService);
//   const protocolDefinition = await protocolDefinitionService.update(
//     "98160914-f915-11ec-9674-5d27ec1cd471",
//     [{ op: "replace", path: "/name", value: "test" }],
//     "id:07058040-6ee9-4e94-b7b8-42f73bc59276"
//   );
//   t.equal(protocolDefinition.name, "test");
// });

tap.test("protocol definition Service - create", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProtocolDefinitionService,
      {
        provide: getRepositoryToken(ProtocolDefinition),
        useValue: mockedRepoForCreate,
      },
      {
        provide: getRepositoryToken(ProtocolType),
        useValue: mockedPlateTypeRepoForGet,
      },
      {
        provide: getRepositoryToken(Instrument),
        useValue: mockedInstrumentRepoForGet,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
      {
        provide: getRepositoryToken(ProtocolCategory),
        useValue: {
          findOne: (id: any) => {
            return { id: "" };
          },
        },
      },
    ],
  }).compile();

  const protocolDefinitionService = await module.get(ProtocolDefinitionService);
  const protocolDefinition =
    await protocolDefinitionService.addProtocolDefinition(
      createProtocolDefinitionMock,
      "id:07058040-6ee9-4e94-b7b8-42f73bc59276"
    );
  t.equal(protocolDefinition.name, "test");
});

tap.test("Protocol definition Service - GetByID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProtocolDefinitionService,
      {
        provide: getRepositoryToken(ProtocolDefinition),
        useValue: protocolDefinitionMockedRepo,
      },
      {
        provide: getRepositoryToken(ProtocolType),
        useValue: mockedPlateTypeRepoForGet,
      },
      {
        provide: getRepositoryToken(Instrument),
        useValue: mockedInstrumentRepoForGet,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
      {
        provide: getRepositoryToken(ProtocolCategory),
        useValue: {},
      },
    ],
  }).compile();

  const protcolDefinitionService = await module.get(ProtocolDefinitionService);
  const protocolDefinition = await protcolDefinitionService.getById(
    "07058040-6ee9-4e94-b7b8-42f73bc59276"
  );
  t.equal(protocolDefinition.id, "0712b029-1dde-4fc4-9df2-22ad681fce6a");
});

tap.test("Protocol definition - GetByID - NotFoundException", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProtocolDefinitionService,
      {
        provide: getRepositoryToken(ProtocolDefinition),
        useValue: {
          findOneOrFail: () => {
            throw new Error();
          },
        },
      },
      {
        provide: getRepositoryToken(ProtocolType),
        useValue: mockedPlateTypeRepoForGet,
      },
      {
        provide: getRepositoryToken(Instrument),
        useValue: mockedInstrumentRepoForGet,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
      {
        provide: getRepositoryToken(ProtocolCategory),
        useValue: {},
      },
    ],
  }).compile();

  const protocolDefinitionService = await module.get(ProtocolDefinitionService);

  t.rejects(
    protocolDefinitionService.getById("0712b029-1dde-4fc4-9df2-22ad681fce6a"),
    NotFoundException
  );
});
