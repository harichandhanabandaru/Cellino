import { plainToClass, plainToInstance } from "class-transformer";
import tap from "tap";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Colony } from "../../entities/colony.entity";
import { ClusterOrColonyType } from "../../enums/cluster-or-colony-type";
import { ClusterOrColonyQuality } from "../../enums/cluster-or-colony-quality";
import { ColonyDTO } from "../../dto/colony.dto";
import { ColonyService } from "./colony-service.service";
import { CreateColonyRequestDTO } from "../../dto/colony-request.dto";
import { Well } from "../../entities/well.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { UserInfo } from "../../utils/user-info";
import { UserDTO } from "../../dto/user.dto";
import { Cluster } from "../../entities/cluster.entity";

const colonyMock: Colony[] = plainToInstance(Colony, [
  {
    createdBy: null,
    createdAt: "2022-07-01T02:42:48.281Z",
    modifiedBy: null,
    modifiedAt: null,
    isActive: true,
    outline: { color: "#123423" },
    id: "98160914-f915-11ec-9674-5d27ec1cd471",
    name: "test",
    type: ClusterOrColonyType.MANUAL,
    metadata: null,
    colonyQuality: ClusterOrColonyQuality.UNKNOWN,
    well: {
      id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    },
    imageAnalysisRequest: {
      id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    },
  },
]);

const colonyDtoMock: CreateColonyRequestDTO = plainToInstance(ColonyDTO, {
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  name: "test",
  type: null,
  isSelected: true,
  colonyQuality: null,
  wellId: "18160914-f915-11ec-9674-5d27ec1cd471",
  well: null,
  imageAnalysisRequest: null,
  createdBy: null,
  createdAt: null,
  modifiedBy: null,
  modifiedAt: null,
  isActive: true,
});

const wellMock: Well = plainToInstance(Well, {
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  name: "cluster",
});

const imageAnalysisRequestMock: ImageAnalysisRequest = plainToInstance(
  ImageAnalysisRequest,
  {
    id: "98160914-f915-11ec-9674-5d27ec1cd471",
  }
);

const createQueryBuilderMock = {
  innerJoinAndSelect: () => createQueryBuilderMock,
  select: () => createQueryBuilderMock,
  distinct: () => createQueryBuilderMock,
  where: () => createQueryBuilderMock,
  andWhere: () => createQueryBuilderMock,
  update: () => createQueryBuilderMock,
  set: (_obj) => {
    _obj["outline"]();
    return createQueryBuilderMock;
  },
  getRawMany: () => colonyMock,
  execute: () => colonyMock,
};

const createQueryBuilderEmptyMock = {
  innerJoinAndSelect: () => createQueryBuilderEmptyMock,
  select: () => createQueryBuilderEmptyMock,
  distinct: () => createQueryBuilderEmptyMock,
  andWhere: () => createQueryBuilderEmptyMock,
  getRawMany: () => undefined,
};

const mockedUpdateRepo = {
  find: (id: any) => {
    return colonyMock;
  },
  findOne: (id: any) => {
    return colonyMock[0];
  },
  save: (colony: any) => {
    return colony;
  },
  createQueryBuilder: () => createQueryBuilderMock,
};

const mockedUpdateEmptyRepo = {
  find: (id: any) => {
    return colonyMock;
  },
  findOne: (id: any) => {
    return colonyMock[0];
  },
  save: (colony: any) => {
    return colony;
  },
  createQueryBuilder: () => createQueryBuilderEmptyMock,
};

const mockedWellRepo = {
  findOne: (id) => {
    return wellMock;
  },
};

const mockedImageAnalysisRequestRepo = {
  findOne: (id) => {
    return imageAnalysisRequestMock;
  },
};

const userMock: UserDTO = plainToClass(UserDTO, {
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  firstName: "test",
  lastName: "test",
  email: "test@cellinobio.com",
});

const mockedUserInfo = {
  getUserByEmail: (email) => {
    return userMock;
  },
  getUserId: (user_info) => {
    return "98160914-f915-11ec-9674-5d27ec1cd471";
  },
};

tap.test("Get Colonies by Image Event ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ColonyService,
      {
        provide: getRepositoryToken(Colony),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedImageAnalysisRequestRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ColonyService);
  const colonies = await service.getColonies(
    "98160914-f915-11ec-9674-5d27ec1cd471"
  );
  t.equal(colonies[0].id, "98160914-f915-11ec-9674-5d27ec1cd471");
});

tap.test("Get Colonies by Image Event ID - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ColonyService,
      {
        provide: getRepositoryToken(Colony),
        useValue: mockedUpdateEmptyRepo,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateEmptyRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedImageAnalysisRequestRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ColonyService);
  try {
    await service.getColonies("98160914-f915-11ec-9674-5d27ec1cd471");
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Update Colony by ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ColonyService,
      {
        provide: getRepositoryToken(Colony),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedImageAnalysisRequestRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ColonyService);
  const colony = await service.updateByPatch(
    "98160914-f915-11ec-9674-5d27ec1cd471",
    [
      { op: "replace", value: "test", path: "/name" },
      { op: "replace", value: "MANUAL", path: "/type" },
      { op: "replace", value: "POOR", path: "/quality" },
      { op: "replace", value: "#AFF", path: "/outline/color" },
    ],
    '{"id":"07058040-6ee9-4e94-b7b8-42f73bc59276"}'
  );
  t.equal(colony.name, "test");
  t.equal(colony.type, "MANUAL");
  t.equal(colony.quality, "POOR");
});

tap.test("Update Colony by ID - Not found exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ColonyService,
      {
        provide: getRepositoryToken(Colony),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedImageAnalysisRequestRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ColonyService);
  try {
    await service.updateByPatch(
      "98160914-f915-11ec-9674-5d27ec1cd471",
      [{ op: "replace", value: "test", path: "/name" }],
      '{"id":"07058040-6ee9-4e94-b7b8-42f73bc59276"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Create Colony", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ColonyService,
      {
        provide: getRepositoryToken(Colony),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedImageAnalysisRequestRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ColonyService);
  const colony = await service.addColony(
    colonyDtoMock,
    '{"id":"07058040-6ee9-4e94-b7b8-42f73bc59276"}'
  );
  t.equal(colony.name, "test");
});

tap.test("Create Colony - Invalid Well ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ColonyService,
      {
        provide: getRepositoryToken(Colony),
        useValue: {
          save: () => {
            throw new Error();
          },
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedImageAnalysisRequestRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ColonyService);
  try {
    await service.addColony(
      colonyDtoMock,
      '{"id":"07058040-6ee9-4e94-b7b8-42f73bc59276"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Create Colony - Exception while saving", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ColonyService,
      {
        provide: getRepositoryToken(Colony),
        useValue: {
          save: () => {
            throw new Error();
          },
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedImageAnalysisRequestRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ColonyService);
  try {
    await service.addColony(
      colonyDtoMock,
      '{"id":"07058040-6ee9-4e94-b7b8-42f73bc59276"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});
