import InputTextField from "..";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("InputTextField  test cases", () => {
  test("InputTextField rendered", () => {
    render(<InputTextField value={""} setSearchText={() => {}} />);
    // eslint-disable-next-line testing-library/no-node-access
    const field = screen.getByTestId("TextField").querySelector("input");
    expect(field).toBeInTheDocument();
  });

  test("InputTextField value typed", () => {
    render(<InputTextField value={""} setSearchText={() => {}} />);
    const field = screen.getByTestId("TextField");
    expect(field).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Enter name or number"), {
      target: { value: "new value" },
    });
  });
});
