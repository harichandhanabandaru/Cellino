import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ClusterDTO } from "../../dto/cluster.dto";
import { CreateClusterRequestDTO } from "../../dto/cluster-request.dto";
import { UserDTO } from "../../dto/user.dto";
import { Cluster } from "../../entities/cluster.entity";
import { Colony } from "../../entities/colony.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { Well } from "../../entities/well.entity";
import { Clonality } from "../../enums/clonality";
import { ClusterOrColonyType } from "../../enums/cluster-or-colony-type";
import { PhenoType } from "../../enums/pheno-type";
import { UserInfo } from "../../utils/user-info";
import tap from "tap";
import { ClusterService } from "./cluster-service.service";
import { NotFoundException } from "@nestjs/common";
import { ClusterPaginatedDTO } from "../../dto/cluster-paginated.dto";
import { GetClusterRequestDTO } from "../../dto/get-cluster-request.dto";

const clusterMock: Cluster[] = plainToInstance(Cluster, [
  {
    createdBy: null,
    createdAt: "2022-07-01T02:42:48.281Z",
    modifiedBy: null,
    modifiedAt: null,
    isActive: true,
    clusterId: "98160914-f915-11ec-9674-5d27ec1cd471",
    name: "testCluster",
    type: ClusterOrColonyType.MANUAL,
    nameId: "test",
    attributes: null,
    phenotype: PhenoType.UNKNOWN,
    clonality: Clonality.UNKNOWN,
    outline: {
      color: "#24266c",
      center: {
        x: 9914.148250408673,
        y: 2431.9050801075355,
      },
      exterior: [
        {
          x: 9869.765253226033,
          y: 2339.4406497502846,
        },
        {
          x: 9869.765253226033,
          y: 2346.8375217342277,
        },
        {
          x: 9862.368028186294,
          y: 2354.234746773967,
        },
        {
          x: 9862.368028186294,
          y: 2369.0291968534457,
        },
        {
          x: 9847.573578106814,
          y: 2383.823293877128,
        },
        {
          x: 9832.779481083133,
          y: 2383.823293877128,
        },
        {
          x: 9825.382256043393,
          y: 2391.220518916867,
        },
        {
          x: 5557.250697403589,
          y: 4513.248525944751,
        },
      ],
      interiors: [
        [
          {
            x: 6601.599428526556,
            y: 4675.302639394864,
          },
          {
            x: 7213.80385711588,
            y: 4513.248525944748,
          },
          {
            x: 7213.80385711588,
            y: 4675.302639394864,
          },
          {
            x: 6601.599428526556,
            y: 4675.302639394864,
          },
        ],
      ],
    },
  },
]);


const mockedRepo = {
  findAndCount: (id: any) => {
    return [clusterMock,1];
  },
};

const mockedUpdateRepo = {
  find: (id: any) => {
    return clusterMock;
  },
  findOne: (id: any) => {
    return clusterMock[0];
  },
  save: (cluster: any) => {
    return cluster;
  },
};

const mockedUpdateEmptyRepo = {
  find: (id: any) => {
    return clusterMock;
  },
  findOne: (id: any) => {
    return clusterMock[0];
  },
  save: (cluster: any) => {
    throw new Error();
  },
};

