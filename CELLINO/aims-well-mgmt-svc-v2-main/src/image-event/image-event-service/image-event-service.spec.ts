import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ImageEvent } from "../../entities/image-event.entity";
import { test } from "tap";
import { ImageEventService } from "./image-event-service";
import { ImageSetting } from "../../entities/image-setting.entity";
import { Well } from "../../entities/well.entity";
import { plainToInstance } from "class-transformer";
import { UserInfo } from "../../utils/user-info";
import { UserDTO } from "../../dto/user.dto";
import { CreateImageEventRequestDTO } from "../../dto/create-image-event-request.dto";
import { Operation } from "fast-json-patch";
import { GetImageEventsDto } from "../../dto/get-image-events.dto";
import { ExternalRunService } from "../../utils/external-run.service";
import { BadRequestException } from "@nestjs/common";

global.fetch = () => {
  return new Promise((resolve, _reject) => {
    // @ts-ignore
    resolve({
      ok: true,
      status: 200,
      json: () => {
        return Promise.resolve({
          id: "7905c301-8bf2-40a6-88be-45eceec5ecb3",
          name: "CELL-001402",
          reviewers: ["0e78f9c3-ae1e-43cb-a79d-57b33139c5b6"],
          currentPhaseId: "58526f6b-0941-4ab3-8e1e-23c220dd8217",
          runId: "c100e05e-ac04-4374-aa65-40a594342eb2",
          barcode: "001402",
          labwareId: "aea0f61f-ad35-40b8-bb41-4afd4f413380",
          plateStatus: "KEEP",
          plateStatusReason: null,
          processMetadata: {
            passage_number: 0,
          },
          processStatus: "RETIRED",
          processStatusDetail: null,
          reviewStatus: "CONFIRMED",
          analysisStatus: "SUCCESS",
          analysisStatusDetail: null,
        });
      },
    });
  });
};

const mockedRepo = {
  findOne: (_data: any) => {
    return mockResponse;
  },
  findOneOrFail: (_data: any) => {
    return mockResponse;
  },
  save: (_data: any) => {
    return mockResponse;
  },
  find: (_data: any) => {
    const arr = [];
    arr.push(mockResponse);
    return arr;
  },
  findAndCount: (data: any) => {
    return [[mockResponse], 1];
  },
};

const mockedRepoWithIncorrectId = {
  findOne: () => {
    return null;
  },
  findOneOrFail: (_data: any) => {
    return null;
  },
  save: (_data: any) => {
    return mockResponse;
  },
};

const imageSettingsMock = plainToInstance(ImageSetting, {
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  name: "Test",
});

const wellMock = plainToInstance(Well, {
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  name: "well",
});

const imageEventWellMock = plainToInstance(Well, {
  image_event_id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  well_id: "d63aa195-6c09-4584-95d6-5898b05acd15",
});

const imageSettingRepo = {
  findOne: (_data: any) => {
    return imageSettingsMock;
  },
  findOneOrFail: (_data: any) => {
    return imageSettingsMock;
  },
};

const imageSettingRepoForIncorrectId = {
  findOne: (_data: any) => {
    return null;
  },
  findOneOrFail: () => {
    throw new Error();
  },
};

const wellRepo = {
  findOne: (_data: any) => {
    return wellMock;
  },
  findOneOrFail: () => {
    return wellMock;
  },
};

const wellRepoForIncorrectId = {
  findOne: (_data: any) => {
    return null;
  },
  findOneOrFail: (_data: any) => {
    return null;
  },
};

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
  getUserId: (id) => {
    return userMock;
  },
};

const mockedExternalRunSvc = {
  fetchEventById: (id: string) => {
    return { id };
  },
  fetchProtocolById: (id: string) => {
    return { id };
  },
  fetchProtocolByName: (id: string) => {
    return { id };
  },
  fetchPlateById: (id: string) => {
    return { id };
  },
  fetchPlateByBarcode: (id: string) => {
    return { id };
  },
};

const patchImageEventOperation: Array<Operation> = [
  {
    op: "replace",
    path: "/metadata",
    value: {
      FOV: {
        id: "",
      },
      image_center: {
        id: "",
      },
      resolution_levels: 4,
    },
  },
  { op: "replace", path: "/reviewStatus", value: "NOTSTARTED" },
  { op: "replace", path: "/analysisStatus", value: "INQUEUE" },
  { op: "replace", path: "/analysisStatusDetail", value: "test" },
];

