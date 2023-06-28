import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import WellHeatMapTimeSeries from "..";
import { wellData } from "../../../molecules/WellGrid/tests/mockData";

const timeFrameData = [
  {
    date: "2022-06-01T18:42:51.994Z",
    imageEvents: ["1", "2", "3"],
    runDay: "1",
  },
  {
    date: "2022-06-02T18:42:51.994Z",
    imageEvents: ["00", "11", "22"],
    runDay: "2",
  },
];

const selectedImageEvent = {
  id: "56",
  createdAt: "2022-06-24T18:42:51.994Z",
  createdBy: "",
  startedAt: "2022-06-24T18:42:51.994Z",
  completedAt: "2022-06-24T18:42:51.994Z",
  eventType: "ANALYSIS",
  name: "test-event",
  plateId: "2af434ae-302b-49f8-99f0-6493b46cdfd9",
  metadata: "{}",
  modifiedAt: "2022-06-24T18:42:51.994Z",
  modifiedBy: "",
};

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("heat map time series tests", () => {
  it("should match the time series component", () => {
    render(
      <MemoryRouter>
        <WellHeatMapTimeSeries
          plateId={"e567-9876"}
          attributeValue={"Confluence"}
          eventBasedWellData={wellData}
          eventData={timeFrameData}
          totalColonies={0}
          handleImageSelect={jest.fn()}
          totalCells={10}
          selectedEventImage={selectedImageEvent}
          plateStatus={""}
          plateProcessStatus={"RETIRED"}
          isCircular={false}
          aspectRatio={1}
          rows={4}
          columns={6}
        />
      </MemoryRouter>
    );
    const element = screen.getByText("01 Jun 2022");
    expect(element).toBeInTheDocument();
  });
});
