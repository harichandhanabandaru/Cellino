import { render, screen } from "@testing-library/react";
import WellSensorTimeSeriesDataAccordion from "../index";
import userEvent from "@testing-library/user-event";

describe("WellSensorTimeSeriesDataAccordion", function () {
  it("should be trigger onExpandedChange", async function () {
    const onExpandedChange = jest.fn();
    render(
      <WellSensorTimeSeriesDataAccordion
        dailyAverageTemp={"-"}
        dailyMaxTemp={"-"}
        ph={"-"}
        o2Level={"-"}
        co2Level={"-"}
        expanded={true}
        onExpandedChange={onExpandedChange}
      />
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Sensor timeseries data" })
    );
    expect(onExpandedChange).toBeCalledWith(false);
  });
  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    render(
      <WellSensorTimeSeriesDataAccordion
        dailyAverageTemp={"-"}
        dailyMaxTemp={"-"}
        ph={"-"}
        o2Level={"-"}
        co2Level={"-"}
        expanded={true}
        onExpandedChange={onExpandedChange}
      />
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Sensor timeseries data" })
    );
    expect(onExpandedChange).toBeCalledWith(false);
  });
});
