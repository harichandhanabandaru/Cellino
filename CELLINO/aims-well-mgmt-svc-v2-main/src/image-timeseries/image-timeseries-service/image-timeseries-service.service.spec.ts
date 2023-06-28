import { getRepositoryToken } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { CreateImageTimeseriesRequest } from "../../dto/create-image-timeseries.dto";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { ImageTimeseries } from "../../entities/image-timeseries.entity";
import { ImageEventService } from "../../image-event/image-event-service/image-event-service";
import { ImageTimeseriesService } from "./image-timeseries-service.service";
import { test } from "tap";
import { Test, TestingModule } from "@nestjs/testing";
import { UserInfo } from "../../utils/user-info";

const mockedRepo = {
  save: (_data: any) => {
    return mockResponse;
  },
  query: (_query: string) => {
    return mockResponse;
  },
  find: () => {
    return [mockResponse];
  },
  findAndCount: () => {
    return [[mockResponse], 1];
  },
};

const mockResponse = plainToInstance(ImageTimeseries, {
  id: "22e48ee1-adad-4453-ad13-c836d7fb7702",
  wellId: "db90b1e5-68f0-4664-a980-02556be9df41",
  imageEventId: "56aea4d2-6992-4efc-bc5d-b13b4e19d27f",
  imageAnalysisRequestId: "462c0ee5-e9b9-475f-a4b2-b555f9b0ce1c",
  imageMetadata: {
    cell_count: 85881,
    confluence: 0.89,
  },
});

const mockAnalysisRepo = {
  findOne: (_id: any) => {
    return { id: "22e48ee1-adad-4453-ad13-c836d7fb7702" };
  },
};

const mockAnalysisRepoWithIncorrectId = {
  findOne: (_id: any) => {
    return null;
  },
};

const imageEventRepo = {
  findOne: (_id: any) => {
    return { id: "22e48ee1-adad-4453-ad13-c836d7fb7702" };
  },
};

const failedImageEventRepo = {
  findOne: (_id: any) => {
    return undefined;
  },
};

const mockUser = {
  getUserId: (data: any) => {
    return "22e48ee1-adad-4453-ad13-c836d7fb7702";
  },
};

const request = plainToInstance(CreateImageTimeseriesRequest, {
  plate: {
    barcode: "001394",
  },
  well: {
    wellPosition: "B5",
  },
  imageEventId: "56aea4d2-6992-4efc-bc5d-b13b4e19d27f",
  imageAnalysisRequestId: "462c0ee5-e9b9-475f-a4b2-b555f9b0ce1c",
  measurements: {
    cell_count: 85881,
    confluence: 0.89,
  },
});

const imageEventServiceMock = {
  getWellEntity: (plateData: any, wellData: any) => {
    return { id: "22e48ee1-adad-4453-ad13-c836d7fb7702" };
  },
};

test("Register Image Timeseries", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageTimeseriesService,
      {
        provide: getRepositoryToken(ImageTimeseries),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockAnalysisRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: imageEventRepo,
      },
      ImageEventService,
      {
        provide: ImageEventService,
        useValue: imageEventServiceMock,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockUser,
      },
    ],
  }).compile();

  const service = await module.get(ImageTimeseriesService);
  const response = await service.saveImageTimeseries(
    request,
    `{"id":"22e48ee1-adad-4453-ad13-c836d7fb7702"}`
  );
  t.equal(response.id, "22e48ee1-adad-4453-ad13-c836d7fb7702");
});

test("Register Image Timeseries - No Image Analysis Request", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageTimeseriesService,
      {
        provide: getRepositoryToken(ImageTimeseries),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockAnalysisRepoWithIncorrectId,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: imageEventRepo,
      },
      ImageEventService,
      {
        provide: ImageEventService,
        useValue: imageEventServiceMock,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockUser,
      },
    ],
  }).compile();

  const service = await module.get(ImageTimeseriesService);
  try {
    await service.saveImageTimeseries(
      request,
      `{"id":"22e48ee1-adad-4453-ad13-c836d7fb7702"}`
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("Register Image Timeseries - No Image Event Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageTimeseriesService,
      {
        provide: getRepositoryToken(ImageTimeseries),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockAnalysisRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: failedImageEventRepo,
      },
      ImageEventService,
      {
        provide: ImageEventService,
        useValue: imageEventServiceMock,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockUser,
      },
    ],
  }).compile();

  const service = await module.get(ImageTimeseriesService);
  try {
    await service.saveImageTimeseries(
      request,
      `{"id":"22e48ee1-adad-4453-ad13-c836d7fb7702"}`
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("Get Image Timeseries", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageTimeseriesService,
      {
        provide: getRepositoryToken(ImageTimeseries),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockAnalysisRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: imageEventRepo,
      },
      ImageEventService,
      {
        provide: ImageEventService,
        useValue: imageEventServiceMock,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockUser,
      },
    ],
  }).compile();

  const service = await module.get(ImageTimeseriesService);
  const imageMeasurements = await service.getImageTimeseries({
    wellId: "ABC",
    developerMode: true,
  });
});

test("test getImageTimeseriesV2", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageTimeseriesService,
      {
        provide: getRepositoryToken(ImageTimeseries),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(ImageAnalysisRequest),
        useValue: mockAnalysisRepo,
      },
      {
        provide: getRepositoryToken(ImageEvent),
        useValue: imageEventRepo,
      },
      ImageEventService,
      {
        provide: ImageEventService,
        useValue: imageEventServiceMock,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockUser,
      },
    ],
  }).compile();

  const service = await module.get(ImageTimeseriesService);
  const imageMeasurements = await service.getImageTimeseriesV2({
    imageEventId: "1234",
    isDeveloperMode: true,
    page: 1,
    size: 5,
  });
  t.equal(
    imageMeasurements.content[0].id,
    "22e48ee1-adad-4453-ad13-c836d7fb7702"
  );
});
