import { render, screen } from "@testing-library/react";
import HeatMapDateRange from "..";

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

const requiredImageEventData = [
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

describe("heat map date range", () => {
  it("should match the heat map date range", () => {
    const handleDecreaseDate = jest.fn();
    const handleIncreaseDate = jest.fn();
    render(
      <HeatMapDateRange
        handleDecreaseDate={handleDecreaseDate}
        handleIncreaseDate={handleIncreaseDate}
        imageEventData={requiredImageEventData}
        timeFrameData={timeFrameData}
      />
    );
    const element = screen.getByText(
      "01 Jun 2022 (Day 1) - 02 Jun 2022 (Day 2)"
    );
    expect(element).toBeInTheDocument();
  });
});
