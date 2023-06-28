import MenuItemUnSelected from "../MenuItemUnSelected";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("MenuItemUnSelected  test cases", () => {
  test("MenuItemUnSelected rendered", () => {
    render(<MenuItemUnSelected Item={""} index={0} handleChange={undefined} />);
    const element = screen.getByTestId("MenuItemUnselected");
    expect(element).toBeInTheDocument();
  });
});
