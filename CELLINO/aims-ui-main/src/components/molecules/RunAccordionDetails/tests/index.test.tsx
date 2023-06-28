import { render, screen } from "@testing-library/react";
import RunAccordionDetails from "..";

describe("run accordion details", () => {
  it("should match the run accordion details", () => {
    render(
      <RunAccordionDetails label="Run status" value="completed" isIcon={true} />
    );
    const element = screen.getByText("Run status");
    expect(element).toBeInTheDocument();
  });
  it("should match the run accordion aborted status", () => {
    render(
      <RunAccordionDetails label="Run status" value="Aborted" isIcon={true} />
    );
    const element = screen.getByText("Run status");
    expect(element).toBeInTheDocument();
  });
});
