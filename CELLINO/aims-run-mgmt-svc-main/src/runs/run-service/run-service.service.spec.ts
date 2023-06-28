import { plainToInstance } from "class-transformer";
import tap from "tap";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Run } from "../../entities/run.entity";
import { RunService } from "./run-service.service";
import { RunDTO } from "../../dto/run.dto";
import { RunStatusCountResult } from "../../dto/RunStatusCountResult.dto";
import { PlateService } from "../../plate/plate-service/plate-service.service";
import { WorkflowService } from "../../workflow/workflow-service/workflow-service.service";
import { UserInfo } from "../../utils/UserInfo";
import { PartnerService } from "../../partner/partner-service/partner-service/partner-service.service";
import { CreateRunDto } from "../../dto/create-run.dto";
import { RunMetricService } from "../../run-metric/run-metric-service/run-metric-service.service";
import { PlateReviewerService } from "../../plate-reviewer/plate-reviewer-service/plate-reviewer-service.service";
import { RunReviewer } from "../../entities/run-reviewer.entity";
import { EventService } from "../../event/event-service/event-service.service";
import { PlateReviewer } from "../../entities/plate-reviewer.entity";
import { Event } from "../../entities/event.entity";
import { RunPlate } from "../../entities/run-plate.entity";
import { RunPlateService } from "../../run-plate/run-plate-service/run-plate-service.service";
import { ExternalWellService } from "../../utils/external-well-service";

const runMock: Run[] = [
  plainToInstance(Run, {
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
  }),
];

const runPlate = plainToInstance(RunPlate, {
  runId: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  plateId: "0712b029-1dde-4fc4-9df2-22ad681fce6b",
  phaseId: "0712b029-1dde-4fc4-9df2-22ad681fce6c",
});

const mockedRunPlateRepo = {
  findAndCount: () => {
    return Promise.resolve([[runPlate], 12]);
  },
  save: () => {
    return runPlate;
  },
  createRunPlatePhaseAssociation: () => ({ plateId: "", runId: "" }),
};

const runsCount: RunStatusCountResult[] = [
  plainToInstance(RunStatusCountResult, { count: "3", status: 0 }),
  plainToInstance(RunStatusCountResult, { count: "1", status: 2 }),
  plainToInstance(RunStatusCountResult, { count: "1", status: 1 }),
];

const runMockByID = plainToInstance(Run, {
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
});

