import { render, screen } from "@testing-library/react";
import TopBarKanbanView from "..";

describe("TopBarKanbanView test cases", () => {
  test("TopBarKanbanView rendered", () => {
    render(<TopBarKanbanView />);
    const element = screen.getByText("Dashboard");
    expect(element).toBeInTheDocument();
  });
});
