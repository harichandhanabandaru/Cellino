import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LeftPanelRunDetails from "..";
import { MOCK_RUN_DETAILS } from "../../../../mockData/mockData";

describe("left panel run details", () => {
  it("should match the left panel run details", () => {
    render(
      <MemoryRouter>
        <LeftPanelRunDetails runData={MOCK_RUN_DETAILS} />
      </MemoryRouter>
    );
    const element = screen.getByText("Runs list");
    expect(element).toBeInTheDocument();
  });
  it("should trigger the handle change method on clicking", async () => {
    render(
      <MemoryRouter>
        <LeftPanelRunDetails runData={MOCK_RUN_DETAILS} />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByRole("button", { name: "Run overview" }));
    const element = screen.getByTestId("KeyboardArrowRightIcon");
    expect(element).toBeInTheDocument();
  });
});
