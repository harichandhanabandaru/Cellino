import { plainToClass, plainToInstance } from "class-transformer";
import tap from "tap";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserDTO } from "../../dto/user.dto";
import { UserInfo } from "../../utils/user-info";
import { ClusterAttribute } from "../../entities/cluster-attribute.entity";
import { ClusterAttributeService } from "./cluster-attribute-service.service";
import { CreateClusterAttributeRequestDTO } from "../../dto/create-cluster-attribute-request.dto";
import { ClusterAttributeDTO } from "../../dto/cluster-attribute.dto";
import { Well } from "../../entities/well.entity";
import { Cluster } from "../../entities/cluster.entity";
import { PaginationDTO } from "../../dto/pagination.dto";
import { GetClusterAttributesRequestDTO } from "../../dto/get-cluster-attribute-request.dto";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

const clusterAttributeMock: ClusterAttribute[] = plainToInstance(
  ClusterAttribute,
  [
    {
      source: "test",
      key: "test",
      value: "test1",
      createdBy: null,
      createdAt: "2022-07-01T02:42:48.281Z",
      modifiedBy: null,
      modifiedAt: "2022-07-01T02:42:48.281Z",
      cluster: {
        id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
      },
      well: {
        id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
      },
    },
  ]
);

const clusterMock: Cluster = plainToInstance(Cluster, {
  id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
});

const wellMock: Well = plainToInstance(Well, {
  id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
});

const mockPaginatedDto: PaginationDTO = plainToInstance(PaginationDTO, {
  page: 1,
  size: 1,
});

const mockGetClusterAttributes: GetClusterAttributesRequestDTO =
  plainToInstance(GetClusterAttributesRequestDTO, {
    clusterArtifactId: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    wellId: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    paginationDTO: mockPaginatedDto,
  });

const mockGetClusterAttributesWithOnlyPage: GetClusterAttributesRequestDTO =
  plainToInstance(GetClusterAttributesRequestDTO, {
    paginationDTO: mockPaginatedDto,
  });

let clusterAttributeService: ClusterAttributeService;
const mockedRepo = {
  findAndCount: (clusterArtifactId: any, wellId: any) => {
    return [clusterAttributeMock, 1];
  },
};
const mockedClusterRepo = {
  findOneOrFail: (id: any) => {
    return clusterMock;
  },
};
const mockedWellRepo = {
  findOneOrFail: (id: any) => {
    return wellMock;
  },
};
const mockedRepoWithoutParams = {
  findAndCount: () => {
    return [clusterAttributeMock, 1];
  },
  save: (clusterAttribute: any) => {
    return clusterAttribute;
  },
};

const createClusterAttributeRequestMock: CreateClusterAttributeRequestDTO =
  plainToInstance(CreateClusterAttributeRequestDTO, {
    source: "test",
    key: "test",
    value: "test1",
    wellId: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    clusterArtifactId: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
  });

const userMock: UserDTO = plainToClass(UserDTO, {
  id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
  firstName: "test",
  lastName: "test",
  email: "email@cellinobio.com",
});

const mockedUSerInfo = {
  getUserByEmail: (email) => {
    return userMock;
  },
  getUserId: (userProfile) => {
    return "2cfc0774-f78e-11ec-9674-5d27ec1cd234";
  },
};

const clusterAttributeDtoMock: ClusterAttributeDTO[] = plainToInstance(
  ClusterAttributeDTO,
  [
    {
      id: "98160914-f915-11ec-9674-5d27ec1cd471",
      source: "test",
      key: "test",
      value: "test",
      clusterArtifactId: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
      wellId: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    },
  ]
);

tap.test("GetAll with Query Params", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClusterAttributeService,
      {
        provide: getRepositoryToken(ClusterAttribute),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  clusterAttributeService = await module.get(ClusterAttributeService);
  const clusterAttributes = await clusterAttributeService.getClusterAttributes(
    mockGetClusterAttributes
  );
  t.equal(clusterAttributes.content[0].key, "test");
});

tap.test("GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClusterAttributeService,
      {
        provide: getRepositoryToken(ClusterAttribute),
        useValue: mockedRepoWithoutParams,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  clusterAttributeService = await module.get(ClusterAttributeService);
  const clusterAttributes = await clusterAttributeService.getClusterAttributes(
    mockGetClusterAttributesWithOnlyPage
  );
  t.equal(clusterAttributes.content[0].key, "test");
});

tap.test("GetAll - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClusterAttributeService,
      {
        provide: getRepositoryToken(ClusterAttribute),
        useValue: {
          findAndCount: () => [undefined, 0],
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  clusterAttributeService = await module.get(ClusterAttributeService);
  t.rejects(
    clusterAttributeService.getClusterAttributes(
      mockGetClusterAttributesWithOnlyPage
    ),
    NotFoundException
  );
});

tap.test("Create", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClusterAttributeService,
      {
        provide: getRepositoryToken(ClusterAttribute),
        useValue: mockedRepoWithoutParams,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  clusterAttributeService = await module.get(ClusterAttributeService);
  const clusterAttributes = await clusterAttributeService.addClusterAttribute(
    createClusterAttributeRequestMock,
    ""
  );
  t.equal(clusterAttributes.key, "test");
});

tap.test("Create - Error while saving", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClusterAttributeService,
      {
        provide: getRepositoryToken(ClusterAttribute),
        useValue: () => {
          save: () => {
            throw new Error();
          };
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  clusterAttributeService = await module.get(ClusterAttributeService);
  t.rejects(
    clusterAttributeService.addClusterAttribute(
      createClusterAttributeRequestMock,
      ""
    ),
    InternalServerErrorException
  );
});

tap.test("Create - Cluster Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClusterAttributeService,
      {
        provide: getRepositoryToken(ClusterAttribute),
        useValue: mockedRepoWithoutParams,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: {
          findOneOrFail: () => {
            throw new Error();
          },
        },
      },
      {
        provide: getRepositoryToken(Well),
        useValue: mockedWellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  clusterAttributeService = await module.get(ClusterAttributeService);
  t.rejects(
    clusterAttributeService.addClusterAttribute(
      createClusterAttributeRequestMock,
      ""
    ),
    BadRequestException
  );
});

tap.test("Create - Well Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ClusterAttributeService,
      {
        provide: getRepositoryToken(ClusterAttribute),
        useValue: mockedRepoWithoutParams,
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: {
          findOneOrFail: () => {
            throw new Error();
          },
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedUSerInfo,
      },
    ],
  }).compile();
  clusterAttributeService = await module.get(ClusterAttributeService);
  t.rejects(
    clusterAttributeService.addClusterAttribute(
      createClusterAttributeRequestMock,
      ""
    ),
    BadRequestException
  );
});
