import Confluence from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<Confluence>", () => {
  test("vertical bar component", () => {
    render(<Confluence />);
    const element = screen.getByTestId("1");
    expect(element).toBeInTheDocument();
  });
});
