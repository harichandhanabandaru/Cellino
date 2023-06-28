import tap from "tap";
import { plainToInstance } from "class-transformer";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EventService } from "./event-service.service";
import { Event } from "../../entities/event.entity";
import { EventType } from "../../enums/EventType";
import { UserInfo } from "../../utils/UserInfo";
import { UserDTO } from "../../dto/User.dto";
import { Plate } from "../../entities/plate.entity";
import { Protocol } from "../../entities/protocol.entity";
import { CreateEventDTO } from "../../dto/create-event-dto";

const EventMock = plainToInstance(Event, {
  createdBy: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  createdAt: "2022-11-25T07:49:36.390Z",
  modifiedBy: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  modifiedAt: "2022-11-25T07:49:36.390Z",
  isDeleted: false,
  id: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  name: "Event 1",
  eventType: null,
  startedAt: null,
  completedAt: null,
  metadata: null,
  plate: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
  protocol: null,
  processStatus: 0,
  reviewStatus: 1,
  analysisStatus: 1,
  analysisStatusDetail: null,
  processStatusDetail: null,
});

const mockedRepo = {
  find: (_id: any): Promise<Event[]> => {
    return Promise.resolve([EventMock]);
  },
  findOne: (id) => {
    return EventMock;
  },
  save: (id: any) => {
    return EventMock;
  },
  insert: (entity: any) => {
    return { raw: [{ id: "577f7c00-9c4c-464f-ba07-7fe50cb6a63b" }] };
  },
};

const mockedRepoWithIncorrectEventId = {
  findOne: (id: any) => {
    return null;
  },
};

const userMock: UserDTO = plainToInstance(UserDTO, {
  id: "60cc99bf-6351-40b7-af70-734fa6665559",
  firstName: "c",
  lastName: null,
  email: "c@gmail.com",
});
const plateMock: Plate = plainToInstance(Plate, {
  createdBy: null,
  createdAt: "2022-07-01T02:42:48.281Z",
  modifiedBy: null,
  modifiedAt: null,
  isDeleted: false,
  id: "98160914-f915-11ec-9674-5d27ec1cd471",
  name: null,
  barcode: null,
  plateStatus: null,
  plateStatusReason: null,
  reviewers: null,
  processStatus: 0,
  processStatusDetail: null,
  processMetadata: null,
  reviewStatus: 0,
  analysisStatus: 0,
  analysisStatusDetail: null,
  labware: {
    id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
  },
  phase: {
    createdBy: null,
    createdAt: "2022-06-29T04:00:55.377Z",
    modifiedBy: null,
    modifiedAt: null,
    isDeleted: false,
    id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    name: null,
    phaseInitiationRules: [[Object]],
    otherRules: [[Object]],
  },
  runs: [
    {
      createdBy: null,
      createdAt: "2022-06-29T03:57:17.356Z",
      modifiedBy: null,
      modifiedAt: null,
      isDeleted: false,
      id: "aa6fd36d-f78d-11ec-9674-5d27ec1cd234",
      name: "iPSC101 v1.0 Run2",
      startDate: null,
      runOwnerId: null,
      runDay: null,
      runObjective: null,
      runSummary: null,
      runStatus: 0,
      cloneReviewStatus: null,
      metadata: null,
    },
    {
      createdBy: null,
      createdAt: "2022-06-29T03:57:16.297Z",
      modifiedBy: null,
      modifiedAt: null,
      isDeleted: false,
      id: "aa6fd36c-f78d-11ec-9674-5d27ec1cd234",
      name: "iPSC101 v1.0 Run1",
      startDate: null,
      runOwnerId: null,
      runDay: null,
      runObjective: null,
      runSummary: null,
      runStatus: 0,
      cloneReviewStatus: null,
      metadata: null,
    },
  ],
  event: [
    {
      id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
    },
  ],
  processMetdata: { downSelectionDay: 1 },
});

const protocolMock: Protocol = plainToInstance(Protocol, {
  id: "2cfc0774-f78e-11ec-9674-5d27ec1cd234",
  name: "protocol",
});
const mockedGetPlate = {
  findOne: (id: any) => {
    return plateMock;
  },
};
const mockedGetProtocol = {
  findOne: (id: any) => {
    return protocolMock;
  },
};
const mockedGetProtocolFail = {
  findOne: (id: any) => {
    return null;
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
    return "0712b029-1dde-4fc4-9df2-22ad681fce6a";
  },
};

const mock: CreateEventDTO = plainToInstance(CreateEventDTO, {
  id: "5af9f812-ce54-472a-8f72-bb4726e12afe",
  name: "test-event",
  eventType: "DELIVERY",
  plate: {
    id: "2af434ae-302b-49f8-99f0-6493b46cdfd8",
  },
  protocolId: "70824293-ce79-41e6-baa1-96c7dc4574b4",
  startedAt: "2022-10-26T05:17:28.346Z",
  reviewStatus: "INPROGRESS",
  processStatus: "IMAGING",
  analysisStatus: "INQUEUE",
});

