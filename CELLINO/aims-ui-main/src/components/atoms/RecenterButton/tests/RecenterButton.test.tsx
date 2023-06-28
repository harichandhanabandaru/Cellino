import { render, screen } from "@testing-library/react";
import RecenterButton from "../index";
import userEvent from "@testing-library/user-event";

describe("RecenterButton", function () {
  it("should be able to click on button", async function () {
    const onClick = jest.fn();
    render(<RecenterButton onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toBeCalledTimes(1);
  });
});
