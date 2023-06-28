import { plainToInstance } from "class-transformer";
import tap from "tap";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Plate } from "../../entities/plate.entity";
import { Event } from "../../entities/event.entity";
import { PlateService } from "./plate-service.service";
import { PlateContentDTO } from "../../dto/plate-content.dto";
import { PlateReviewer } from "../../entities/plate-reviewer.entity";
import { CreatePlateRequestDTO } from "../../dto/plate-request.dto";
import { PlateDetailsDTO } from "../../dto/plate-details.dto";
import { Labware } from "../../entities/labware.entity";
import { UserDTO } from "../../dto/User.dto";
import { Phase } from "../../entities/phase.entity";
import { Run } from "../../entities/run.entity";
import { UserInfo } from "../../utils/UserInfo";

const plateMock: Plate = plainToInstance(Plate, {
  createdBy: null,
  createdAt: "2022-07-01T02:42:48.281Z",
  modifiedBy: null,
  modifiedAt: null,
  isDeleted: false,
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  name: null,
  barcode: null,
  plateStatus: null,
  plateStatusReason: null,
  reviewers: null,
  processStatus: 0,
  processStatusDetail: null,
  processMetadata: null,
  reviewStatus: 0,
  analysisStatus: 0,
  analysisStatusDetail: null,
  labware: {
    id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
  },
  phase: {
    createdBy: null,
    createdAt: "2022-06-29T04:00:55.377Z",
    modifiedBy: null,
    modifiedAt: null,
    isDeleted: false,
    id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    name: null,
    phaseInitiationRules: [[Object]],
    otherRules: [[Object]],
  },
  runs: [
    {
      createdBy: null,
      createdAt: "2022-06-29T03:57:17.356Z",
      modifiedBy: null,
      modifiedAt: null,
      isDeleted: false,
      id: "aa6fd36d-f78d-11ec-9674-5d27ec1cd234",
      name: "iPSC101 v1.0 Run2",
      startDate: null,
      runOwnerId: null,
      runDay: null,
      runObjective: null,
      runSummary: null,
      runStatus: 0,
      cloneReviewStatus: null,
      metadata: null,
    },
    {
      createdBy: null,
      createdAt: "2022-06-29T03:57:16.297Z",
      modifiedBy: null,
      modifiedAt: null,
      isDeleted: false,
      id: "aa6fd36c-f78d-11ec-9674-5d27ec1cd234",
      name: "iPSC101 v1.0 Run1",
      startDate: null,
      runOwnerId: null,
      runDay: null,
      runObjective: null,
      runSummary: null,
      runStatus: 0,
      cloneReviewStatus: null,
      metadata: null,
    },
  ],
  event: [{ id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234" }],
  processMetdata: { downSelectionDay: 1 },
});

const plateDtoMock: PlateContentDTO = plainToInstance(PlateContentDTO, {
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  name: null,
  runId: null,
  labwareId: null,
  reviewers: null,
  processMetadata: null,
  currentPhaseId: null,
  processStatusDetail: null,
  barcode: null,
  plateStatus: null,
  plateStatusReason: null,
  processStatus: null,
  reviewStatus: null,
  analysisStatus: null,
  analysisStatusDetail: null,
});

const eventMock = plainToInstance(Event, {
  createdBy: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  createdAt: "2022-11-25T07:49:36.390Z",
  modifiedBy: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  modifiedAt: "2022-11-25T07:49:36.390Z",
  isDeleted: false,
  id: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  name: "Event 1",
  eventType: null,
  startedAt: null,
  completedAt: null,
  metadata: null,
  plate: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  protocol: null,
  processStatus: 0,
  reviewStatus: 1,
  analysisStatus: 1,
  analysisStatusDetail: null,
  processStatusDetail: null,
});

const plateMockWithNullValues: Plate = plainToInstance(Plate, {
  createdBy: null,
  createdAt: "2022-07-01T02:42:48.281Z",
  modifiedBy: null,
  modifiedAt: null,
  isDeleted: false,
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  name: null,
  barcode: null,
  plateStatus: null,
  plateStatusReason: null,
  reviewers: null,
  processStatus: 0,
  processStatusDetail: null,
  processMetadata: null,
  reviewStatus: 0,
  analysisStatus: 0,
  analysisStatusDetail: null,
  labware: null,
  processMetdata: null,
});

let plateService: PlateService;
const mockedRepo = {
  findOne: (id: any) => {
    return plateMock;
  },
};
const mockedReviewerRepo = {
  findOne: (id: any) => {
    return plateReviewersMock;
  },
};

const mockedGetEvent = {
  findOne: (id: any) => {
    return eventMock;
  },
};

const mockedSaveEvent = {
  save: (id: any) => {
    return eventMock;
  },
};
//const mockedRepoWithDifferentMock = {findOne : (id:any) => {return plateMockWithNullValues}}
const mockedRepoWithDifferentMock = {
  query: (query: any) => {
    return plateMockWithNullValues;
  },
};
const mockedRepoPlate = {
  query: (query: any) => {
    return plateMock;
  },
};
//const mockedRepoPlate= {query : (query:any) => {return plateDtoMock}};
const mockedRepoPlate1 = {
  createQueryBuilder: (query: any) => {
    return plateMock;
  },
  leftJoinAndSelect: (query: any) => {
    return plateMock;
  },
  select: (query: any) => {
    return plateMock;
  },
  addSelect: (query: any) => {
    return plateMock;
  },
};
// const mockedRepoPlate2= {leftJoinAndSelect : (mockedRepoPlate1:any) => {return plateMock}};
// const mockedRepoPlate3= {select : (mockedRepoPlate2:any) => {return plateMock}};
// const mockedRepoPlate4= {addSelect : (mockedRepoPlate3:any) => {return plateMock}};

const plateRequest: CreatePlateRequestDTO = plainToInstance(
  CreatePlateRequestDTO,
  {
    name: "plate",
    barcode: "0231",
    createdBy: {
      id: "60cc99bf-6351-40b7-af70-734fa6665559",
      email: "c@gmail.com",
    },
    labware: {
      id: "d8755d66-614a-4829-83d3-c7e59e9a2bec",
      name: "Greiner 655087 Cell-star no Ti",
    },
    phaseId: "58526f6b-0941-4ab3-8e1e-23c220dd8210",
    runId: "c138d399-9ee3-4d2b-8686-8f6acd34870a",
    plateStatus: "KEEP",
  }
);

const plateRequestWithNames: CreatePlateRequestDTO = plainToInstance(
  CreatePlateRequestDTO,
  {
    name: "plate",
    barcode: "0231",
    createdBy: {
      id: null,
      email: "c@gmail.com",
    },
    labware: {
      id: null,
      name: "Greiner 655087 Cell-star no Ti",
    },
    phaseId: "58526f6b-0941-4ab3-8e1e-23c220dd8210",
    runId: "c138d399-9ee3-4d2b-8686-8f6acd34870a",
    plateStatus: "KEEP",
  }
);

const plateRequestWithIncorrectIds: CreatePlateRequestDTO = plainToInstance(
  CreatePlateRequestDTO,
  {
    name: "plate",
    barcode: "0231",
    createdBy: {
      id: null,
      email: "c@gmail.com",
    },
    labware: {
      id: null,
      name: "Greiner 655087 Cell-star no Ti",
    },
    phaseId: "58526f6b-0941-4ab3-8e1e-23c220dd8210",
    runId: "c138d399-9ee3-4d2b-8686-8f6acd34870b",
    plateStatus: "KEEP",
  }
);

const plate: PlateDetailsDTO = plainToInstance(PlateDetailsDTO, {
  id: "58526f6b-0941-4ab3-8e1e-23c220dd8218",
  name: "plate",
  barcode: "0231",
  phaseId: "58526f6b-0941-4ab3-8e1e-23c220dd8217",
  runId: "c138d399-9ee3-4d2b-8686-8f6acd34870b",
  plateStatus: "KEEP",
  labwareId: "d8755d66-614a-4829-83d3-c7e59e9a2bec",
});
const runMock: Run = plainToInstance(Run, {
  id: "c138d399-9ee3-4d2b-8686-8f6acd34870b",
});
const labware: Labware = plainToInstance(Labware, {
  id: "58526f6b-0941-4ab3-8e1e-23c220dd8218",
});

const phaseMock: Phase = plainToInstance(Phase, {
  id: "58526f6b-0941-4ab3-8e1e-23c220dd8210",
});

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
};

const mockedInCorrectUserInfo = {
  getUserByEmail: (email) => {
    return null;
  },
  getUserById: (id) => {
    return null;
  },
};

const mockedPlate = {
  save: (entity: any) => {
    return plate;
  },
};

const mockedLabware = {
  findOne: (_id: any) => {
    return labware;
  },
};

const mockedInvalidLabware = {
  findOne: (_id: any) => {
    return null;
  },
};

const mockPhase = {
  findOne: (_id: any) => {
    return phaseMock;
  },
};

const mockInvalidPhase = {
  findOne: (_id: any) => {
    return null;
  },
};

const mockRun = {
  findOne: (_id: any) => {
    return runMock;
  },
};
const mockInvalidRun = {
  findOne: (_id: any) => {
    return null;
  },
};
const plateReviewersMock: PlateReviewer = plainToInstance(PlateReviewer, {
  userId: "020bef3d-949d-4a1d-af88-f6313bb7e656",
  plate: null,
});

const mockedRepoForUpdate = {
  save: (plate: any) => {
    return plate;
  },
  findOne: (_id: any) => {
    return plateMock;
  },
  query: (query: any) => {
    return plateMock;
  },
};
const mockedRepoWithFalseId = {
  findOne: (id) => {
    return undefined;
  },
  query: (query: any) => {
    return undefined;
  },
};

tap.test("test add plate", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedPlate,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  plateService = await module.get(PlateService);
  const plate = await plateService.addPlate(plateRequest);
  t.equal(plate.id, "58526f6b-0941-4ab3-8e1e-23c220dd8218");
});