const clusterRequestMock: CreateClusterRequestDTO = plainToInstance(
  CreateClusterRequestDTO,
  {
    clusterName: "cluster",
    colonyId: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
    nameId: null,
    wellId: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
    parents: null,
    clonality: 0,
    quality: 0,
    eventImageId: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
    imageAnalysisRequestId: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
    attributes: null,
    outline: {
      exterior: [
        {
          x: 5557.250697403589,
          y: 4513.248525944751,
        },
        {
          x: 6457.551327682007,
          y: 3883.038084749858,
        },
        {
          x: 6709.635504159963,
          y: 4423.21846291691,
        },
        {
          x: 7051.749743665762,
          y: 3901.0440973554264,
        },
        {
          x: 7735.97822267736,
          y: 4117.1162486222465,
        },
        {
          x: 7411.869995777132,
          y: 5179.470992350778,
        },
        {
          x: 6241.479176415186,
          y: 4891.374790661686,
        },
        {
          x: 5557.250697403589,
          y: 4513.248525944751,
        },
      ],
      interiors: [
        [
          {
            x: 6601.599428526556,
            y: 4675.302639394864,
          },
          {
            x: 7213.80385711588,
            y: 4513.248525944748,
          },
          {
            x: 7213.80385711588,
            y: 4675.302639394864,
          },
          {
            x: 6601.599428526556,
            y: 4675.302639394864,
          },
        ],
      ],
    },
  }
);

const getClusterRequestMock: GetClusterRequestDTO = plainToInstance(
  GetClusterRequestDTO,
  {
    imageEventId:"096d2eeb-2404-4a1e-ac6a-698e8835f56a",
    imageAnalysisRequestId:"096d2eeb-2404-4a1e-ac6a-698e8835f56a"
  });

const clusterContentMock = plainToInstance(ClusterDTO, {
  clusterId: "096d2eeb-2404-4a1e-ac6a-698e8835f56a",
  clusterName: "cluster",
  colonyId: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
  nameId: null,
  wellId: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
  parents: null,
  clonality: 0,
  quality: 0,
  eventImageId: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
  imageAnalysisRequest: "096d2eeb-2404-4a1e-ac6a-698e8835f56b",
  attributes: null,
  outline: {
    exterior: [
      {
        x: 5557.250697403589,
        y: 4513.248525944751,
      },
      {
        x: 6457.551327682007,
        y: 3883.038084749858,
      },
      {
        x: 6709.635504159963,
        y: 4423.21846291691,
      },
      {
        x: 7051.749743665762,
        y: 3901.0440973554264,
      },
      {
        x: 7735.97822267736,
        y: 4117.1162486222465,
      },
      {
        x: 7411.869995777132,
        y: 5179.470992350778,
      },
      {
        x: 6241.479176415186,
        y: 4891.374790661686,
      },
      {
        x: 5557.250697403589,
        y: 4513.248525944751,
      },
    ],
    interior: [
      [
        {
          x: 6601.599428526556,
          y: 4675.302639394864,
        },
        {
          x: 7213.80385711588,
          y: 4513.248525944748,
        },
        {
          x: 7213.80385711588,
          y: 4675.302639394864,
        },
        {
          x: 6601.599428526556,
          y: 4675.302639394864,
        },
      ],
    ],
    boundingBox: {
      xmax: 5557.250697403589,
      xmin: 7735.97822267736,
      ymax: 3883.038084749858,
      ymin: 5179.470992350778,
    },
    center: { x: 6646.614460040474, y: 4531.254538550318 },
  },
});

const mockedClusterPaginatedDto : ClusterPaginatedDTO = plainToInstance(ClusterPaginatedDTO,{
  content: [clusterContentMock],
  pageInfo: {"totalElements":1, "size":1, "page":1}
})
const imageMock = plainToInstance(ImageEvent, {
  id: "096d2eeb-2404-4a1e-ac6a-698e8835f56a",
  name: "cluster",
});

const imageAnalysisMock = plainToInstance(ImageAnalysisRequest, {
  id: "096d2eeb-2404-4a1e-ac6a-698e8835f56a",
  name: "cluster",
});

const colonyMock = plainToInstance(Colony, {
  id: "096d2eeb-2404-4a1e-ac6a-698e8835f56a",
  name: "cluster",
});

const wellMock = plainToInstance(Well, {
  id: "096d2eeb-2404-4a1e-ac6a-698e8835f56a",
  name: "cluster",
});

const mockedColonyRepo = {
  findOne: (id) => {
    return colonyMock;
  },
};

