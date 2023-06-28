import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ImageEvent } from "../../entities/image-event.entity";
import { test } from "tap";
import { plainToInstance } from "class-transformer";
import { UserInfo } from "../../utils/user-info";
import { UserDTO } from "../../dto/user.dto";
import { CreateImageAnalysisRequestDTO } from "../../dto/create-image-analysis-request.dto";
import { AnalysisRequestStatus } from "../../entities/analysis-request-status.entity";
import { ImageAnalysisRequestService } from "./image-analysis-request-service";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ExternalRunService } from "../../utils/external-run.service";
import { PubSubPublisherService } from "../../utils/pub-sub-publisher.service";
import { TriggerAnalysisRequestDto } from "src/dto/trigger-analysis-request.dto";
import { EntityNotFoundError } from "typeorm";
import { NotFoundException } from "@nestjs/common";

const mockedRepo = {
  findOne: (_data: any) => {
    return mockResponse;
  },
  save: (_data: any) => {
    return _data;
  },
};

const mockedImageEventRepo = {
  findOne: (_data: any) => {
    return anlysisRequestStatusMock;
  },
  findOneOrFail: (_data: any) => {
    return anlysisRequestStatusMock;
  },
};

const mockedAnalysisRequestStatusRepo = {
  findOne: (_data: any) => {
    return imageEventMock;
  },
  findOneOrFail: (_data: any) => {
    return imageEventMock;
  },
};

const imageEventMock = plainToInstance(ImageEvent, {
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
});

const anlysisRequestStatusMock = plainToInstance(AnalysisRequestStatus, {
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  code: "in_queue",
  label: "In Queue",
});

const userMock: UserDTO = plainToInstance(UserDTO, {
  id: "60cc99bf-6351-40b7-af70-734fa6665559",
  firstName: "c",
  lastName: null,
  email: "c@gmail.com",
});

const mockedCorrectUserInfo = {
  getUserId: (id) => {
    return userMock;
  },
};

const request = plainToInstance(CreateImageAnalysisRequestDTO, {
  name: "test-image-analysis-request",
  startedAt: "2022-10-28T08:38:02.556Z",
  completeAt: "2022-10-28T08:38:02.556Z",
  statusCode: anlysisRequestStatusMock,
  statusDetails: "test",
  protocolId: "70824293-ce79-41e6-baa1-96c7dc4574b5",
  imageEvent: imageEventMock,
  isDeveloperMode: true,
  inputParameters: null,
});

const triggerAnalysisRequest: TriggerAnalysisRequestDto = {
  protocol: {
    name: "taufiqs_density_via_nuc_v2",
  },
  settings: {
    sigma: 30,
  },
  developerMode: true,
  context: {
    plate: {
      barcode: "300002",
    },
    well: {
      position: "B5",
    },
    imageEvent: {
      id: "671e1acc-7d0b-42ee-8260-4c1d5f908e40",
    },
    artifactPath: {
      bucket: "aims-storage-dev",
      project: "project-aims-dev",
      datatype: "zarr",
      blob_path:
        "Inference_Images/300002/B5/nuc_inference_map_sendai_x1356_m2D5_z0_4_8_12/TL-20-e332a037-3501-40e1-9a5e-370774d2892f",
      time_slice_index: 1,
    },
  },
};

// Mock Data

const mockResponse = {
  createdBy: "d63aa195-6c09-4584-95d6-5898b05acd15",
  createdAt: "2022-04-29T17:55:50.000Z",
  modifiedBy: "d63aa195-6c09-4584-95d6-5898b05acd15",
  modifiedAt: "2022-04-29T17:55:50.000Z",
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  name: "Test",
  startedAt: "2022-04-29T17:18:09.000Z",
  completedAt: "2022-04-29T17:57:02.000Z",
  statusCode: {},
  statusDetails: "test",
  imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  inptParameters: {},
  protocolId: "d63aa195-6c09-4584-95d6-5898b05acd15",
};

test("Create ImageAnalysisRequest", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve({
            content: [
              {
                id: "d63aa195-6c09-4584-95d6-5898b05acd15",
                name: "test",
              },
            ],
          });
        },
      });
    });
  };
  const service = await module.get(ImageAnalysisRequestService);
  const imageAnalysisRequest = await service.addImageAnalysisRequest(
    request,
    '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
  );
  t.not(imageAnalysisRequest.id, undefined);
});

