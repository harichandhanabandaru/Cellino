import { render, screen } from "@testing-library/react";
import RunTabDetailItem from "..";

describe("Run tab detail item", () => {
  it("should match the run tab detail item", () => {
    render(
      <RunTabDetailItem
        label="Clone review status"
        value="In review"
        isIcon={true}
      />
    );
    const element = screen.getByText("In review");
    expect(element).toBeInTheDocument();
  });
});
