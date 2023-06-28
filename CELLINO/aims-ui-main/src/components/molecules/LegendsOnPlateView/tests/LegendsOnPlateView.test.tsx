import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import LegendsOnPlateView from "..";

describe("LegendsOnPlateView test cases", () => {
  test("LegendsOnPlateView rendered", () => {
    render(<LegendsOnPlateView />);
    const element = screen.getByText("Not started");
    expect(element).toBeInTheDocument();
  });
});
