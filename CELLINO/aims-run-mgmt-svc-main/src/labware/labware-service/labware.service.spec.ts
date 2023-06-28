import tap from "tap";
import { plainToInstance } from "class-transformer";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { LabwareService } from "./labware.service";
import { Labware } from "../../entities/labware.entity";
import { GetLabwaresRequestDTO } from "../../dto/get-labwares-request-dto";
import { GetLabwaresResponseDTO } from "../../dto/get-labwares-response-dto";

const labwareMock = plainToInstance(Labware, {
  id: "0a23de08-ddca-4627-9901-1c50c9b05079",
  name: "Ibidi 96-well #1.5 no Ti Schott coverslip - Ibidi-made",
  labwareType: "PLATE",
  attributes: {
    rows: 8,
    volume: 300,
    columns: 12,
    circular: 0,
    x_offset: 14.199999809265137,
    y_offset: 11.550000190734863,
    z_offset: 0.8999999761581421,
    x_spacing: 9,
    y_spacing: 9,
    x_diameter: 7.400000095367432,
    y_diameter: 7.400000095367432,
    overall_x_dim: 127.76000213623047,
    overall_y_dim: 85.4800033569336,
    overall_z_dim: 15,
    coverslip_thickness: 120,
    coverslip_thickness_range: 15,
  },
  createdAt: "2021-03-29T18:30:00.000Z",
  createdBy: "49521bff-f37f-4d60-9f5d-7130e2350ec2",
  modifiedAt: "2021-03-29T18:30:00.000Z",
  modifiedBy: "49521bff-f37f-4d60-9f5d-7130e2350ec2",
  isActive: true,
});

const mockedRepo = {
  findOne: (_id: any) => {
    return labwareMock;
  },
  findAndCount: (id: any) => {
    return [[labwareMock], 4];
  },
};

tap.test("Labware Service - GetByID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      LabwareService,
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedRepo,
      },
    ],
  }).compile();

  const labwareService = await module.get(LabwareService);
  const labware = await labwareService.getById(
    "0a23de08-ddca-4627-9901-1c50c9b05079"
  );
  t.equal(labware.id, "0a23de08-ddca-4627-9901-1c50c9b05079");
});

tap.test("Labware Service - GetByID - BadRequestException", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      LabwareService,
      {
        provide: getRepositoryToken(Labware),
        useValue: {
          findOne: (_id: any) => undefined,
        },
      },
    ],
  }).compile();

  const labwareService = await module.get(LabwareService);

  try {
    await labwareService.getById("ABC");
    t.fail();
  } catch (e) {
    t.equal(e.message, LabwareService.BAD_REQUEST_ERROR_MESSAGE);
  }
});

tap.test("Labware Service - GetByID - NotFoundException", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      LabwareService,
      {
        provide: getRepositoryToken(Labware),
        useValue: {
          findOne: (_id: any) => undefined,
        },
      },
    ],
  }).compile();
  
  const labwareService = await module.get(LabwareService);
  
  try {
    await labwareService.getById("905f4be0-6806-42d6-be15-bdeeabac4199");
    t.fail();
  } catch (e) {
    t.equal(e.message, LabwareService.NOT_FOUND_ERROR_MESSAGE);
  }
});
tap.test("Labware Service - GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      LabwareService,
      {
        provide: getRepositoryToken(Labware),
        useValue: mockedRepo,
      },
    ],
  }).compile();
  const labwareService = await module.get(LabwareService);
  const request: GetLabwaresRequestDTO = {
    nameLike: "Ibidi",
    size: 10,
    page: 1,
    name: ""
  };
  const response: GetLabwaresResponseDTO = await labwareService.getAll(request);
  t.equal(response.pageInfo.totalElements, 4);
  t.equal(response.content[0].id, labwareMock.id);
});
