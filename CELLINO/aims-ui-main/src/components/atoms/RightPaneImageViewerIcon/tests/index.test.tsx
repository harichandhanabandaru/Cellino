import { render, screen } from "@testing-library/react";
import RightPaneImageViewerIcon from "..";
import Comments from "../../../../assets/Comments.png";

describe("RightPaneImageViewerIcon test case", () => {
  test("render RightPaneImageViewerIcon", () => {
    render(<RightPaneImageViewerIcon alt="message" src={Comments} />);
    expect(screen.getByTestId("RightPaneImageViewerIcon")).toBeInTheDocument();
  });
});
