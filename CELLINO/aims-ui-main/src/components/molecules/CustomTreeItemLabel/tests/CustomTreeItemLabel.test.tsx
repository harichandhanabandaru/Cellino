import { render, screen } from "@testing-library/react";
import CustomTreeItemLabel from "../index";

describe("CustomTreeItemLabel", function () {
  it("should render the component", function () {
    const { rerender } = render(
      <CustomTreeItemLabel
        label={"testing"}
        showMoreIcon={true}
        showHideToggle={true}
        showObject={true}
        setShowObject={jest.fn()}
        handleMoreItemClick={jest.fn()}
      />
    );

    //cover branch
    rerender(
      <CustomTreeItemLabel
        label={"testing"}
        showMoreIcon={true}
        showHideToggle={true}
        showObject={false}
        setShowObject={jest.fn()}
        handleMoreItemClick={jest.fn()}
      />
    );
    expect(screen.getByText("testing")).toBeInTheDocument();
  });
});