const EventMock = plainToInstance(Event, {
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

const mockedEventRepo = {
  find: (): Promise<Event[]> => {
    return Promise.resolve([EventMock]);
  },
  findOne: () => {
    return EventMock;
  },
  save: () => {
    return EventMock;
  },
  insert: () => {
    return { raw: [{ id: "577f7c00-9c4c-464f-ba07-7fe50cb6a63b" }] };
  },
  addEvent: () => {
    return plainToInstance(Event, {
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
  },
};

let runService: RunService;
const mockedRepo = {
  findAndCount: () => {
    return [runMock, 1];
  },
};

const mockedRepoForId = {
  findOne: () => {
    return runMockByID;
  },
};

const mockedRepoForWrongId = {
  findOne: () => {
    return null;
  },
};

const mockedRepoForCount = {
  query: () => {
    return runsCount;
  },
};

const mockRunReviewerRepo = {
  remove: () => {
    id: "123";
  },
  save: () => {
    id: "123";
  },
};

const mockedPlateReviewerData = plainToInstance(PlateReviewer, {
  user_id: "40851e4e-9dfd-4202-bcae-c7a78013049b",
  count: "18",
  plates: [
    {
      createdBy: "9a440ef9-ddc7-49d2-a646-3a54b4cf74e7",
      createdAt: "2022-03-13T18:30:00.000Z",
      modifiedBy: "9a440ef9-ddc7-49d2-a646-3a54b4cf74e7",
      modifiedAt: "2022-03-13T18:30:00.000Z",
      id: "eb993631-f465-4acf-bba8-fe98259578db",
      name: "CELL-001418",
      barcode: "001418",
      plateStatus: 0,
      plateStatusReason: null,
      processMetadata: { passage_number: 0 },
      run: {
        createdBy: "4160ab49-554d-48e8-9b08-dc50e2ec2d44",
        createdAt: "2022-08-24T13:03:39.000Z",
        modifiedBy: "4160ab49-554d-48e8-9b08-dc50e2ec2d44",
        modifiedAt: "2022-08-24T13:03:39.000Z",
        id: "c138d399-9ee3-4d2b-8686-8f6acd34870a",
        name: "IPSC101 Run 2",
        startDate: "2022-03-18T14:32:23.000Z",
        runOwnerId: "9e3ae729-938c-4df5-9bba-b9c51f9aedb6",
        runDay: 159,
        runObjective: "Generate Cells for IPSC101",
        runSummary: null,
        runStatus: 0,
        cloneReviewStatus: null,
        metadata: null,
      },
      phase: {
        createdBy: "60cc99bf-6351-40b7-af70-734fa6665559",
        createdAt: "2022-08-24T13:02:39.000Z",
        modifiedBy: "60cc99bf-6351-40b7-af70-734fa6665559",
        modifiedAt: "2022-08-24T13:02:39.000Z",
        id: "58526f6b-0941-4ab3-8e1e-23c220dd8217",
        name: "Clone Isolation",
        version: 1,
        order: 4,
        description: "scan each well one time",
        phaseInitiationRules: [
          { key: "manual_start", value: true, operator: "equals" },
        ],
        otherRules: null,
        isActive: true,
      },
    },
  ],
});
const mockPlateReviewerRepo = {
  findAllPlatesGroupByUserAndCount: () => [[mockedPlateReviewerData], 1],
  findOne: () => mockedPlateReviewerData,
  save: () => {
    id: "";
  },
  remove: () => {
    id: "";
  },
};

const mockedPartnerService = { getPartnerById: (id: string) => ({ id }) };
const mockedPlateService = {
  registerPlateToRunAndPhase: (barcode: string) => ({ barcode, id: "123" }),
};
const mockedUserInfo = { getUserId: () => "abc" };
const mockedExternalWellService = {
  fetchWell: () => [{ id: "123" }],
};

const mockedWorkflowService = { getById: (id: string) => ({ id }) };
const mockedRunMetricService = {
  addRunMetric: () => ({}),
};

tap.test("test run service with id list ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepo,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  const runs: RunDTO = await runService.getRuns(
    ["2cfc0774-f78e-11ec-9674-5d27ec1cd472"],
    undefined,
    undefined,
    undefined
  );
  t.equal(runs.content.length, 1);
});

tap.test("test run service with id list and name", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepo,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  const runs = await runService.getRuns(
    ["2cfc0774-f78e-11ec-9674-5d27ec1cd472"],
    "name",
    undefined,
    undefined
  );
  t.equal(runs.content.length, 1);
});
tap.test("test run service with  name", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepo,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  const runs = await runService.getRuns(
    undefined,
    "name",
    undefined,
    undefined
  );
  t.equal(runs.content.length, 1);
});
tap.test("test run service with no condition", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepo,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  const runs = await runService.getRuns(undefined, undefined, 1);
  t.equal(runs.content.length, 1);
});

tap.test("test run service to get details of an id", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepoForId,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  const run = await runService.getRunById(
    "98160914-f915-11ec-9674-5d27ec1cd471"
  );
  t.equal(run.name, "iPSC101 v1.0 Run2");
});

tap.test("test plate service with in correct id ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepoForId,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  try {
    await runService.getRunById("2");
    t.fail("async thrower did not throw");
  } catch (e) {
    t.match(
      e.message,
      /The provided Run Id 2 is not UUID/,
      "The provided Run Id 2 is not UUID"
    );
  }
});

tap.test("test plate service with in correct id ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepoForWrongId,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  try {
    await runService.getRunById("98160914-f915-11ec-9674-5d27ec1cd471");
    t.fail("async thrower did not throw");
  } catch (e) {
    t.match(
      e.message,
      /The provided Run Id 98160914-f915-11ec-9674-5d27ec1cd471 is not found/,
      "The provided Run Id 98160914-f915-11ec-9674-5d27ec1cd471 is not found"
    );
  }
});

tap.test("test run service for runs count", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRepoForCount,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  runService = await module.get(RunService);
  const runs = await runService.getRunsCountByStatus();
  t.equal(runs.inProgressRuns, 3);
});

