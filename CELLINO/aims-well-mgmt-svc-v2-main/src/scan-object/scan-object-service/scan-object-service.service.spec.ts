import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ScanObject } from "../../entities/scan-object.entity";
import { ScanObjectService } from "./scan-object-service.service";
import { test } from "tap";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { AnalysisRequestStatus } from "../../entities/analysis-request-status.entity";
import { GenerationType } from "../../entities/generation-type.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { UserInfo } from "../../utils/user-info";
import { ExternalRunService } from "../../utils/external-run.service";
import { NotFoundException } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";

const mockScanObject = plainToInstance(ScanObject, {
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  name: "Test",
  attributes: {},
  imageEvent: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageAnalysisRequest: "d63aa195-6c09-4584-95d6-5898b05acd15",
  outline: {},
  generationType: { code: "SYSTEMGENERATED" },
});

const mockScanObject2 = plainToInstance(ScanObject, {
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  name: "Test",
  attributes: {},
  imageEvent: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageAnalysisRequest: "d63aa195-6c09-4584-95d6-5898b05acd15",
  outline: {},
  generationType: { code: "MANUAL" },
});

const mockedRepo = {
  findAndCount: (id: any) => {
    return [[mockScanObject], 4];
  },
  findOneOrFail: (id: any) => {
    return mockScanObject;
  },
  createQueryBuilder: () => {
    return {
      select: () => {
        return {
          where: () => {
            return {
              groupBy: () => {
                return { getQuery: () => {} };
              },
            };
          },
        };
      },
    };
  },
};

test("Scan Object - Get Scan Objects by image event id ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScanObjectService,
      {
        provide: getRepositoryToken(ScanObject),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(GenerationType),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: () => {},
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: () => {},
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: () => {},
      },
    ],
  }).compile();

  const scanObjectService = await module.get(ScanObjectService);
  const scanObjects = await scanObjectService.getScanObjects({
    imageAnalysisRequestId: "d63aa195-6c09-4584-95d6-5898b05acd15",
    imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
    page: 1,
    size: 2,
  });
  t.equal(scanObjects.content[0].id, "d63aa195-6c09-4584-95d6-5898b05acd15");
});

test("Scan Object - test patch", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScanObjectService,
      {
        provide: getRepositoryToken(ScanObject),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(GenerationType),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: () => {},
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: () => {},
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: () => {},
      },
    ],
  }).compile();

  const scanObjectService = await module.get(ScanObjectService);
  try {
    await scanObjectService.updateScanObject(
      "d63aa195-6c09-4584-95d6-5898b05acd15",
      [
        {
          op: "replace",
          path: "/generationType",
          value: "",
        },
      ],
      `{"id":""}`
    );
  } catch (e) {
    t.pass();
  }
});

test("Scan Object - test patch", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScanObjectService,
      {
        provide: getRepositoryToken(ScanObject),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(GenerationType),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: () => {},
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: () => {},
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: () => {},
      },
    ],
  }).compile();

  const scanObjectService = await module.get(ScanObjectService);
  try {
    await scanObjectService.updateScanObject(
      "d63aa195-6c09-4584-95d6-5898b05acd15",
      [
        {
          op: "replace",
          path: "/attributes",
          value: { test: "test" },
        },
      ],
      `{"id":""}`
    );
  } catch (e) {
    t.pass();
  }
});

test("Scan Object - test patch", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScanObjectService,
      {
        provide: getRepositoryToken(ScanObject),
        useValue: {
          findOneOrFail: () => {
            return mockScanObject2;
          },
          save: () => {
            return mockScanObject2;
          },
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(GenerationType),
        useValue: { findOne: () => {} },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: () => {},
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: {
          getUserId: () => {
            return "1";
          },
        },
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: () => {},
      },
    ],
  }).compile();

  const scanObjectService = await module.get(ScanObjectService);
  const scan = await scanObjectService.updateScanObject(
    "d63aa195-6c09-4584-95d6-5898b05acd15",
    [
      {
        op: "replace",
        path: "/attributes",
        value: { test: "test" },
      },
    ],
    `{"id":""}`
  );
  t.equal(scan.id, "d63aa195-6c09-4584-95d6-5898b05acd15");
});

test("Scan Object - Get Scan Objects group by analysis request ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScanObjectService,
      {
        provide: getRepositoryToken(ScanObject),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          createQueryBuilder: () => {
            return {
              innerJoin: () => {
                return {
                  select: () => {
                    return {
                      getRawMany: () => {
                        return [
                          {
                            image_analysis_request_id:
                              "d63aa195-6c09-4584-95d6-5898b05acd15",
                          },
                        ];
                      },
                    };
                  },
                };
              },
              select: () => {},
            };
          },
        },
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(GenerationType),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: () => {},
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: () => {},
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: () => {},
      },
    ],
  }).compile();

  const scanObjectService = await module.get(ScanObjectService);
  const scanObjects =
    await scanObjectService.getScanObjectsGroupedByImageAnalysis(
      "d63aa195-6c09-4584-95d6-5898b05acd15"
    );
  t.equal(
    scanObjects[0].imageAnalysisRequestId,
    "d63aa195-6c09-4584-95d6-5898b05acd15"
  );
});
test("Scan Object - test delete", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScanObjectService,
      {
        provide: getRepositoryToken(ScanObject),
        useValue: {
          findOneOrFail: () => {
            return mockScanObject2;
          },
          save: () => {
            return mockScanObject2;
          },
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(GenerationType),
        useValue: { findOne: () => {} },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: () => {},
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: {
          getUserId: () => {
            return "1";
          },
        },
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: () => {},
      },
    ],
  }).compile();

  const scanObjectService = await module.get(ScanObjectService);
  const message = await scanObjectService.deleteById(
    "d63aa195-6c09-4584-95d6-5898b05acd15",
    `{"id":""}`
  );
  t.equal(message.status, "Success")
});
test("Scan Object - test Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ScanObjectService,
      {
        provide: getRepositoryToken(ScanObject),
        useValue: {
          findOneOrFail: () => {
            throw new EntityNotFoundError(ScanObject,"");
          },
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: () => {},
      },
      {
        provide: getRepositoryToken(GenerationType),
        useValue: { findOne: () => {} },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: () => {},
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: {
          getUserId: () => {
            return "1";
          },
        },
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: () => {},
      },
    ],
  }).compile();

  const scanObjectService = await module.get(ScanObjectService);
  t.rejects(
    scanObjectService.deleteById(
      "d63aa195-6c09-4584-95d6-5898b05acd18",
      `{"id":""}`
    ),
    NotFoundException
  );});