test("Create ImageAnalysisRequest - Provided ImageEvent ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve({
            content: [
              {
                id: "d63aa195-6c09-4584-95d6-5898b05acd15",
                name: "test",
              },
            ],
          });
        },
      });
    });
  };
  const service = await module.get(ImageAnalysisRequestService);
  const imageAnalysisRequest = await service.addImageAnalysisRequest(
    { ...request, imageEventId: "70824293-ce79-41e6-baa1-96c7dc4574b5" },
    '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
  );
  t.not(imageAnalysisRequest.id, undefined);
});

test("Create ImageAnalysisRequest - Invalid Status", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: {
          findOne: () => undefined,
        },
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve({
            content: [
              {
                id: "d63aa195-6c09-4584-95d6-5898b05acd15",
                name: "test",
              },
            ],
          });
        },
      });
    });
  };
  const service = await module.get(ImageAnalysisRequestService);
  try {
    await service.addImageAnalysisRequest(
      request,
      '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("Create ImageAnalysisRequest - Invalid Protocol", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: false,
        status: 404,
        json: () => {
          return Promise.resolve({
            statusCode: 404,
            error: "Not Found",
          });
        },
      });
    });
  };
  const service = await module.get(ImageAnalysisRequestService);
  try {
    await service.addImageAnalysisRequest(
      request,
      '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("Create ImageAnalysisRequest - Error while saving", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          ...mockedRepo,
          save: () => {
            throw new Error();
          },
        },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  global.fetch = () => {
    return new Promise((resolve, _reject) => {
      // @ts-ignore
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve({
            content: [
              {
                id: "d63aa195-6c09-4584-95d6-5898b05acd15",
                name: "test",
              },
            ],
          });
        },
      });
    });
  };
  const service = await module.get(ImageAnalysisRequestService);
  try {
    await service.addImageAnalysisRequest(
      request,
      '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("Update ImageAnalysisRequest", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageAnalysisRequestService);
  const analysisRequest = await service.update(
    "70824293-ce79-41e6-baa1-96c7dc4574b5",
    [{ op: "replace", value: "TEMP", path: "/name" }],
    '{"id":"70824293-ce79-41e6-baa1-96c7dc4574b5"}'
  );

  t.equal(analysisRequest.name, "TEMP");
});

test("Update ImageAnalysisRequest - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: { ...mockedRepo, findOne: () => undefined },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageAnalysisRequestService);
  try {
    await service.update(
      "70824293-ce79-41e6-baa1-96c7dc4574b5",
      [{ op: "replace", value: "TEMP", path: "/name" }],
      '{"id":"70824293-ce79-41e6-baa1-96c7dc4574b5"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
    t.mock;
  }
});

test("Get By ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageAnalysisRequestService);
  const imageAnalysisRequest = await service.getById(
    "d63aa195-6c09-4584-95d6-5898b05acd15"
  );
  t.equal(imageAnalysisRequest.id, "d63aa195-6c09-4584-95d6-5898b05acd15");
});

test("Get By ID - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          findOne: () => {
            throw new EntityNotFoundError(ImageAnalysisRequest, "");
          },
        },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageAnalysisRequestService);
  try {
    await service.getById("d63aa195-6c09-4584-95d6-5898b05acd15");
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, true);
    t.pass();
  }
});

test("Get By ID - Other Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          findOne: () => {
            throw new Error();
          },
        },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageAnalysisRequestService);
  try {
    await service.getById("d63aa195-6c09-4584-95d6-5898b05acd15");
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, false);
    t.pass();
  }
});

test("Trigger Analysis", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: { ...mockedRepo, findOne: () => undefined },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      PubSubPublisherService,
      {
        provide: PubSubPublisherService,
        useValue: {
          publishAnalysisRequest: () => {
            console.log("Published PubSub Request");
          },
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageAnalysisRequestService);
  await service.triggerAnalysis(
    triggerAnalysisRequest,
    '{"id":"70824293-ce79-41e6-baa1-96c7dc4574b5"}'
  );
  t.pass();
});

test("Trigger Analysis - Protocol Not found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageAnalysisRequestService,
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: { ...mockedRepo, findOne: () => undefined },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedImageEventRepo,
      },
      {
        provide: getRepositoryToken(AnalysisRequestStatus),
        useValue: mockedAnalysisRequestStatusRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: {
          fetchProtocolById: () => undefined,
          fetchProtocolByName: () => undefined,
        },
      },
      PubSubPublisherService,
      {
        provide: PubSubPublisherService,
        useValue: {
          publishAnalysisRequest: () => {
            console.log("Published PubSub Request");
          },
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageAnalysisRequestService);
  try {
    await service.triggerAnalysis(
      triggerAnalysisRequest,
      '{"id":"70824293-ce79-41e6-baa1-96c7dc4574b5"}'
    );
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, true);
  }
});
