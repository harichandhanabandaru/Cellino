import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { CreateBioseroOrder } from "../../dto/create-biosero-order.dto";
import { UserDTO } from "../../dto/User.dto";
import { BioseroOrderType } from "../../entities/biosero-order-type.entity";
import { BioseroOrder } from "../../entities/biosero-order.entity";
import { UserInfo } from "../../utils/UserInfo";
import tap from "tap";
import { BioseroOrderService } from "./biosero-order-service";
import { isArray } from "class-validator";

const mockBioserOrder = plainToInstance(BioseroOrder, {
  id: "6a1eb557-8c65-4bfc-8ad9-857adf89a1fd",
  metadata: {
    identifier: "Order_00689",
    parentIdentifier: "Order_00686",
    restrictToModuleIds: "AIMS",
    moduleRestrictionStrategy: "NoRestriction",
    createdBy: "Order_00686",
    status: "Created",
    creationTime: "2022-11-21T13:55:10.0514+00:00",
    scheduledStartTime: "0001-01-01T00:00:00+00:00",
    actualStartTime: "0001-01-01T00:00:00+00:00",
    estimatedDuration: "00:00:00",
    actualEndTime: "0001-01-01T00:00:00+00:00",
    templateName: "Stitch Images v2",
    inputParameters: [
      {
        name: "acquisition_id",
        value: "",
        valueType: "String",
        defaultValue: "",
        valueOptions: [],
        validationRules: [],
        tags: [],
        description: "Acquisition ID of the files to be stitched.",
      },
      {
        name: "stitching_configuration",
        value: "stitching_v1",
        valueType: "String",
        defaultValue: "stitching_v1",
        valueOptions: [
          "stitching_v1",
          "stitching_example_v2",
          "stitching_example_v3",
        ],
        validationRules: [],
        tags: [],
        description:
          "Name of the stitching configuration to be applied to wells imaged in this acquisition_id.",
      },
    ],
    outputParameters: [
      {
        name: "stitching_result",
        value: "",
        valueType: "String",
        defaultValue: "",
        validationRules: [],
        tags: [""],
        description: "Result of the stitching operation.",
      },
    ],
    schedulingStrategy: "ImmediateExecution",
  },
  plateBarcode: "000123",
  wellPosition: "B5",
  protocolConfiguration: "configuration",
  status: "created",
  type: "stitching",
  createdAt: "2022-11-22T05:31:52.767Z",
});

const mockBioseroRepo = {
  save: (entity: any | any[]) => {
    if (isArray(entity)) {
      return [mockBioserOrder]
    }
    return mockBioserOrder;
  },
  find: (entity: any) => {
    const array = [];
    array.push(mockBioserOrder);
    return array;
  },
  delete: (entity: any) => {
    return { raw: "", affected: 1 };
  },
};

const mockBioseroRepoWithIncorrectId = {
  save: (entity: any) => {
    return mockBioserOrder;
  },
  find: (entity: any) => {
    const array = [];
    array.push(mockBioserOrder);
    return array;
  },
  delete: (entity: any) => {
    return { raw: "", affected: 0 };
  },
};

const mockTypeRepo = {
  find: (a: any) => {
    return [{ id: "5c7843be-7e77-4d52-9b66-ca1f058889e4", code: "stitching" }];
  },
};

const mockTypeIncorrectRepo = {
  findOne: (a: any) => {
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
    return "0712b029-1dde-4fc4-9df2-22ad681fce6a";
  },
};

