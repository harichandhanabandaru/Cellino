import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import TopBarPlateView from "..";
import { MemoryRouter } from "react-router-dom";

describe("TopBarPlateView test cases", () => {
  test("TopBarPlateView rendered", () => {
    render(
      <MemoryRouter initialEntries={["/plate-view"]}>
        <TopBarPlateView />
      </MemoryRouter>
    );
    const element = screen.getByText("Back to plates");
    expect(element).toBeInTheDocument();
  });
});
