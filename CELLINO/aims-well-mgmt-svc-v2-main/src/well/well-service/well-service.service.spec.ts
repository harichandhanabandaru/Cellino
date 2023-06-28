import { Test, TestingModule } from "@nestjs/testing";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { Well } from "../../entities/well.entity";
import tap from "tap";
import { WellService } from "./well-service.service";
import { ImageEvent } from "../../entities/image-event.entity";
import { UserInfo } from "../../utils/user-info";
import { HttpService } from "@nestjs/axios";
import { plainToInstance } from "class-transformer";
import { CreateWellRequestDTO } from "../../dto/create-well-request.dto";
import { UserDTO } from "../../dto/user.dto";
import { DataSource } from "typeorm";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Provider,
} from "@nestjs/common";
import { ImageSetting } from "../../entities/image-setting.entity";
import { ProcessStatus } from "../../enums/process-status";

const mockRepo = {
  find: () => mockData,
  findOne: (_id: any) => mockData[0],
  save: (data: any) => saveMock,
};

const mockRepoWithIncorrectDetails = {
  find: () => mockData,
  findOne: (_id: any) => mockData[0],
  save: (data: any) => null,
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
    return "0712b029-1dde-4fc4-9df2-22ad681fce6a";
  },
};

const mockedInCorrectUserInfo = {
  getUserByEmail: (email) => {
    return null;
  },
  getUserById: (id) => {
    return null;
  },
  getUserId: (id) => {
    return "0712b029-1dde-4fc4-9df2-22ad681fce6a";
  },
};

const saveMock = plainToInstance(Well, {
  id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
  processStatus: ProcessStatus.RETIRED,
});

const mockData = [
  {
    id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    name: "WELL 1",
    processStatus: ProcessStatus.IMAGING,
    reviewers: ["ABCD"],
  },
];

const createQueryBuilderMock = {
  select: () => createQueryBuilderMock,
  innerJoin: () => createQueryBuilderMock,
  distinct: () => createQueryBuilderMock,
  addSelect: () => createQueryBuilderMock,
  groupBy: () => createQueryBuilderMock,
  where: () => createQueryBuilderMock,
  andWhere: () => createQueryBuilderMock,
  addFrom: () => createQueryBuilderMock,
  leftJoin: () => createQueryBuilderMock,
  addGroupBy: () => createQueryBuilderMock,
  orderBy: () => createQueryBuilderMock,
  limit: () => createQueryBuilderMock,
  getQuery: () => "RANDOM QUERY",
  getRawOne: () => mockData[0],
  getRawMany: () => mockData,
};

const createQueryBuilderEmptyMock = {
  select: () => createQueryBuilderEmptyMock,
  innerJoin: () => createQueryBuilderEmptyMock,
  distinct: () => createQueryBuilderEmptyMock,
  addSelect: () => createQueryBuilderEmptyMock,
  groupBy: () => createQueryBuilderEmptyMock,
  where: () => createQueryBuilderEmptyMock,
  andWhere: () => createQueryBuilderEmptyMock,
  addFrom: () => createQueryBuilderEmptyMock,
  leftJoin: () => createQueryBuilderEmptyMock,
  addGroupBy: () => createQueryBuilderEmptyMock,
  getQuery: () => "RANDOM QUERY",
  getRawMany: () => [],
};

const providers: Provider[] = [
  WellService,
  {
    provide: getRepositoryToken(Well),
    useValue: { ...mockRepo, createQueryBuilder: () => createQueryBuilderMock },
  },
  {
    provide: getRepositoryToken(ImageSetting),
    useValue: { ...mockRepo, createQueryBuilder: () => createQueryBuilderMock },
  },
  {
    provide: getRepositoryToken(ImageEvent),
    useValue: {
      ...mockRepo,
      createQueryBuilder: () => createQueryBuilderMock,
    },
  },
  {
    provide: HttpService,
    useValue: {
      axiosRef: {
        get: (url: string) => {
          if (url.includes("plates")) {
            return {
              data: {
                runId: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
              },
            };
          } else if (url.includes("run-metrics")) {
            return {
              data: [
                {
                  activeWellsCount: 0,
                },
              ],
            };
          } else {
            return {};
          }
        },
        patch: (url: string) => {
          return {
            data: {},
          };
        },
      },
    },
  },
  DataSource,
  {
    provide: getDataSourceToken(),
    useValue: {
      createQueryBuilder: () => createQueryBuilderMock,
    },
  },
  UserInfo,
  {
    provide: UserInfo,
    useValue: mockedCorrectUserInfo,
  },
];

