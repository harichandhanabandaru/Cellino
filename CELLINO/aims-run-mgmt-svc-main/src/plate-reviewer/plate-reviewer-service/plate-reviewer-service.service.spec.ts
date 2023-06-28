import { Test, TestingModule } from "@nestjs/testing";
import { PlateReviewerService } from "./plate-reviewer-service.service";
import { test } from "tap";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PlateRepository } from "../../repository/plate.repository";
import { PlateReviewerRepository } from "../../repository/plate-reviewer.repository";

const mockPlateRepo = {};

const mockedData = {
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
};

const mockPlateReviewerRepo = {
  findAllPlatesGroupByUserAndCount: (_data: any) => [[mockedData], 1],
  findOne: (_data: any) => mockedData,
  save: (_data: any) => {},
  remove: (_data: any) => {},
};

test("Get All", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateReviewerService,
      {
        provide: getRepositoryToken(PlateRepository),
        useValue: mockPlateRepo,
      },
      {
        provide: getRepositoryToken(PlateReviewerRepository),
        useValue: mockPlateReviewerRepo,
      },
    ],
  }).compile();

  const service = module.get<PlateReviewerService>(PlateReviewerService);
  const data = await service.getPlatesReviewers();
  t.equal(data.content.length, 1);
});

test("Get All - Pagination", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateReviewerService,
      {
        provide: getRepositoryToken(PlateRepository),
        useValue: mockPlateRepo,
      },
      {
        provide: getRepositoryToken(PlateReviewerRepository),
        useValue: mockPlateReviewerRepo,
      },
    ],
  }).compile();

  const service = module.get<PlateReviewerService>(PlateReviewerService);
  const data = await service.getPlatesReviewers({ page: 1, size: 1 });
  t.equal(data.content.length, 1);

  // For Coverage....
  await service.getPlatesReviewers({ page: 1 });
  await service.getPlatesReviewers({ size: 1 });
  await service.getPlatesReviewers({ size: 0 });
});

test("Assign Reviewers to a Plates", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateReviewerService,
      {
        provide: getRepositoryToken(PlateRepository),
        useValue: mockPlateRepo,
      },
      {
        provide: getRepositoryToken(PlateReviewerRepository),
        useValue: mockPlateReviewerRepo,
      },
    ],
  }).compile();

  const service = module.get<PlateReviewerService>(PlateReviewerService);
  const data = await service.assignPlateToReviewer([
    { userId: "xuz", plateIds: ["asodiuh"] },
  ]);
  t.equal(data.message, "Success");
});

test("Unassign Reviewers to a Plates", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateReviewerService,
      {
        provide: getRepositoryToken(PlateRepository),
        useValue: mockPlateRepo,
      },
      {
        provide: getRepositoryToken(PlateReviewerRepository),
        useValue: mockPlateReviewerRepo,
      },
    ],
  }).compile();

  const service = module.get<PlateReviewerService>(PlateReviewerService);
  const data = await service.unassignPlateToReviewer([
    { userId: "xuz", plateIds: ["asodiuh"] },
  ]);
  t.equal(data.message, "Success");
});

test("Unassign Reviewers to a Plates - Data not exist", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PlateReviewerService,
      {
        provide: getRepositoryToken(PlateRepository),
        useValue: mockPlateRepo,
      },
      {
        provide: getRepositoryToken(PlateReviewerRepository),
        useValue: {
          ...mockPlateReviewerRepo,
          findOne: (_data: any) => undefined,
        },
      },
    ],
  }).compile();

  const service = module.get<PlateReviewerService>(PlateReviewerService);
  const data = await service.unassignPlateToReviewer([
    { userId: "xuz", plateIds: ["asodiuh"] },
  ]);
  t.equal(data.message, "Success");
});
