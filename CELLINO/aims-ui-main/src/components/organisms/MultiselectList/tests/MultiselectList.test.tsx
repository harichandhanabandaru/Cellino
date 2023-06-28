import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import MultiselectList from "..";
import {
  RunAndPassageFilterData,
  renderRunAndPassageName,
} from "../../PlatesView/renderers/renderRunAndPassageName";

const data: RunAndPassageFilterData[] = [
  { id: "Cell", name: "Cell" },
  { id: "Well", name: "Well" },
  { id: "Run", name: "Run" },
  { id: "Plate", name: "Plate" },
  { id: "Colony", name: "Colony" },
];

const TestComponent: React.FC = () => {
  const [filteredData, setFilteredData] = useState<RunAndPassageFilterData[]>(
    []
  );

  return (
    <>
      <MultiselectList
        label={"Run Name"}
        data={data}
        selectedData={filteredData}
        setSelectedData={setFilteredData}
        renderOption={renderRunAndPassageName}
        getOptionLabel={(option) => option.name}
      />
    </>
  );
};

describe("MultiselectList test cases", () => {
  test("MultiselectList rendered", () => {
    render(<TestComponent />);
    const element = screen.getByText("Run Name");
    expect(element).toBeInTheDocument();
  });

  test("Multiselect selected options", async () => {
    render(<TestComponent />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() =>
      expect(screen.getByTestId("autocomplete")).toBeVisible()
    );

    const option1 = screen.getByText("Cell");
    fireEvent.click(option1);
    fireEvent.mouseDown(option1);

    const currentValue = screen.getByText("Cell");
    fireEvent.click(currentValue);
  });
});
