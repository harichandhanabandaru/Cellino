import AIMSLoader from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("AIMSLoader  test cases", () => {
  test("AIMSLoader rendered", () => {
    render(<AIMSLoader />);
    const element = screen.getByTestId("AIMSLoader");
    expect(element).toBeInTheDocument();
  });
});
