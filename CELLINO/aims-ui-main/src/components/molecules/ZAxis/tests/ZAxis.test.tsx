import ZAxis from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<ZAxis>", () => {
  test("Check if the component is present", () => {
    render(
      <ZAxis handleZaxisChange={Function} currentZAxis={1} zArray={[1, 2, 3]} />
    );
    const element = screen.getByTestId("Zaxis");
    expect(element).toBeInTheDocument();
  });
});