const request = plainToInstance(CreateImageEventRequestDTO, {
  name: "test-image-event",
  startedAt: "2022-10-28T08:38:02.556Z",
  analysisStatus: "INQUEUE",
  protocol: {
    id: "70824293-ce79-41e6-baa1-96c7dc4574b5",
  },
  imageSettingId: "f29fc97b-668b-48b1-bc08-0627f0240607",
  eventId: "2ab68423-47ce-477e-a604-83c803903fcd",
  plate: {
    id: "2ab68423-47ce-477e-a604-83c803903fcd",
  },
  well: {
    wellPosition: "D8",
  },
});

const requestWithWellId = plainToInstance(CreateImageEventRequestDTO, {
  name: "test-image-event",
  startedAt: "2022-10-28T08:38:02.556Z",
  analysisStatus: "INQUEUE",
  protocol: {
    id: "70824293-ce79-41e6-baa1-96c7dc4574b5",
  },
  imageSettingId: "f29fc97b-668b-48b1-bc08-0627f0240607",
  event: {
    id: "2ab68423-47ce-477e-a604-83c803903fcd",
  },
  plate: {
    id: "2ab68423-47ce-477e-a604-83c803903fcd",
  },
  well: {
    id: "2ab68423-47ce-477e-a604-83c803903fcd",
  },
});

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
  artifactPath: {},
  derivedArtifacts: [],
  eventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  metadata: {},
  protocol: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageSetting: {
    id: "d63aa195-6c09-4584-95d6-5898b05acd15",
    channelType: 0,
  },
  reviewStatus: 0,
  analysisStatus: 0,
  analysisStatusDetail: "string",
};

test("Get By ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const id = "d63aa195-6c09-4584-95d6-5898b05acd15";
  const imageEvent = await service.getById(id);
  t.equal(id, imageEvent.id);
});

test("Get By ID - Bad Request Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const id = "ASDF";
  try {
    await service.getById(id);
    t.fail();
  } catch (err) {
    t.pass();
  }
});

test("Get By ID - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const id = "d63aa195-6c09-4584-95d6-5898b05acd15";
  try {
    await service.getById(id);
    t.fail();
  } catch (err) {
    t.pass();
  }
});

test("Register Image Event", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const response = await service.addImageEvent(
    request,
    '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
  );
  t.equal(response.startedAt, "2022-04-29T17:18:09.000Z");
});

test("Register Image Event with Plate Barcode", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
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
                id: "7905c301-8bf2-40a6-88be-45eceec5ecb3",
                name: "CELL-001402",
                reviewers: ["0e78f9c3-ae1e-43cb-a79d-57b33139c5b6"],
                currentPhaseId: "58526f6b-0941-4ab3-8e1e-23c220dd8217",
                runId: "c100e05e-ac04-4374-aa65-40a594342eb2",
                barcode: "001402",
                labwareId: "aea0f61f-ad35-40b8-bb41-4afd4f413380",
                plateStatus: "KEEP",
                plateStatusReason: null,
                processMetadata: {
                  passage_number: 0,
                },
                processStatus: "RETIRED",
                processStatusDetail: null,
                reviewStatus: "CONFIRMED",
                analysisStatus: "SUCCESS",
                analysisStatusDetail: null,
              },
            ],
          });
        },
      });
    });
  };

  const service = await module.get(ImageEventService);
  const response = await service.addImageEvent(
    { ...request, plate: { barcode: "12352" } },
    '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
  );
  t.equal(response.startedAt, "2022-04-29T17:18:09.000Z");
});

test("Register Image Event with Protocol Name", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const response = await service.addImageEvent(
    { ...request, protocol: { name: "TEMP" } },
    '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
  );
  t.equal(response.startedAt, "2022-04-29T17:18:09.000Z");
});

test("Register Image Event with Well ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const response = await service.addImageEvent(
    requestWithWellId,
    '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
  );
  t.equal(response.startedAt, "2022-04-29T17:18:09.000Z");
});

test("Register Image Event with incorrect Well ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: {
          findOneOrFail: () => {
            throw new Error();
          },
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  try {
    await service.addImageEvent(
      requestWithWellId,
      '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
    );
    t.fail();
  } catch (e) {
    t.equal(e instanceof BadRequestException, true);
  }
});

test("Register Image Event with incorrect ImageSetting ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepoForIncorrectId,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  try {
    await service.addImageEvent(
      requestWithWellId,
      '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
    );
    t.fail();
  } catch (e) {
    t.match(
      e.message,
      `The provided image setting id ${request.imageSettingId} is invalid`,
      `The provided image setting id ${request.imageSettingId} is invalid`
    );
  }
});

