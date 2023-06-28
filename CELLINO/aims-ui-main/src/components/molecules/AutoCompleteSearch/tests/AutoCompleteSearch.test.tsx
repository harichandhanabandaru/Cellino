import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import AutoCompleteSearch from "..";

describe("AutoComplete test cases", () => {
  test("AutoCompleteSeaarch  rendered", () => {
    render(<AutoCompleteSearch />);
    const element = screen.getByTestId("autoComplete");
    expect(element).toBeInTheDocument();
  });
});
