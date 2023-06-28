import LinearProgressBar from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("LinearProgressBar  test cases", () => {
  test("LinearProgressBar rendered", () => {
    render(<LinearProgressBar loading={true} />);
    const element = screen.getByTestId("linearProgressBar");
    expect(element).toBeInTheDocument();
  });
});
