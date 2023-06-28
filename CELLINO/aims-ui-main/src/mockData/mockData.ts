import { AssignPlateData } from "../components/organisms/ReviewersView/AssignPlatesTab";

export const leftPanList = [
  {
    id: 1,
    name: "Metrics",
    imgSource: "chart-bar.png",
    routeTo: "/Metrics",
  },
  {
    id: 2,
    name: "Plates",
    imgSource: "layout-4-blocks.png",
    routeTo: "/MyPlates",
  },
  {
    id: 3,
    name: "Runs",
    imgSource: "experiment.png",
    routeTo: "/Runs",
  },
  {
    id: 4,
    name: "Reports",
    imgSource: "group-chat.png",
    routeTo: "/Reports",
  },
  {
    id: 5,
    name: "Cell Lines",
    imgSource: "file.png",
    routeTo: "/CellLines",
  },
  {
    id: 6,
    name: "Users",
    imgSource: "user.png",
    routeTo: "/Users",
  },
  {
    id: 7,
    name: "Settings",
    imgSource: "settings.png",
    routeTo: "/Settings",
  },
];

export const user = {
  name: "Rosie",
  source: "Rosy.png",
  role: "Reviewer",
};

export const MOCK_RUN_DETAILS = {
  name: "IPSC101  V1.0 Run1",
  workflowType: "Development",
  status: "INPROGRESS",
  startDate: "03/04/22",
  NoofPlates: 10,
  NoofWells: 20,
  activePlates: 5,
  activeWells: 17,
  originalPlates: 4,
  originalWells: 3,
  reviewer: "Rosie",
  runDay: 10,
};

export const MOCK_RUN_TABS = {
  creatorId: "",
  id: "dc092d5e",
  name: "test-run",
  objective: "",
  partnerId: "baaccf7c",
  processId: "1e96cf2e",
  runDay: "1",
  seedingDay: "2022-06-10T11:01:00.147Z",
  summary: "",
  workflowId: "",
};

export const MOCK_RUN_TABS_METADATA = {
  runId: "IPSC101  V1.0 Run1",
  partnerId: "IPSC101  V1.0 Run1",
  orderId: "IPSC101  V1.0 Run1",
  requestId: "IPSC101  V1.0 Run1",
};

export const MOCK_PLATES = [
  "x1412",
  "x1413",
  "x1408",
  "x1407",
  "x1404",
  "x1403",
  "x1415",
  "x1543",
];

export const AssignPlatesMock: AssignPlateData[] = [
  {
    runId: "1234",
    runName: "ABC",
    checked: false,
    plates: [
      {
        id: "634",
        name: "Plate 1",
        checked: false,
      },
      {
        id: "6342",
        name: "Plate 2",
        checked: false,
      },
    ],
  },
];
