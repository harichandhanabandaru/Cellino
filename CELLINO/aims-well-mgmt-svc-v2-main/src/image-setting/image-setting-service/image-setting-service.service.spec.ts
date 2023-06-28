import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ImageSetting } from "../../entities/image-setting.entity";
import { ImageSettingService } from "./image-setting-service.service";
import { test } from "tap";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserInfo } from "../../utils/user-info";
import { UserDTO } from "../../dto/user.dto";
import { CreateImageSettingRequest } from "../../dto/create-image-setting-request.dto";
import { FindImageSettingRequest } from "../../dto/find-image-setting-request.dto";

const mockedRepo = {
  findOne: (_data: any) => {
    return mockResponse;
  },
  find: (options) => {
    options.where.metadata["_getSql"]();
    return list;
  },
  createQueryBuilder: () => ({
    andWhere: () => {
      return null;
    },
    getMany: () => {
      return list;
    },
  }),
  save: () => {
    return mockResponse;
  },
};

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

const userMock: UserDTO = plainToInstance(UserDTO, {
  id: "60cc99bf-6351-40b7-af70-734fa6665559",
  firstName: "c",
  lastName: null,
  email: "c@gmail.com",
});

const mockResponse = plainToInstance(ImageSetting, {
  id: "f29fc97b-668b-48b1-bc08-0627f0240606",
  imageSettingName: "TL-20",
  channelType: "BRT",
  magnification: "10x",
  colorMap: "gray",
  metadata: {
    width_px: 12224,
    data_type: "zarr",
    height_px: 12224,
    z_offset_um: 0,
    pixel_size_um: 0.6753,
    objective_name: "10X Plan Apo Lambda",
    illuminator_level: null,
  },
  numberOfZStep: 4,
  zArray: [0, 15, 30, 45],
  zmin: 0,
  zmax: 45,
});

const list = new Array<ImageSetting>();
list.push(mockResponse);

const createImageSettingsRequest = plainToInstance(CreateImageSettingRequest, {
  name: "sample",
  channelType: "BRT",
  magnification: "4x",
  colorMap: "gray",
  zarray: [0, 15, 30, 45, 10],
  metadata: {
    width_px: 6144,
    data_type: "zarr",
    height_px: 6144,
    z_offset_um: 0,
    pixel_size_um: 1.6894,
    objective_name: "4X Plan Apo",
    illuminator_level: null,
  },
});

const findImageSettingRequest = plainToInstance(FindImageSettingRequest, {
  name: "TL-20",
  metadata: { width_px: 12224, data_type: "zarr" },
  colorMap: "gray",
  channelType: "BRT",
  magnification: "4x",
  zarray: [0, 15, 30, 45],
});

test("Get by ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageSettingService,
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: mockedRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageSettingService);
  const id = "f29fc97b-668b-48b1-bc08-0627f0240606";
  const imageSetting = await service.getById(id);
  t.equal(id, imageSetting.id);
});

test("Get by ID - Data Not Found", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageSettingService,
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {
          findOne: () => undefined,
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const protocolService = await module.get(ImageSettingService);
  try {
    await protocolService.getById("aa6fd36d-f78d-11ec-9674-5d27ec1cd472");
    t.fail();
  } catch (e) {
    t.type(e, NotFoundException);
  }
});

test("Get by ID - Bad Request Exception", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageSettingService,
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: mockedRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageSettingService);
  const id = "ABCD";
  try {
    await service.getById(id);
    t.fail();
  } catch (err) {
    t.pass();
  }
});

test("Add Image Setting", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageSettingService,
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: mockedRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageSettingService);
  const imageSetting = await service.addImageSetting(
    createImageSettingsRequest,
    '{ id: "f82946b4-85f7-4f96-b83b-9cbfb0083c0a" }'
  );
  t.equal(list[0].id, imageSetting.id);
});

test("Add Image Setting - Image Setting ID is provided", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageSettingService,
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: mockedRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const service = await module.get(ImageSettingService);
  const imageSetting = await service.addImageSetting(
    {
      ...createImageSettingsRequest,
      id: "f82946b4-85f7-4f96-b83b-9cbfb0083c0a"
    },
    '{ "id": "f82946b4-85f7-4f96-b83b-9cbfb0083c0a" }'
  );
  t.equal(list[0].id, imageSetting.id);
});

test("Find Image Setting", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageSettingService,
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: mockedRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageSettingService);
  const imageSetting = await service.findImageSettings(findImageSettingRequest);
  t.equal(list[0].name, imageSetting[0].name);
});

test("Find Image Setting - Empty Response", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ImageSettingService,
      {
        provide: getRepositoryToken(ImageSetting),
        useValue: {
          ...mockedRepo,
          find: () => [],
        },
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();
  const service = await module.get(ImageSettingService);
  try {
    await service.findImageSettings({});
    t.fail();
  } catch (e) {
    t.pass();
  }
});
