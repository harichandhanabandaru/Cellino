import { render, screen } from "@testing-library/react";
import { IconAIMS } from "../icon";
import "@testing-library/jest-dom/extend-expect";

describe("<IconAIMS>", () => {
  test("IconAIMS Unselected component", () => {
    const image = "chart-bar.png";
    render(<IconAIMS source={image} isSelectable={true} isclicked={false} />);
    const element = screen.getByTestId("Unselected-Image");
    expect(element).toBeInTheDocument();
  });
  test("IconAIMS selected component", () => {
    const image = "chart-bar.png";
    render(<IconAIMS source={image} isSelectable={true} isclicked={true} />);
    const element = screen.getByTestId("Selected-Image");
    expect(element).toBeInTheDocument();
  });
});
