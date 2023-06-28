import { render, screen } from "@testing-library/react";
import RightPanelRunDetails from "..";
import { MOCK_PLATES } from "../../../../mockData/mockData";
import { MemoryRouter } from "react-router-dom";

describe("right panel run details", () => {
  it("should match the right panel run details", () => {
    render(
      <MemoryRouter initialEntries={["/run/123"]}>
        <RightPanelRunDetails
          runData={{ id: "8888", name: "IPSC v1.0.1.2" }}
          plates={MOCK_PLATES}
          workflowData={undefined}
        />
      </MemoryRouter>
    );
    const element = screen.getByText("Details");
    expect(element).toBeInTheDocument();
  });
});