const request = plainToInstance(CreateBioseroOrder, {
  metadata: {
    identifier: "Order_00689",
    parentIdentifier: "Order_00686",
    restrictToModuleIds: "AIMS",
    moduleRestrictionStrategy: "NoRestriction",
    createdBy: "Order_00686",
    status: "Created",
    creationTime: "2022-11-21T13:55:10.0514+00:00",
    scheduledStartTime: "0001-01-01T00:00:00+00:00",
    actualStartTime: "0001-01-01T00:00:00+00:00",
    estimatedDuration: "00:00:00",
    actualEndTime: "0001-01-01T00:00:00+00:00",
    templateName: "Stitch Images v2",
    inputParameters: [
      {
        name: "acquisition_id",
        value: "",
        valueType: "String",
        defaultValue: "",
        valueOptions: [],
        validationRules: [],
        tags: [],
        description: "Acquisition ID of the files to be stitched.",
      },
      {
        name: "stitching_configuration",
        value: "stitching_v1",
        valueType: "String",
        defaultValue: "stitching_v1",
        valueOptions: [
          "stitching_v1",
          "stitching_example_v2",
          "stitching_example_v3",
        ],
        validationRules: [],
        tags: [],
        description:
          "Name of the stitching configuration to be applied to wells imaged in this acquisition_id.",
      },
    ],
    outputParameters: [
      {
        name: "stitching_result",
        value: "",
        valueType: "String",
        defaultValue: "",
        validationRules: [],
        tags: [""],
        description: "Result of the stitching operation.",
      },
    ],
    schedulingStrategy: "ImmediateExecution",
  },
  type: "Stitching",
  status: "Created",
  plateBarcode: "000123",
  wellPosition: "B5",
  protocolConfigurationName: "configuration",
  createdAt: "2022-11-22T05:31:52.767Z",
});

const saveRequest = new Array<CreateBioseroOrder>();
saveRequest.push(request);

tap.test("Biosero Order Service - save", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      BioseroOrderService,
      {
        provide: getRepositoryToken(BioseroOrder),
        useValue: mockBioseroRepo,
      },
      {
        provide: getRepositoryToken(BioseroOrderType),
        useValue: mockTypeRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const bioseroOrderService = await module.get(BioseroOrderService);
  const order = await bioseroOrderService.saveBioseroOrders(
    saveRequest,
    '{"id":"f82946b4-85f7-4f96-b83b-9cbfb0083c0a"}'
  );
  t.equal(order[0].id, "6a1eb557-8c65-4bfc-8ad9-857adf89a1fd");
});

tap.test("Biosero Order Service - save with incorrect type", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      BioseroOrderService,
      {
        provide: getRepositoryToken(BioseroOrder),
        useValue: mockBioseroRepo,
      },
      {
        provide: getRepositoryToken(BioseroOrderType),
        useValue: mockTypeIncorrectRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const bioseroOrderService = await module.get(BioseroOrderService);
  try {
    await bioseroOrderService.saveBioseroOrders(
      saveRequest,
      '{"id":"f82946b4-85f7-4f96-b83b-9cbfb0083c0a"}'
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});

tap.test("Biosero Order Service - delete", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      BioseroOrderService,
      {
        provide: getRepositoryToken(BioseroOrder),
        useValue: mockBioseroRepo,
      },
      {
        provide: getRepositoryToken(BioseroOrderType),
        useValue: mockTypeRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const bioseroOrderService = await module.get(BioseroOrderService);
  const order = await bioseroOrderService.deleteOrder(
    "f82946b4-85f7-4f96-b83b-9cbfb0083c0a"
  );
  t.equal(order.id, "f82946b4-85f7-4f96-b83b-9cbfb0083c0a");
});

tap.test("Biosero Order Service - delete fail", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      BioseroOrderService,
      {
        provide: getRepositoryToken(BioseroOrder),
        useValue: mockBioseroRepoWithIncorrectId,
      },
      {
        provide: getRepositoryToken(BioseroOrderType),
        useValue: mockTypeRepo,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const bioseroOrderService = await module.get(BioseroOrderService);
  try {
    await bioseroOrderService.deleteOrder(
      "f82946b4-85f7-4f96-b83b-9cbfb0083c0a"
    );
    t.fail();
  } catch (e) {
    t.pass();
  }
});