tap.test("test add plate with invalid user credentials", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedPlate,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedInCorrectUserInfo,
      },
    ],
  }).compile();
  plateService = await module.get(PlateService);
  try {
    await plateService.addPlate(plateRequestWithIncorrectIds);
    t.fail();
  } catch (e) {
    t.match(
      e.message,
      /The provided CreatedBy Details {\"id\":null,\"email\":\"c@gmail.com\"} is invalid./,
      'The provided CreatedBy Details {"id":null,"email":"c@gmail.com"} is invalid.'
    );
  }
});

tap.test("test add plate with names and email", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedPlate,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  plateService = await module.get(PlateService);
  const plate = await plateService.addPlate(plateRequestWithNames);
  t.equal(plate.id, "58526f6b-0941-4ab3-8e1e-23c220dd8218");
});

tap.test("test add plate with invalid labware", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedPlate,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedInvalidLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  plateService = await module.get(PlateService);
  try {
    await plateService.addPlate({
      ...plateRequestWithIncorrectIds,
      createdBy: {
        id: "60cc99bf-6351-40b7-af70-734fa6665559",
        email: "c@gmail.com",
      },
    });
    t.fail();
  } catch (e) {
    t.match(
      e.message,
      /The provided Labware Details {\"id\":null,\"name\":\"Greiner 655087 Cell-star no Ti\"} is invalid./,
      'The provided Labware Details {"id":null,"name":"Greiner 655087 Cell-star no Ti"} is invalid.'
    );
  }
});

