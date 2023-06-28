import ImageZoom from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<ImageZoom>", () => {
  test("Single item in wellSelector", () => {
    render(<ImageZoom zommValue={0} />);
    const element = screen.getByTestId("imageZoom");
    expect(element).toBeInTheDocument();
  });
});
