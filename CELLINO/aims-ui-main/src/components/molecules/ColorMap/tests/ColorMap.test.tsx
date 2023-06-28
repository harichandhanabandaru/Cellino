import { fireEvent, render, screen } from "@testing-library/react";
import ColorMap from "..";

describe("ColorMap Test cases", () => {
  test("ColorMap rendering", () => {
    render(<ColorMap color="Blue" handleColormapChange={jest.fn()} />);
    const element = screen.getByText("Colormap");
    expect(element).toBeInTheDocument();
  });

  test("dropdown popup contains color options", () => {
    render(<ColorMap color="Blue" handleColormapChange={jest.fn()} />);
    const element = screen.getByText("Blue");
    fireEvent.mouseDown(element);

    const option = screen.getByText("Green");
    expect(option).toBeInTheDocument();
  });
});