const providersWithIncorrectData: Provider[] = [
  WellService,
  {
    provide: getRepositoryToken(Well),
    useValue: {
      ...mockRepoWithIncorrectDetails,
      createQueryBuilder: () => createQueryBuilderMock,
    },
  },
  {
    provide: getRepositoryToken(ImageEvent),
    useValue: {
      ...mockRepo,
      createQueryBuilder: () => createQueryBuilderMock,
    },
  },
  {
    provide: HttpService,
    useValue: {},
  },
  DataSource,
  {
    provide: getDataSourceToken(),
    useValue: {
      createQueryBuilder: () => createQueryBuilderMock,
    },
  },
  UserInfo,
  {
    provide: UserInfo,
    useValue: mockedInCorrectUserInfo,
  },
];

const createWellRequest = plainToInstance(CreateWellRequestDTO, {
  position: "B2",
  plate: {
    barcode: "000342",
  },
});

const createWellRequestWithDifferentValues = plainToInstance(
  CreateWellRequestDTO,
  {
    position: "B2",
    plate: {
      id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    },
  }
);

tap.test("Get all", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  const service = await module.get(WellService);
  const data = await service.getAllWells(
    "2cfc0774-f78e-11ec-9674-5d27ec1cd234"
  );
  t.equal(data[0].id, "2cfc0774-f78e-11ec-9674-5d27ec1cd234");
});

tap.test("Get all with only active wells", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  const service = await module.get(WellService);
  const data = await service.getAllWells(
    "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    true
  );
  t.equal(data[0].id, "2cfc0774-f78e-11ec-9674-5d27ec1cd234");
});

tap.test("Get all with no active wells", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...providers,
      {
        provide: getDataSourceToken(),
        useValue: {
          createQueryBuilder: () => createQueryBuilderEmptyMock,
        },
      },
    ],
  }).compile();

  const service = await module.get(WellService);
  try {
    await service.getAllWells("2cfc0774-f78e-11ec-9674-5d27ec1cd234", true);
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("GetById", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  const service = await module.get(WellService);
  const data = await service.getById("2cfc0774-f78e-11ec-9674-5d27ec1cd234");
  t.equal(data.id, "2cfc0774-f78e-11ec-9674-5d27ec1cd234");
});

tap.test("GetById - Bad Request Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  const service = await module.get(WellService);
  try {
    await service.getById("2cfc0774");
    t.fail();
  } catch (err) {
    t.pass();
  }
});

tap.test("GetById - Bad Request Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...providers,
      {
        provide: getRepositoryToken(Well),
        useValue: { findOne: () => undefined },
      },
    ],
  }).compile();

  const service = await module.get(WellService);
  try {
    await service.getById("2cfc0774-f78e-11ec-9674-5d27ec1cd234");
    t.fail();
  } catch (err) {
    t.pass();
  }
});

tap.test("Create Well failure", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();
  const service = await module.get(WellService);
  try {
    await service.addWell(
      createWellRequest,
      {
        id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
      }.toString()
    );
    t.fail();
  } catch (err) {
    t.pass();
  }
});

tap.test("Create Well failure", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providersWithIncorrectData,
  }).compile();

  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve({
            content: [
              {
                id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
                name: "test",
              },
            ],
          });
        },
      });
    });
  };
  const service = await module.get(WellService);
  try {
    await service.addWell(
      createWellRequest,
      {
        id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
      }.toString()
    );
    t.fail();
  } catch (err) {
    t.pass();
  }
});