const mockWithBarcode: CreateEventDTO = plainToInstance(CreateEventDTO, {
  id: "5af9f812-ce54-472a-8f72-bb4726e12afe",
  name: "test-event",
  eventType: "DELIVERY",
  plate: {
    barcode: "2af434ae-302b-49f8-99f0-6493b46cdfd8",
  },
  protocolId: "70824293-ce79-41e6-baa1-96c7dc4574b4",
  startedAt: "2022-10-26T05:17:28.346Z",
  reviewStatus: "INPROGRESS",
  processStatus: "IMAGING",
  analysisStatus: "INQUEUE",
});

const mockWithNoPlateDetails: CreateEventDTO = plainToInstance(CreateEventDTO, {
  id: "5af9f812-ce54-472a-8f72-bb4726e12afe",
  name: "test-event",
  eventType: "DELIVERY",
  plate: {},
  protocolId: "70824293-ce79-41e6-baa1-96c7dc4574b4",
  startedAt: "2022-10-26T05:17:28.346Z",
});

tap.test("Event Service - GetAll", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  const events = await eventService.getAll();
  t.equal(events.length, 1);
});

tap.test("Event Service - GetAll with params", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  const events = await eventService.getAll({
    plateId: "0712b029-1dde-4fc4-9df2-22ad681fce6a",
    eventType: EventType.MEDIACHANGE,
  });
  t.equal(events.length, 1);
});

tap.test("Event Service - create an event", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  const event = await eventService.addEvent(
    mock,
    '{"id":"0712b029-1dde-4fc4-9df2-22ad681fce6a"}'
  );
  t.equal(event.id, "0712b029-1dde-4fc4-9df2-22ad681fce6a");
});

tap.test("Event Service - create an event", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  const event = await eventService.addEvent(
    mockWithBarcode,
    '{"id":"0712b029-1dde-4fc4-9df2-22ad681fce6a"}'
  );
  t.equal(event.id, "0712b029-1dde-4fc4-9df2-22ad681fce6a");
});

tap.test(
  "Event Service - create an event with improper plate details",
  async (t) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockedRepo,
        },
        {
          provide: getRepositoryToken(Plate),
          useValue: mockedGetPlate,
        },
        {
          provide: getRepositoryToken(Protocol),
          useValue: mockedGetProtocolFail,
        },
        UserInfo,
        {
          provide: UserInfo,
          useValue: mockedCorrectUserInfo,
        },
      ],
    }).compile();

    const eventService = await module.get(EventService);
    try {
      await eventService.addEvent(
        mockWithNoPlateDetails,
        '{"id":"0712b029-1dde-4fc4-9df2-22ad681fce6a"}'
      );
      t.fail();
    } catch (e) {
      t.match(
        e.message,
        "The Plate details [object Object] provided is invalid",
        "The Plate details [object Object] provided is invalid"
      );
    }
  }
);

tap.test("Event Service - get an event by id", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  const id = "0712b029-1dde-4fc4-9df2-22ad681fce6a";
  const event = await eventService.getEventById(id);
  t.equal(id, event.id);
});

tap.test("Event Service - get an event with incorrect id", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepoWithIncorrectEventId,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocolFail,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  try {
    await eventService.getEventById("70824293-ce79-41e6-baa1-96c7dc4574b4");
    t.fail();
  } catch (e) {
    t.match(
      e.message,
      "The provided event Id 70824293-ce79-41e6-baa1-96c7dc4574b4 is not found",
      "The provided event Id 70824293-ce79-41e6-baa1-96c7dc4574b4 is not found"
    );
  }
});

tap.test("Event Service - update an event", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  const event = await eventService.updateEvent(
    "0712b029-1dde-4fc4-9df2-22ad681fce6a",
    [
      {
        op: "replace",
        path: "/protocolId",
        value: "d6ca3e8a-a5da-434a-9f46-bddcd62993cf",
      },
    ],
    '{"id":"0712b029-1dde-4fc4-9df2-22ad681fce6a"}'
  );
  t.equal(event.id, "0712b029-1dde-4fc4-9df2-22ad681fce6a");
});

tap.test("Event Service - update an event with incorrect ID", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepoWithIncorrectEventId,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  try {
    await eventService.updateEvent(
      "0712b029-1dde-4fc4-9df2-22ad681fce6a",
      [
        {
          op: "replace",
          path: "/protocolId",
          value: "d6ca3e8a-a5da-434a-9f46-bddcd62993cf",
        },
      ],
      '{"id":"0712b029-1dde-4fc4-9df2-22ad681fce6a"}'
    );
    t.fail();
  } catch (e) {
    t.match(
      e.message,
      "The provided Event Id 0712b029-1dde-4fc4-9df2-22ad681fce6a is not found",
      "The provided Event Id 0712b029-1dde-4fc4-9df2-22ad681fce6a is not found"
    );
  }
});

tap.test("Event Service - get an event by id", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EventService,
      {
        provide: getRepositoryToken(Event),
        useValue: mockedRepo,
      },
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedGetPlate,
      },
      {
        provide: getRepositoryToken(Protocol),
        useValue: mockedGetProtocol,
      },
      UserInfo,
      {
        provide: UserInfo,
        useValue: mockedCorrectUserInfo,
      },
    ],
  }).compile();

  const eventService = await module.get(EventService);
  const event = await eventService.getEventById(
    "0712b029-1dde-4fc4-9df2-22ad681fce6a"
  );
  t.equal(event.id, "0712b029-1dde-4fc4-9df2-22ad681fce6a");
});
