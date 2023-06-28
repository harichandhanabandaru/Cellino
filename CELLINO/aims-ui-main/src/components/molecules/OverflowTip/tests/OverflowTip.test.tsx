import { render, screen } from "@testing-library/react";
import OverflowTip from "../index";

describe("OverflowTip", function () {
  it("should render component", function () {
    render(<OverflowTip text={"testing"} />);

    expect(screen.getByText("testing")).toBeInTheDocument();
  });
});
