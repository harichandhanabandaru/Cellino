import MenuItemSelected from "../MenuItemSelected";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("MenuItemSelected  test cases", () => {
  test("MenuItemSelected rendered", () => {
    render(<MenuItemSelected Item={""} index={0} handleChange={undefined} />);
    const element = screen.getByTestId("MenuItemSelected");
    expect(element).toBeInTheDocument();
  });
});
