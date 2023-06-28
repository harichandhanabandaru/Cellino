import { render, screen } from "@testing-library/react";
import WorkflowTab from "..";

describe("Workflow tab", () => {
  it("should match the workflow tab component", () => {
    render(<WorkflowTab workflowData={undefined} />);
    const element = screen.getByText("Workflow ID");
    expect(element).toBeInTheDocument();
  });
});
