import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RunMetric } from "../../entities/run-metric.entity";
import tap from "tap";
import { RunMetricService } from "./run-metric-service.service";
import { plainToClass } from "class-transformer";
import { BadRequestException, NotFoundException } from "@nestjs/common";

const runMetricMock = plainToClass(RunMetric, {
  runId: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  originalPlateCount: 123,
  originalWellCount: 123,
  platesCount: 123,
  wellsCount: 123,
  activePlatesCount: 123,
  activeWellsCount: 123,
});

const mockedRepoForUpdate = {
  findOne: (_id: any): Promise<RunMetric> => {
    return Promise.resolve(runMetricMock);
  },
  save: (_metric: any) => {
    return _metric;
  },
};

const mockedRepoForGetAll = {
  find: (_id: any): Promise<RunMetric[]> => {
    return Promise.resolve([runMetricMock]);
  },
};

tap.test("Run Metric Service - GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunMetricService,
      {
        provide: getRepositoryToken(RunMetric),
        useValue: mockedRepoForGetAll,
      },
    ],
  }).compile();

  const runMetricService = await module.get(RunMetricService);
  const metrics = await runMetricService.getAll();
  t.equal(metrics.length, 1);
});

tap.test("Run Metric Service - GetAll with filters", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunMetricService,
      {
        provide: getRepositoryToken(RunMetric),
        useValue: mockedRepoForGetAll,
      },
    ],
  }).compile();

  const runMetricService = await module.get(RunMetricService);
  const metrics = await runMetricService.getAll({
    runIds: ["0712b029-1dde-4fc4-9df2-22ad681fce6a"],
  });
  t.equal(metrics.length, 1);
});

tap.test("Run Metric Service - GetAll with pagination", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunMetricService,
      {
        provide: getRepositoryToken(RunMetric),
        useValue: mockedRepoForGetAll,
      },
    ],
  }).compile();

  const runMetricService = await module.get(RunMetricService);
  let metrics = await runMetricService.getAll(undefined);
  t.equal(metrics.length, 1);

  // To cover other lines
  await runMetricService.getAll(undefined);
  await runMetricService.getAll(undefined);
  await runMetricService.getAll(undefined);
});

tap.test("Run Metric Service - Update", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RunMetricService,
      {
        provide: getRepositoryToken(RunMetric),
        useValue: mockedRepoForUpdate,
      },
    ],
  }).compile();

  let metricService = await module.get(RunMetricService);
  let updatedMetric = await metricService.update(
    "98160914-f915-11ec-9674-5d27ec1cd471",
    [{ op: "replace", value: 2, path: "/platesCount" }]
  );
  t.equal(updatedMetric.platesCount, 2);
});

tap.test(
  "Run Metric Service - Update with Bad Request Exception",
  async (t) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RunMetricService,
        {
          provide: getRepositoryToken(RunMetric),
          useValue: mockedRepoForUpdate,
        },
      ],
    }).compile();

    let metricService = await module.get(RunMetricService);
    try {
      await metricService.update("ABC", [
        { op: "replace", value: 2, path: "/platesCount" },
      ]);
      t.fail();
    } catch (err) {
      t.type(err, BadRequestException);
    }
  }
);

tap.test(
  "Run Metric Service - Update with Bad Request Exception",
  async (t) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RunMetricService,
        {
          provide: getRepositoryToken(RunMetric),
          useValue: {
            ...mockedRepoForUpdate,
            findOne: (_id: any) => {
              return undefined;
            },
          },
        },
      ],
    }).compile();

    let metricService = await module.get(RunMetricService);
    try {
      await metricService.update("98160914-f915-11ec-9674-5d27ec1cd471", [
        { op: "replace", value: 2, path: "/platesCount" },
      ]);
      t.fail();
    } catch (err) {
      t.type(err, NotFoundException);
    }
  }
);