tap.test("Create Well", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve({
            content: [
              {
                id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
                name: "test",
              },
            ],
          });
        },
      });
    });
  };
  const service = await module.get(WellService);
  const response = await service.addWell(
    createWellRequest,
    '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
  );
  t.equal(response.id, "2cfc0774-f78e-11ec-9674-5d27ec1cd234");
});

tap.test("Create Well with different values", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve({
            id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
            name: "test",
          });
        },
      });
    });
  };
  const service = await module.get(WellService);
  const response = await service.addWell(
    createWellRequestWithDifferentValues,
    '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
  );
  t.equal(response.id, "2cfc0774-f78e-11ec-9674-5d27ec1cd234");
});

tap.test("Create Well - Plate Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: false,
        status: 404,
        json: () => {
          return Promise.resolve({
            content: [],
          });
        },
      });
    });
  };
  const service = await module.get(WellService);
  try {
    await service.addWell(
      createWellRequest,
      '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Build Well with Timeseries and ImageEvent data", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  const service = await module.get(WellService);
  const well = await service.buildWellWithTimeSeriesAndImageEventData(
    plainToInstance(Well, { id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234" })
  );
  t.equal(well.id, "2cfc0774-f78e-11ec-9674-5d27ec1cd234");
});

tap.test("Update", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  const service = await module.get(WellService);
  const well = await service.update(
    "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    [
      { op: "replace", value: "WELL 1", path: "/name" },
      { op: "replace", value: "KEEP", path: "/status" },
      { op: "replace", value: "DROPPED", path: "/processStatus" },
    ],
    '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
  );

  t.equal(well.name, "WELL 1");
});

tap.test("Update - different process status", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...providers,
      {
        provide: getRepositoryToken(Well),
        useValue: {
          find: () => mockData,
          findOne: (_id: any) => ({
            ...mockData[0],
            processStatus: ProcessStatus.RETIRED,
          }),
          save: (data: any) => ({
            ...saveMock,
            processStatus: ProcessStatus.IMAGING,
          }),
        },
      },
    ],
  }).compile();

  const service = await module.get(WellService);
  const well = await service.update(
    "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    [
      { op: "replace", value: "WELL 1", path: "/name" },
      { op: "replace", value: "KEEP", path: "/status" },
      { op: "replace", value: "DROPPED", path: "/processStatus" },
    ],
    '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
  );

  t.equal(well.name, "WELL 1");
});

tap.test("Update - Bad ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: providers,
  }).compile();

  const service = await module.get(WellService);
  t.rejects(
    service.update(
      "2cfc0774",
      [{ op: "replace", value: "TEST", path: "/name" }],
      '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
    ),
    BadRequestException
  );
});

tap.test("Update - Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...providers,
      {
        provide: getRepositoryToken(Well),
        useValue: { findOne: () => undefined },
      },
    ],
  }).compile();

  const service = await module.get(WellService);
  t.rejects(
    service.update(
      "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
      [{ op: "replace", value: "TEST", path: "/name" }],
      '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
    ),
    NotFoundException
  );
});

tap.test("Update - Unable to update Run Metric Error", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...providers,
      {
        provide: HttpService,
        useValue: {
          axiosRef: {
            get: () => {
              throw new Error();
            },
            patch: () => {
              throw new Error();
            },
          },
        },
      },
    ],
  }).compile();

  const service = await module.get(WellService);

  t.rejects(
    service.update(
      "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
      [
        { op: "replace", value: "TEST", path: "/name" },
        { op: "replace", value: "DROPPED", path: "/processStatus" },
      ],
      '{"id":"2cfc0774-f78e-11ec-9674-5d27ec1cd234"}'
    ),
    InternalServerErrorException
  );
});

tap.test("get wells V2", async (t) => {
  {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...providers,
        {
          provide: getRepositoryToken(Well),
          useValue: {
            find: () => mockData,
          },
        },
      ],
    }).compile();

    const service = await module.get(WellService);
    const data = await service.getAllWellsV2({
      plateId: "1",
      wellPosition: "B4",
      status: "KEEP",
    });
    t.equal(data?.[0]?.id, "2cfc0774-f78e-11ec-9674-5d27ec1cd234");
  }
});