const mockedClusterRepo = {
  save: (cluster) => {
    return clusterContentMock;
  },
};

const mockedImageRepo = {
  findOne: (id) => {
    return imageMock;
  },
};

const mockedAnalysisRepo = {
  findOne: (id) => {
    return imageAnalysisMock;
  },
};

const mockedWellRepo = {
  findOne: (id) => {
    return wellMock;
  },
};

const userMock: UserDTO = plainToInstance(UserDTO, {
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  firstName: "Pushpa",
  lastName: "Dodda",
  email: "email@cellinobio.com",
});

const mockedUserInfo = {
  getUserByEmail: (email) => {
    return userMock;
  },
  getUserId: (userProfile) => {
    return "98160914-f915-11ec-9674-5d27ec1cd471";
  },
};

const basicClusterProviders = [
  ClusterService,
  {
    provide: getRepositoryToken(ImageAnalysisRequest),
    useValue: mockedAnalysisRepo,
  },
  {
    provide: getRepositoryToken(ImageEvent),
    useValue: mockedImageRepo,
  },
  {
    provide: getRepositoryToken(Colony),
    useValue: mockedColonyRepo,
  },
  {
    provide: getRepositoryToken(Well),
    useValue: mockedWellRepo,
  },
  UserInfo,
  {
    provide: UserInfo,
    useValue: mockedUserInfo,
  },
];

tap.test("Get Clusters by Image Event ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedRepo,
      },
    ],
  }).compile();

  const service = await module.get(ClusterService);
  const clusterPaginatedDto = await service.getClusters(getClusterRequestMock);
  t.equal(clusterPaginatedDto.content.length, 1);
});

tap.test("Get Clusters by Image Event ID - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: {
          find: () => undefined,
        },
      },
    ],
  }).compile();

  const service = await module.get(ClusterService);
  try {
    await service.getClusters();
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Create Cluster", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
  const cluster = await service.addCluster(clusterRequestMock, "");
  t.equal(cluster.clonality, "UNKNOWN");
});

tap.test("Create Cluster - Colony Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Colony),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: {},
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
  t.rejects(service.addCluster(clusterRequestMock, ""), NotFoundException);
});

tap.test("Create Cluster - Well Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Well),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: {},
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
  t.rejects(service.addCluster(clusterRequestMock, ""), NotFoundException);
});

tap.test("Create Cluster - ImageAnalysisRequest Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(Cluster),
        useValue: {},
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
  t.rejects(service.addCluster(clusterRequestMock, ""), NotFoundException);
});

tap.test("Create Cluster - Wrong Input", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedClusterRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {
          findOne: () => null,
        },
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
  try {
    await service.addCluster(clusterRequestMock, "");
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Create Cluster - Error while saving", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: {
          save: () => {
            throw new Error();
          },
        },
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
  try {
    await service.addCluster(clusterRequestMock, "");
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Update Cluster", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateRepo,
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
  const cluster = await service.updateByPatch(
    "98160914-f915-11ec-9674-5d27ec1cd471",
    [
      { op: "replace", value: "test", path: "/name" },
      { op: "replace", value: "FIBROBLAST", path: "/phenoType" },
      { op: "replace", value: "SYSTEMGENERATED", path: "/type" },
      { op: "replace", value: "MONOCLONAL", path: "/clonality" },
      { op: "replace", value: "MEDIUM", path: "/quality" },
    ],
    '{"id":"07058040-6ee9-4e94-b7b8-42f73bc59276"}'
  );
  t.equal(cluster.name, "test");
});

tap.test("Update Cluster - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: {
          findOne: () => undefined,
        },
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
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

tap.test("Update Cluster - Error while saving", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ...basicClusterProviders,
      {
        provide: getRepositoryToken(Cluster),
        useValue: mockedUpdateEmptyRepo,
      },
    ],
  }).compile();
  const service = await module.get(ClusterService);
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
