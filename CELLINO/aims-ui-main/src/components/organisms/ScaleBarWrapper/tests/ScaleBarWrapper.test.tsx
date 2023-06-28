import { render, screen, waitFor } from "@testing-library/react";
import ScaleBarWrapper from "../index";
import userEvent from "@testing-library/user-event";

describe("ScaleBarWrapper", function () {
  it("should render component", async function () {
    render(<ScaleBarWrapper zoom={-4} px_mm={0.00063} />);
    expect(screen.getByText("2000μm")).toBeInTheDocument();
    const button = screen.getByRole("button");
    const text = screen.getByText("X: 0μm");
    expect(text).toBeInTheDocument();
    await userEvent.click(button);
    await waitFor(() => expect(text).not.toBeVisible());
  });
});