tap.test("test plate service for updateWithPatchData", async (t) => {
  const moduleMock: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedRepoForUpdate,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  plateService = await moduleMock.get(PlateService);
});

tap.test(
  "test plate service for updateWithPatchData with UUID exception",
  async (t) => {
    const moduleMock: TestingModule = await Test.createTestingModule({
      providers: [
        PlateService,
        {
          provide: getRepositoryToken(Plate),
          useValue: mockedRepoForUpdate,
        },
        {
          provide: getRepositoryToken(PlateReviewer),
          useValue: mockedReviewerRepo,
        },
        {
          provide: getRepositoryToken(Event),
          useValue: mockedGetEvent,
        },
        {
          provide: getRepositoryToken(Run),
          useValue: mockRun,
        },
        {
          provide: getRepositoryToken(Phase),
          useValue: mockPhase,
        },
        {
          provide: getRepositoryToken(Labware),
          useValue: mockedLabware,
        },
        UserInfo,
        {
          provide: UserInfo,
          useValue: mockedCorrectUserInfo,
        },
      ],
    }).compile();

    plateService = await moduleMock.get(PlateService);
    try {
      await plateService.updateByPatch(
        "123",
        [{ op: "replace", value: "test", path: "/name" }],
        "email"
      );
      t.fail();
    } catch (e) {
      t.match(
        e.message,
        /Plate Id 123 should be UUID/,
        "Plate Id 123 should be UUID"
      );
    }
  }
);

