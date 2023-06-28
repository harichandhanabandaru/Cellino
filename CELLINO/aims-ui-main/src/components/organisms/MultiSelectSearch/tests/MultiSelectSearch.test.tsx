import { render, screen } from "@testing-library/react";
import MultiSelectSearch from "..";

describe("MultiSelectSearch test cases", () => {
  test("MultiSelectSearch rendered", () => {
    render(
      <MultiSelectSearch label={"Plate Name"} setSearchTextList={() => {}} />
    );
    const element = screen.getByText("Plate Name");
    expect(element).toBeInTheDocument();
  });
});
