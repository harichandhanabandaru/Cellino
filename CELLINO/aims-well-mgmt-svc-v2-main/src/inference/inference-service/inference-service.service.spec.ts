import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ImageEventService } from "../../image-event/image-event-service/image-event-service";
import { test } from "tap";
import { Inference } from "../../entities/inference.entity";
import { InferenceService } from "./inference-service.service";
import { ImageEvent } from "../../entities/image-event.entity";
import { ImageSetting } from "../../entities/image-setting.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { UserInfo } from "../../utils/user-info";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";
import { CreateInferenceRequest } from "src/dto/create-inference.dto";

const mockedInference = [
  {
    createdBy: "d63aa195-6c09-4584-95d6-5898b05acd15",
    createdAt: "2022-04-29T17:55:50.000Z",
    modifiedBy: "d63aa195-6c09-4584-95d6-5898b05acd15",
    modifiedAt: "2022-04-29T17:55:50.000Z",
    id: "d63aa195-6c09-4584-95d6-5898b05acd15",
    name: "Test",
    artifactPath: {},
    metadata: {},
    protocolId: "d63aa195-6c09-4584-95d6-5898b05acd15",
    imageSetting: {
      id: "d63aa195-6c09-4584-95d6-5898b05acd15",
    },
    imageEvent: {
      id: "d63aa195-6c09-4584-95d6-5898b05acd15",
    },
    imageAnalysisRequest: {
      id: "d63aa195-6c09-4584-95d6-5898b05acd15",
    },
  },
];

const mockedInferenceDTO = {
  id: "d63aa195-6c09-4584-95d6-5898b05acd15",
  name: "Test",
  artifactPath: {},
  metadata: {},
  protocolId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageSettingId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageAnalysisRequestId: "d63aa195-6c09-4584-95d6-5898b05acd15",
};

const mockedRepo = {
  find: (_data: any) => {
    return mockedInference;
  },
  findOne: (_data: any) => {
    return mockedInference[0];
  },
  findOneOrFail: (_data: any) => {
    return mockedInference[0];
  },
  save: (_data: any) => {
    return _data;
  },
};

const createRequest: CreateInferenceRequest = {
  name: "TEMP",
  artifactPath: undefined,
  protocolId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageAnalysisRequestId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  imageSettingId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  metadata: {},
};

test("Get By ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();

  const inferenceService = await module.get(InferenceService);
  const id = "d63aa195-6c09-4584-95d6-5898b05acd15";
  const inference = await inferenceService.getInferenceById(id);
  t.equal(id, inference.id);
});

test("Get By ID - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: {
          findOneOrFail: () => {
            throw new EntityNotFoundError(Inference, "");
          },
        },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();

  const inferenceService = await module.get(InferenceService);
  try {
    const id = "d63aa195-6c09-4584-95d6-5898b05acd15";
    await inferenceService.getInferenceById(id);
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, true);
  }
});

test("Get By ID - Other Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: {
          findOneOrFail: () => {
            throw new Error();
          },
        },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();

  const inferenceService = await module.get(InferenceService);
  try {
    const id = "d63aa195-6c09-4584-95d6-5898b05acd15";
    await inferenceService.getInferenceById(id);
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, false);
  }
});

test("Update", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  const inference = await service.update(
    "d63aa195-6c09-4584-95d6-5898b05acd15",
    [{ op: "replace", value: "UpdatedName", path: "/name" }],
    '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
  );
  t.equal(inference.name, "UpdatedName");
});

test("Update - Invalid ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  try {
    await service.update(
      "asdf",
      [{ op: "replace", value: "UpdatedName", path: "/name" }],
      '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
    );
    t.fail();
  } catch (e) {
    t.equal(e instanceof BadRequestException, true);
  }
});

test("Update - Not Found Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  try {
    await service.update(
      "d63aa195-6c09-4584-95d6-5898b05acd15",
      [{ op: "replace", value: "UpdatedName", path: "/name" }],
      '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
    );
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, true);
  }
});

test("Get Inferences", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  const inferences = await service.getInferences();
  t.equal(inferences.length, 1);
});

test("Get Inferences with ImageEvent ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  const inferences = await service.getInferences({
    imageEventId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  });
  t.equal(inferences.length, 1);
});

test("Get Inferences with AnalysisRequest ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {},
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {},
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  const inferences = await service.getInferences({
    imageAnalysisRequestId: "d63aa195-6c09-4584-95d6-5898b05acd15",
  });
  t.equal(inferences.length, 1);
});

test("Create", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  const inference = await service.create(
    createRequest,
    '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
  );
  t.not(inference.id.length, 0);
});

test("Create - ImageEvent Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  try {
    await service.create(
      createRequest,
      '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
    );
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, true);
    t.pass();
  }
});

test("Create - ImageSetting Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {
          findOne: () => undefined,
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  try {
    await service.create(
      createRequest,
      '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
    );
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, true);
    t.pass();
  }
});

test("Create - ImageAnalysisRequest Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InferenceService,
      {
        provide: getRepositoryToken(Inference),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {
          findOne: () => ({ id: "d63aa195-6c09-4584-95d6-5898b05acd15" }),
        },
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: {
          findOne: () => undefined,
        },
      },
      UserInfo,
    ],
  }).compile();
  const service = await module.get(InferenceService);
  try {
    await service.create(
      createRequest,
      '{"id":"d63aa195-6c09-4584-95d6-5898b05acd15"}'
    );
    t.fail();
  } catch (e) {
    t.equal(e instanceof NotFoundException, true);
    t.pass();
  }
});