tap.test(
  "test plate service for updateWithPatchData with UUID exception",
  async (t) => {
    const moduleMock: TestingModule = await Test.createTestingModule({
      providers: [
        PlateService,
        {
          provide: getRepositoryToken(Plate),
          useValue: mockedRepoWithFalseId,
        },
        {
          provide: getRepositoryToken(Event),
          useValue: mockedGetEvent,
        },
        {
          provide: getRepositoryToken(PlateReviewer),
          useValue: mockedReviewerRepo,
        },
        {
          provide: getRepositoryToken(Run),
          useValue: mockRun,
        },
        {
          provide: getRepositoryToken(Phase),
          useValue: mockPhase,
        },
        {
          provide: getRepositoryToken(Labware),
          useValue: mockedLabware,
        },
        UserInfo,
        {
          provide: UserInfo,
          useValue: mockedCorrectUserInfo,
        },
      ],
    }).compile();

    plateService = await moduleMock.get(PlateService);
    try {
      await plateService.updateByPatch(
        "98160914-f915-11ec-9674-5d27ec1cd471",
        [{ op: "replace", value: "test", path: "/name" }],
        "email"
      );
      t.fail();
    } catch (e) {
      t.match(
        e.message,
        /The provided Plate Id 98160914-f915-11ec-9674-5d27ec1cd471 is not found/,
        "The provided Plate Id 98160914-f915-11ec-9674-5d27ec1cd471 is not found"
      );
    }
  }
);

tap.test("test plate service with different mock in db", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedRepoWithDifferentMock,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  plateService = await module.get(PlateService);
});

tap.test("test plate service with incorrect id ", async (t) => {
  const moduleMock: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedRepoWithFalseId,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  plateService = await moduleMock.get(PlateService);
  try {
    await plateService.getPlateById("2cfc0774-f78e-11ec-9674-5d27ec1cd423");
    t.fail("async thrower did not throw");
  } catch (e) {
    t.match(
      e.message,
      /The provided Plate Id 2cfc0774-f78e-11ec-9674-5d27ec1cd423 is not found/,
      "The provided Plate Id 2cfc0774-f78e-11ec-9674-5d27ec1cd423 is not found"
    );
  }
});

