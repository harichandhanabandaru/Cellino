import { render, screen } from "@testing-library/react";
import ColorOpacity from "..";

describe("Color opacity tests", () => {
  test("it should match the color opacity item", () => {
    render(
      <ColorOpacity
        opacity={0.4}
        color="#e6461c"
        handleOpacityChange={jest.fn()}
        handleColorChange={jest.fn()}
      />
    );
    const element = screen.getByText("40%");
    expect(element).toBeInTheDocument();
  });
});
