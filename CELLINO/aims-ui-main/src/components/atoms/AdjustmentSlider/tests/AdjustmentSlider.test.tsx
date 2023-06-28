import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AdjustmentSlider from "..";

describe("adjustment-slider test cases", () => {
  it("renders slider component", () => {
    const { container } = render(
      <AdjustmentSlider value={0} name={"Opacity"} />
    );
    expect(container).toBeInTheDocument();
  });

  it("check slider value", () => {
    render(<AdjustmentSlider value={50} name={"Opacity"} />);
    expect(screen.getByText("50 %")).toBeInTheDocument();
  });
});
