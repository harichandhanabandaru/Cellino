import { render, screen } from "@testing-library/react";
import RunTabs from "..";
import { MOCK_PLATES } from "../../../../mockData/mockData";

describe("run tabs", () => {
  it("should match the run tabs component", () => {
    render(
      <RunTabs
        runData={{ id: "8888", name: "IPSC v1.0.1.2" }}
        plates={MOCK_PLATES}
      />
    );
    const element = screen.getByText("Run name");
    expect(element).toBeInTheDocument();
  });
});
