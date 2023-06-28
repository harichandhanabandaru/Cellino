import ConflueneScale from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<ConflueneScale>", () => {
  test("vertical bar component", () => {
    const handleChange = jest.fn();
    render(
      <ConflueneScale
        value="No. of cells"
        handleDropdownChange={handleChange}
      />
    );
    const element = screen.getByText("No. of cells");
    expect(element).toBeInTheDocument();
  });
});
