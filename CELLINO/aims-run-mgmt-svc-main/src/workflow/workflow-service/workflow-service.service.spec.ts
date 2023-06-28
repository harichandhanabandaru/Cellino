import tap from "tap";
import { plainToClass } from "class-transformer";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Workflow } from "../../entities/workflow.entity";
import { WorkflowService } from "./workflow-service.service";

const workflowMock = plainToClass(Workflow, {
  id: "905f4be0-6806-42d6-be15-bdeeabac4199",
  name: "Cellino",
  workflowObjective: "Random Objective",
  workflowType: "Random Type",
  version: "9130128293119230129839123912831231254523452345",
  runs: [],
  workflowToPhase: []
});

const mockedRepo = {
  findOne: (_id: any): Promise<Workflow> => {
    return Promise.resolve(workflowMock);
  }
};

tap.test("Workflow Service - GetByID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      WorkflowService,
      {
        provide: getRepositoryToken(Workflow),
        useValue: mockedRepo,
      }
    ]
  }).compile();

  const workflowService = await module.get(WorkflowService);
  const workflow = await workflowService.getById('905f4be0-6806-42d6-be15-bdeeabac4199');
  t.equal(workflow.name, 'Cellino');
});


tap.test("Workflow Service - GetByID - BadRequestException", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      WorkflowService,
      {
        provide: getRepositoryToken(Workflow),
        useValue: {
          findOne: (_id: any) => undefined
        },
      }
    ]
  }).compile();

  const workflowService = await module.get(WorkflowService);

  try {
    await workflowService.getById('ABC');
    t.fail();
  } catch (e) {
    t.equal(e.message, WorkflowService.BAD_REQUEST_ERROR_MESSAGE);
  }
});

tap.test("Workflow Service - GetByID - NotFoundException", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      WorkflowService,
      {
        provide: getRepositoryToken(Workflow),
        useValue: {
          findOne: (_id: any) => undefined
        },
      }
    ]
  }).compile();

  const workflowService = await module.get(WorkflowService);

  try {
    await workflowService.getById('905f4be0-6806-42d6-be15-bdeeabac4199');
    t.fail();
  } catch (e) {
    t.equal(e.message, WorkflowService.NOT_FOUND_ERROR_MESSAGE);
  }
});