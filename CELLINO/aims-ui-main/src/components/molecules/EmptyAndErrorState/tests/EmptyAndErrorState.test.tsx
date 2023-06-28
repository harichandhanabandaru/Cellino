import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmptyAndErrorState from "..";
import ErrorSvg from "../../../../assets/error.svg";

describe("empty and error state", () => {
  it("should match empty state", () => {
    render(
      <EmptyAndErrorState
        image={ErrorSvg}
        heading="No run details available"
        subText="We were unable to fetch run details. Please refresh the page and try again"
      />
    );
    const element = screen.getByText("No run details available");
    expect(element).toBeInTheDocument();
  });
  it("should test onclick of reload button", async () => {
    render(
      <EmptyAndErrorState
        image={ErrorSvg}
        heading="No run details available"
        subText="We were unable to fetch run details. Please refresh the page and try again"
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Reload" }));
    const element = screen.getByText("No run details available");
    expect(element).toBeInTheDocument();
  });
});
