import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import tap from "tap";
import { plainToClass } from "class-transformer";
import { RunPlate } from "../../entities/run-plate.entity";
import { RunPlateService } from "./run-plate-service.service";
import { GetRunPlateRequestDto } from "../../dto/get-run-plate-request.dto";
import { Run } from "../../entities/run.entity";
import { Plate } from "../../entities/plate.entity";
import { Phase } from "../../entities/phase.entity";
import { UserInfo } from "../../utils/UserInfo";

const runPlate = plainToClass(RunPlate, {
  runId: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  plateId: "0712b029-1dde-4fc4-9df2-22ad681fce6b",
  phaseId: "0712b029-1dde-4fc4-9df2-22ad681fce6c",
});

const runMockByID = plainToClass(Run, {
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

const mockedUserInfo = { getUserById: (_userInfo: string) => "abc" };

const mockedRunRepoForId = {
  findOneOrFail: (_id: any) => {
    return runMockByID;
  },
};

const PhaseMock: Phase = plainToClass(Phase, {
  createdBy: null,
  createdAt: "2022-06-29T04:00:55.377Z",
  modifiedBy: null,
  modifiedAt: null,
  isDeleted: false,
  id: "2cfc0774-f78e-11ec-9674-5d27ec1cd472",
  name: null,
  phaseInitiationRules: [{ key: "1", value: "SUCCESS", operator: "AND" }],
  otherRules: [{ key: "1", value: 1, operator: "AND" }],
  phaseToProtocol: [
    {
      createdBy: null,
      createdAt: "2022-06-29T06:38:20.674Z",
      modifiedBy: null,
      modifiedAt: null,
      isDeleted: false,
      phaseId: null,
      protocol: {
        id: "2ad209ce-f7a4-11ec-9674-5d27ec1cd472",
      },
      protocolDefinitionId: null,
      settings: null,
    },
    {
      createdBy: null,
      createdAt: "2022-06-29T06:10:15.047Z",
      modifiedBy: null,
      modifiedAt: null,
      isDeleted: false,
      phaseId: null,
      protocol: {
        id: "3e1bc1d6-f7a0-11ec-9674-5d27ec1cd472",
      },
      protocolDefinitionId: null,
      settings: null,
    },
  ],
});

const mockedPhaseRepo = {
  findOneOrFail: (id) => {
    return PhaseMock;
  },
};

const plateMock: Plate = plainToClass(Plate, {
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
  event: [{ id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234" }],
  processMetdata: { downSelectionDay: 1 },
});

const mockedPlateRepo = {
  findOneOrFail: (id: any) => {
    return plateMock;
  },
};
const mockedRepo = {
  findAndCount: (_id: any) => {
    return Promise.resolve([[runPlate], 12]);
  },
  save: (data: any) => {
    return runPlate;
  },
};

const request = plainToClass(GetRunPlateRequestDto, {
  phaseIds: "0712b029-1dde-4fc4-9df2-22ad681fce6c",
  plateIds: "0712b029-1dde-4fc4-9df2-22ad681fce6c",
  runIds: "0712b029-1dde-4fc4-9df2-22ad681fce6c",
  passageNumbers: 1,
  page: 1,
  size: 5,
});

tap.test("Run Plate Service - GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunPlateService,
      {
        provide: getRepositoryToken(RunPlate),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedPlateRepo,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockedPhaseRepo,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRunRepoForId,
      },
    ],
  }).compile();

  const runPlateService = await module.get(RunPlateService);
  const runPlates = await runPlateService.getAll(request);
  t.equal(runPlates.content.length, 1);
});

tap.test("Run Plate Service - createRunPlatePhaseAssociation", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunPlateService,
      {
        provide: getRepositoryToken(RunPlate),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedPlateRepo,
      },
      {
        provide: getRepositoryToken(Phase),
        useValue: mockedPhaseRepo,
      },
      {
        provide: getRepositoryToken(Run),
        useValue: mockedRunRepoForId,
      },
      {
        provide: UserInfo,
        useValue: mockedUserInfo,
      },
    ],
  }).compile();

  const runPlateService = await module.get(RunPlateService);
  const runPlates = await runPlateService.createRunPlatePhaseAssociation(
    "0712b029-1dde-4fc4-9df2-22ad681fce6c",
    "0712b029-1dde-4fc4-9df2-22ad681fce6c",
    "0712b029-1dde-4fc4-9df2-22ad681fce6c",
    "0712b029-1dde-4fc4-9df2-22ad681fce6c"
  );
  t.equal(runPlates.runId, "0712b029-1dde-4fc4-9df2-22ad681fce6a");
});