test("Update ImageEvent", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const response = await service.UpdateImageEvent(
    "d63aa195-6c09-4584-95d6-5898b05acd15",
    patchImageEventOperation,
    '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
  );
  t.equal(response.startedAt, "2022-04-29T17:18:09.000Z");
});

test("Update ImageEvent with incorrect ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepoWithIncorrectId,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  try {
    await service.UpdateImageEvent(
      "d63aa195-6c09-4584-95d6-5898b05acd15",
      patchImageEventOperation,
      '{"id":"98160914-f915-11ec-9674-5d27ec1cd471"}'
    );
    t.fail();
  } catch (e) {
    t.match(
      e.message,
      `The provided Image Event Id d63aa195-6c09-4584-95d6-5898b05acd15 is not found`,
      `The provided Image Event Id d63aa195-6c09-4584-95d6-5898b05acd15 is not found`
    );
  }
});

test("Get ImageEvents with Event ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const getImageEventsDto = new GetImageEventsDto();
  getImageEventsDto.eventId = "d63aa195-6c09-4584-95d6-5898b05acd15";
  getImageEventsDto.isBaseImage = true;
  const imageEvents = await service.getImageEvents(getImageEventsDto);
  t.equal(1, imageEvents.length);
});

test("Get ImageEvents with Well ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const getImageEventsDto = new GetImageEventsDto();
  getImageEventsDto.wellId = "d63aa195-6c09-4584-95d6-5898b05acd15";
  getImageEventsDto.analysisStatus = "INQUEUE";
  const imageEvents = await service.getImageEvents(getImageEventsDto);
  t.equal(1, imageEvents.length);
});

test("Get ImageEvents - Bad Request", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const getImageEventsDto = new GetImageEventsDto();
  try {
    await service.getImageEvents(getImageEventsDto);
    t.fail();
  } catch (e) {
    t.equal(e instanceof BadRequestException, true);
  }
});

test("Get Well Entity - Not found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      {
        provide: ExternalRunService,
        useValue: {
          fetchPlateById: () => undefined,
          fetchPlateByBarcode: () => undefined,
        },
      },
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
            error: "Not Found",
          });
        },
      });
    });
  };
  const service = await module.get(ImageEventService);
  try {
    await service.getWellEntity({ id: "ABC" }, { wellPosition: "ASD" });
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("Get Well Entity using Plate Barcode - Not found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: {
          fetchPlateById: () => undefined,
          fetchPlateByBarcode: () => ({ id: undefined }),
        },
      },
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
            error: "Not Found",
          });
        },
      });
    });
  };
  const service = await module.get(ImageEventService);
  try {
    await service.getWellEntity({ barcode: "ABC" }, {});
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("test : imageEventsGroupedByEventId", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const imageEvent = await service.imageEventsGroupedByEventId({
    wellId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  });
  t.equal(
    imageEvent?.[0]?.imageEvents?.[0]?.id,
    "d63aa195-6c09-4584-95d6-5898b05acd15"
  );
});

test("test : update is_base-image", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const imageEvent = await service.setBaseImage(
    {
      wellId: "d63aa195-6c09-4584-95d6-5898b05acd15",
      eventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
      imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
    },
    '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
  );
  t.equal(imageEvent.id, "d63aa195-6c09-4584-95d6-5898b05acd15");
});

test("test : update is_base-image with incorrect image event id ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: mockedRepoWithIncorrectId,
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  try {
    await service.setBaseImage(
      {
        wellId: "d63aa195-6c09-4584-95d6-5898b05acd15",
        eventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
        imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
      },
      '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("test : update is_base-image with no base image ", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageEventService,
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {
          findOne: (_data: any) => {
            return null;
          },
          findOneOrFail: () => {
            return mockResponse;
          },
          save: (_data: any) => {
            return mockResponse;
          },
        },
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: imageSettingRepo,
      },
      {
        provide: getRepositoryToken(Well),
        useValue: wellRepoForIncorrectId,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
      ExternalRunService,
      {
        provide: ExternalRunService,
        useValue: mockedExternalRunSvc,
      },
    ],
  }).compile();

  const service = await module.get(ImageEventService);
  const imageEvent = await service.setBaseImage(
    {
      wellId: "d63aa195-6c09-4584-95d6-5898b05acd15",
      eventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
      imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
    },
    '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
  );
  t.equal(imageEvent.id, "d63aa195-6c09-4584-95d6-5898b05acd15");
});
