import { plainToClass } from "class-transformer";
import { Phase } from "../../entities/phase.entity";
import { PhaseService } from "./phase-service.service";
import tap from "tap";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PhaseDto } from "../../dto/phase-dto.dto";

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

let phaseService: PhaseService;
const mockedRepo = {
  findOne: (id) => {
    return PhaseMock;
  },
};
const mockedRepoForGetall = {
  find: () => {
    const list: Phase[] = [];
    list.push(PhaseMock);
    return list;
  },
};

const mockedRepoForFailedGetall = {
  find: () => {
    const list: Phase[] = [];
    return list;
  },
};

const mockedRepoWithFalseId = {
  findOne: (id) => {
    return undefined;
  },
};

tap.test("test phase service with correct id ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PhaseService,
      {
        provide: getRepositoryToken(Phase),
        useValue: mockedRepo,
      },
    ],
  }).compile();
  phaseService = await module.get(PhaseService);
  const phase = await phaseService.getPhaseById(
    "2cfc0774-f78e-11ec-9674-5d27ec1cd472"
  );
  t.equal(phase.id, "2cfc0774-f78e-11ec-9674-5d27ec1cd472");
});

tap.test("test phase service with incorrect id ", async (t) => {
  const moduleMock: TestingModule = await Test.createTestingModule({
    providers: [
      PhaseService,
      {
        provide: getRepositoryToken(Phase),
        useValue: mockedRepoWithFalseId,
      },
    ],
  }).compile();
  phaseService = await moduleMock.get(PhaseService);
  try {
    await phaseService.getPhaseById("2cfc0774-f78e-11ec-9674-5d27ec1cd472");
    t.fail("async thrower did not throw");
  } catch (e) {
    t.match(
      e.message,
      /The provided Id 2cfc0774-f78e-11ec-9674-5d27ec1cd472 is not found/,
      "The provided Id 2cfc0774-f78e-11ec-9674-5d27ec1cd472 is not found"
    );
  }
});

tap.test("test phase service with incorrect id ", async (t) => {
  const moduleMock: TestingModule = await Test.createTestingModule({
    providers: [
      PhaseService,
      {
        provide: getRepositoryToken(Phase),
        useValue: mockedRepoWithFalseId,
      },
    ],
  }).compile();
  phaseService = await moduleMock.get(PhaseService);
  try {
    await phaseService.getPhaseById("2cfc0774-f78e-11ec-9674-5");
    t.fail("async thrower did not throw");
  } catch (e) {
    t.match(
      e.message,
      /Phase id provided 2cfc0774-f78e-11ec-9674-5 is not an uuid/,
      "Phase id provided 2cfc0774-f78e-11ec-9674-5 is not an uuid"
    );
  }
});

tap.test("test get all phases ", async (t) => {
  const moduleMock: TestingModule = await Test.createTestingModule({
    providers: [
      PhaseService,
      {
        provide: getRepositoryToken(Phase),
        useValue: mockedRepoForGetall,
      },
    ],
  }).compile();
  phaseService = await moduleMock.get(PhaseService);
  const response: PhaseDto[] = await phaseService.getAllPhases();
  t.equal(response?.length, 1);
});

tap.test("test get all phases ", async (t) => {
  const moduleMock: TestingModule = await Test.createTestingModule({
    providers: [
      PhaseService,
      {
        provide: getRepositoryToken(Phase),
        useValue: mockedRepoForFailedGetall,
      },
    ],
  }).compile();
  phaseService = await moduleMock.get(PhaseService);
  const response: PhaseDto[] = await phaseService.getAllPhases();
  t.equal(response?.length, 0);
});
