import { render, screen } from "@testing-library/react";
import { WellGrid } from "..";
import { wellData } from "./mockData";

describe("WellGrid", () => {
  test("render grids", () => {
    render(
      <WellGrid
        rows={8}
        columns={12}
        wellValues={wellData}
        onClick={jest.fn()}
        attributeValue="No of cells"
        totalColonies={0}
        totalCells={10}
        plateStatus={"Drop"}
        plateProcessStatus={"RETIRED"}
        isCircular={false}
        aspectRatio={1}
      />
    );
    expect(screen.getAllByTestId("Well")[0]).toBeInTheDocument();
  });
});
