import { render, screen } from "@testing-library/react";
import RightClickMenu from "../index";

describe("RightClickMenu test cases", () => {
  test("RightClickMenu rendered", () => {
    render(
      <RightClickMenu
        show={true}
        handleClickAway={jest.fn()}
        xCoordinate={0}
        yCoordinate={0}
        handleRightClickDelete={jest.fn()}
      />
    );
    const element = screen.getByTestId("RightClickPopper");
    expect(element).toBeInTheDocument();
  });
});
