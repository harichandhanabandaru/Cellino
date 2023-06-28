import WellSelectorItem from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<wellSelectorItem>", () => {
  test("Single item in wellSelector", () => {
    render(<WellSelectorItem name="B2" status="InProgress" />);
    const element = screen.getByTestId("wellSelectorItem");
    expect(element).toBeInTheDocument();
  });
});
