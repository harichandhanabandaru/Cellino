import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeatMapStepperItem from "..";

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

describe("heat map stepper item", () => {
  it("should match heatmap stepper item", () => {
    render(
      <HeatMapStepperItem
        listOfEvents={["a", "b", "c"]}
        runDay="32"
        date="23 March 2022"
        setSelectedEventImageId={jest.fn()}
        selectedEventImageId={selectedImageEvent}
      />
    );
    const element = screen.getByText("Run day 32");
    expect(element).toBeInTheDocument();
  });
  it("should match the set selected event image id", async () => {
    const handleSelectedImageEvent = jest.fn();
    render(
      <HeatMapStepperItem
        listOfEvents={["a", "b", "c"]}
        runDay="32"
        date="23 March 2022"
        setSelectedEventImageId={handleSelectedImageEvent}
        selectedEventImageId={selectedImageEvent}
      />
    );
    await userEvent.click(screen.getAllByTestId("label")[0]);
    expect(handleSelectedImageEvent).toBeCalledTimes(1);
  });
});
