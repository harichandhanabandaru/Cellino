import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AssigneeMultiselectList from "..";

describe("AssigneeMultiselectList test cases", () => {
  test("AssigneeMultiselectList rendered", () => {
    render(<AssigneeMultiselectList />);
    const element = screen.getByText("Assignee");
    expect(element).toBeInTheDocument();
  });

  test("AssigneeMultiselectList selected options", async () => {
    render(<AssigneeMultiselectList />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() =>
      expect(screen.getByTestId("autocomplete")).toBeVisible()
    );
    const option1 = screen.getByText("Bogdan Kriven");
    fireEvent.click(option1);
    expect(option1).toBeInTheDocument();

    const currentValue = screen.getByText("John Doe");
    fireEvent.click(currentValue);
  });
});
