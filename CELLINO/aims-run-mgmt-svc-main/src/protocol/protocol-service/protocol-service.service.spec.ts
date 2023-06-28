import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ProtocolContentDTO } from "../../dto/protocol-content.dto";
import tap from "tap";
import { Protocol } from "../../entities/protocol.entity";
import { ProtocolService } from "./protocol-service.service";
import { UserInfo } from "../../utils/UserInfo";
import { ProtocolDefinition } from "../../entities/protocol-definition.entity";
import { CreateProtocolRequestDTO } from "../../dto/create-protocol-request.dto";
import { GetProtocolsQuery } from "../../dto/get-protocol-query.dto";
import { ProtocolDTO } from "../../dto/protocol.dto";

const protocol = plainToInstance(Protocol, {
  id: "aa6fd36d-f78d-11ec-9674-5d27ec1cd472",
  name: "test",
});

const protocolRequest = plainToInstance(CreateProtocolRequestDTO, {
  name: "test",
  settings: {},
  protocolDefintionId: "aa6fd36d-f78d-11ec-9674-5d27ec1ddddd",
});

const protocolDefinition = plainToInstance(ProtocolDefinition, {
  id: "aa6fd36d-f78d-11ec-9674-5d27ec1ccccc",
  name: "test",
});

const getProtocolsQuery = plainToInstance(GetProtocolsQuery, {
  phaseId: "aa6fd36d-f78d-11ec-9674-5d27ec1ccccc",
  precedingProtocolId: "aa6fd36d-f78d-11ec-9674-5d27ec1ccccc",
  protocolDefinitionId: "aa6fd36d-f78d-11ec-9674-5d27ec1ccccc",
  name: "Zarr Multiscaling",
});

const mockedUSerInfo = {
  getUserId: (userProfile) => {
    return "98160914-f915-11ec-9674-5d27ec1cd471";
  },
};
const setup = async (): Promise<[TestingModule, ProtocolService]> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProtocolService,
      {
        provide: getRepositoryToken(Protocol),
        useValue: {
          findOne: () => protocol,
          find: () => [protocol],
          save: () => protocol,
          findAndCount: () => {
            return [[protocol], 1];
          },
          createQueryBuilder: (data: any) => {
            return {
              select: (data: any) => {
                return {
                  where: (data: any) => {
                    return {
                      getCount: () => {
                        return 0;
                      },
                    };
                  },
                };
              },
            };
          },
        },
      },
      {
        provide: getRepositoryToken(ProtocolDefinition),
        useValue: {
          findOne: () => protocolDefinition,
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  const protocolService = await module.get(ProtocolService);
  return Promise.resolve([module, protocolService]);
};

tap.test("Protocol Service - GetAll", async (t) => {
  const [_, protocolService] = await setup();
  const protocols: ProtocolDTO = await protocolService.getAll(
    getProtocolsQuery
  );
  t.equal(protocols.content.length, 1);
});

// tap.test("Protocol Service - Update", async (t) => {
//   const [_, protocolService] = await setup();
//   const protocolDto: ProtocolContentDTO = await protocolService.updateByPatch(
//     "aa6fd36d-f78d-11ec-9674-5d27ec1cd472",
//     [{ op: "replace", path: "/name", value: "test" }],
//     "id:07058040-6ee9-4e94-b7b8-42f73bc59276"
//   );
//   t.equal(protocol.name, "test");
// });

tap.test("Protocol Service - Create", async (t) => {
  const [_, protocolService] = await setup();
  const protocolDto: ProtocolContentDTO = await protocolService.addProtocol(
    protocolRequest,
    "id:07058040-6ee9-4e94-b7b8-42f73bc59276"
  );
  t.equal(protocolDto.name, "test");
});

tap.test("Protocol Service - GetById", async (t) => {
  const [_, protocolService] = await setup();
  const _protocol: Protocol = await protocolService.getById(
    "aa6fd36d-f78d-11ec-9674-5d27ec1cd472"
  );
  t.equal(_protocol.id, "aa6fd36d-f78d-11ec-9674-5d27ec1cd472");
});

tap.test("Protocol Service - GetById - BadRequestException", async (t) => {
  const [_, protocolService] = await setup();
  try {
    await protocolService.getById("ABC");
    t.fail();
  } catch (e) {
    t.type(e, BadRequestException);
  }
});

tap.test("Protocol Service - GetById - NotFoundException", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProtocolService,
      {
        provide: getRepositoryToken(Protocol),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(ProtocolDefinition),
        useValue: {
          findOne: () => protocolDefinition,
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  const protocolService = await module.get(ProtocolService);
  try {
    await protocolService.getById("aa6fd36d-f78d-11ec-9674-5d27ec1cd472");
    t.fail();
  } catch (e) {
    t.type(e, NotFoundException);
  }
});