tap.test("test plate service with incorrect id ", async (t) => {
  const moduleMock: TestingModule = await Test.createTestingModule({
    providers: [
      PlateService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedRepoWithFalseId,
      },
      {
        provide: getRepositoryToken(Event),
        useValue: mockedGetEvent,
      },
      {
        provide: getRepositoryToken(PlateReviewer),
        useValue: mockedReviewerRepo,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockRun,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockPhase,
      },
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedLabware,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  plateService = await moduleMock.get(PlateService);
  try {
    await plateService.getPlateById("2");
    t.fail("async thrower did not throw");
  } catch (e) {
    t.match(
      e.message,
      /Plate Id 2 should be UUID/,
      "Plate Id 2 should be UUID"
    );
  }
});

const plateMockForPlateIDs: Plate[] = [
  plainToInstance(Plate, {
    id: "aa6fd36d-f78d-11ec-9674-5d27ec1cd472",
    name: "plate1",
    barcode: undefined,
    plateStatus: null,
    plateStatusReason: null,
    reviewers: null,
    processStatus: undefined,
    processStatusDetail: undefined,
    processMetadata: undefined,
    reviewStatus: null,
    analysisStatus: null,
    analysisStatusDetail: undefined,
    labware: undefined,
    phase: undefined,
    runs: undefined,
    events: undefined,
  }),
];

const plateMock1: Plate[] = [
  plainToInstance(Plate, {
    id: "aa6fd36d-f78d-11ec-9674-5d27ec1cd472",
    name: "plate1",
    barcode: undefined,
    plateStatus: null,
    plateStatusReason: null,
    reviewers: null,
    processStatus: undefined,
    processStatusDetail: undefined,
    processMetadata: undefined,
    reviewStatus: null,
    analysisStatus: null,
    analysisStatusDetail: undefined,
    labware: undefined,
    phase: undefined,
    runs: [
      {
        id: "aa6fd36d-f78d-11ec-9674-5d27ec1cd472",
        name: "iPSC101 v1.0 Run2",
        partnerId: undefined,
        objective: null,
        summary: null,
        creatorId: null,
        cloneReviewStatus: undefined,
        day: undefined,
        processId: undefined,
        seedingDay: null,
        status: "INPROGRESS",
        currentPhaseId: undefined,
      },
    ],
    events: undefined,
  }),
];

//const mockedRepoForPlateIds = {findAndCount : (id:any) => {return [plateMockForPlateIDs,1]}};
//const mockedRepoForPlateIds1 = {findAndCount : (id:any) => {return [plateMock1,1]}};
const mockedRepoForPlateIds = {
  query: (query: any) => {
    return plateMockForPlateIDs;
  },
};
const mockedRepoForPlateIds1 = {
  query: (query: any) => {
    return plateMock1;
  },
};

// tap.test('test plate service with runId list ', async (t) => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [
//     PlateService,
//       {
//         provide: getRepositoryToken(Plate),
//         //useValue: mockedRepoForPlateIds,
//         useValue: mockedRepoPlate1,
//       },
//       {
//         provide: getRepositoryToken(PlateReviewers),
//         useValue: mockedReviewerRepo,
//       }
//     ],
//   }).compile();
//   plateService = await module.get(PlateService);
//   const runs:PlateDTO = await plateService.getPlates(["aa6fd36d-f78d-11ec-9674-5d27ec1cd472"],undefined,undefined,undefined)
//   t.equal(runs.content.length,1);
// });

// tap.test('test plate service with runId list and phaseId', async (t) => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [
//       PlateService,
//       {
//         provide: getRepositoryToken(Plate),
//         useValue: mockedRepoForPlateIds,
//       },
//       {
//         provide: getRepositoryToken(PlateReviewers),
//         useValue: mockedReviewerRepo,
//       }
//     ],
//   }).compile();
//   plateService = await module.get(PlateService);
//   const plates = await plateService.getPlates(["aa6fd36d-f78d-11ec-9674-5d27ec1cd472"],undefined,"2cfc0774-f78e-11ec-9674-5d27ec1cd472",undefined)
//   t.equal(plates.content.length,1);
// });
// tap.test('test plate service with  phaseid', async (t) => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [
//       PlateService,
//       {
//         provide: getRepositoryToken(Plate),
//         useValue: mockedRepoForPlateIds,
//       },
//       {
//         provide: getRepositoryToken(PlateReviewers),
//         useValue: mockedReviewerRepo,
//       }
//     ],
//   }).compile();
//   plateService = await module.get(PlateService);
//   const runs = await plateService.getPlates(undefined,undefined,"2cfc0774-f78e-11ec-9674-5d27ec1cd472",undefined)
//   t.equal(runs.content.length,1);
// });
// tap.test('test plate service with no condition', async (t) => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [
//       PlateService,
//       {
//         provide: getRepositoryToken(Plate),
//         useValue: mockedRepoForPlateIds,
//       },
//       {
//         provide: getRepositoryToken(PlateReviewers),
//         useValue: mockedReviewerRepo,
//       }
//     ],
//   }).compile();
//   plateService = await module.get(PlateService);
//   const runs = await plateService.getPlates(undefined,undefined,undefined,undefined)
//   t.equal(runs.content.length,1);
// });

// tap.test('test plate service with Run', async (t) => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         PlateService,
//         {
//           provide: getRepositoryToken(Plate),
//           useValue: mockedRepoForPlateIds1,
//         },
//         {
//           provide: getRepositoryToken(PlateReviewers),
//           useValue: mockedReviewerRepo,
//         }
//       ],
//     }).compile();
//     plateService = await module.get(PlateService);
//     const runs = await plateService.getPlates(undefined,undefined,undefined,undefined)
//     t.equal(runs.content.length,1);
//   });
