import { fireEvent, render, screen } from "@testing-library/react";
import DropDown from "..";

describe("Dropdown Test cases", () => {
  test("dropdown rendering", () => {
    render(
      <DropDown
        defaultValue="No. of cells"
        options={[
          "Confluence",
          "Interior confluence",
          "No. of cells",
          "No. of colonies",
          "Contamination Score",
        ]}
        handleChange={jest.fn()}
        value={"No. of cells"}
      />
    );
    const element = screen.getByText("No. of cells");
    expect(element).toBeInTheDocument();
  });

  test("dropdown popup contains all options", () => {
    render(
      <DropDown
        defaultValue="Confluence"
        options={[
          "Confluence",
          "Interior confluence",
          "No. of cells",
          "No. of colonies",
          "Contamination Score",
        ]}
        handleChange={jest.fn()}
        value={"Confluence"}
      />
    );
    const element = screen.getByText("Confluence");
    fireEvent.mouseDown(element);

    const option = screen.getByText("Interior confluence");
    expect(option).toBeInTheDocument();
  });
});
