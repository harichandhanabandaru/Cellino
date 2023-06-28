import WellSelector from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<wellSelector", () => {
  test("check if wellSelector is present", () => {
    render(
      <WellSelector
        wellList={[]}
        selectedWellId={""}
        handleChange={jest.fn()}
      />
    );
    const element = screen.getByTestId("wellSelector");
    expect(element).toBeInTheDocument();
  });
});