tap.test("should be able to create run", async (t) => {
  process.env.WELL_MGMT_SVC = "https://test.com";
  process.env.BIOSERO_DATA_SVC = "https://test.com";

  const body = {
    name: "Imaging/analysis: 999099",
    objective: "Track cell growth.",
    summary: "Track cell growth.",
    start_date: "2023-01-04 00:00:01+05:30",
    run_owner_id: "9e3ae729-938c-4df5-9bba-b9c51f9aedb6",
    run_reviewer_id: "9e3ae729-938c-4df5-9bba-b9c51f9aedb6",
    run_day: 0,
    status: "INPROGRESS",
    partner_id: "aec757fa-5888-4073-8234-327cf9391d65",
    workflow_id: "699f158f-1577-422b-a488-a01e0cf4fbf2",
    phase_id: "d12144f4-89ed-4d92-abd2-3e5a202ebfa3",
    bioseroOrder: {
      templateName: "sample",
      inputParameters: [
        {
          name: "Seeding Config",
          value: {
            protocol_name: "Seeding_1a",
            wells: [
              {
                barcode: "001666",
                well: "C4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
              {
                barcode: "001666",
                well: "D4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
              {
                barcode: "001666",
                well: "E4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
              {
                barcode: "001666",
                well: "F4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
            ],
          },
        },
      ],
    },
  };
  const createRunDto = plainToInstance(CreateRunDto, body);
  const mockedRunRepo = {
    save: (run: Run) => run,
  };

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRunRepo,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: mockedExternalWellService,
      },
    ],
  }).compile();
  global.fetch = () => {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        text: async () => {
          return await "1";
        },
      });
    });
  };
  runService = await module.get(RunService);
  try {
    await runService.createRun(
      createRunDto,
      '{"id":"f82946b4-85f7-4f96-b83b-9cbfb0083c0a"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("should be able to create run", async (t) => {
  process.env.WELL_MGMT_SVC = "https://test.com";
  process.env.BIOSERO_DATA_SVC = "https://test.com";

  const body = {
    name: "Imaging/analysis: 999099",
    objective: "Track cell growth.",
    summary: "Track cell growth.",
    start_date: "2023-01-04 00:00:01+05:30",
    run_owner_id: "9e3ae729-938c-4df5-9bba-b9c51f9aedb6",
    run_reviewer_id: "9e3ae729-938c-4df5-9bba-b9c51f9aedb6",
    run_day: 0,
    status: "INPROGRESS",
    partner_id: "aec757fa-5888-4073-8234-327cf9391d65",
    workflow_id: "699f158f-1577-422b-a488-a01e0cf4fbf2",
    phase_id: "d12144f4-89ed-4d92-abd2-3e5a202ebfa3",
    bioseroOrder: {
      templateName: "sample",
      inputParameters: [
        {
          name: "Seeding Config",
          value: {
            protocol_name: "Seeding_1a",
            wells: [
              {
                barcode: "001666",
                well: "C4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
              {
                barcode: "001666",
                well: "D4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
              {
                barcode: "001666",
                well: "E4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
              {
                barcode: "001666",
                well: "F4",
                parameters: {
                  protocol_config_name: "Seeding_protocol_1a",
                },
              },
            ],
          },
        },
      ],
    },
  };
  const createRunDto = plainToInstance(CreateRunDto, body);
  const mockedRunRepo = {
    save: (run: Run) => run,
  };

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunService,
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRunRepo,
      },
      {
        provide: PlateService,
        useValue: mockedPlateService,
      },
      {
        provide: WorkflowService,
        useValue: mockedWorkflowService,
      },
      {
        provide: PartnerService,
        useValue: mockedPartnerService,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
      {
        provide: RunMetricService,
        useValue: mockedRunMetricService,
      },
      {
        provide: PlateReviewerService,
        useValue: mockPlateReviewerRepo,
      },
      {
        provide: getRepositoryToken(RunReviewer),
        useValue: mockRunReviewerRepo,
      },
      {
        provide: EventService,
        useValue: mockedEventRepo,
      },
      {
        provide: RunPlateService,
        useValue: mockedRunPlateRepo,
      },
      {
        provide: ExternalWellService,
        useValue: {
          fetchWell: () => [],
        },
      },
    ],
  }).compile();
  global.fetch = () => {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        text: async () => {
          return await "1";
        },
      });
    });
  };
  runService = await module.get(RunService);
  try {
    await runService.createRun(
      createRunDto,
      '{"id":"f82946b4-85f7-4f96-b83b-9cbfb0083c0a"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});
