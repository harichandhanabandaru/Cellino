import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProtocolTab from "..";

describe("protocol tab tests", () => {
  it("should render the protocols list", () => {
    render(<ProtocolTab />);
    const element = screen.getByText("Name");
    expect(element).toBeInTheDocument();
  });
  it("should open the right panel on click of status icon", async () => {
    render(<ProtocolTab />);
    await userEvent.click(screen.getAllByTestId("icon")[0]);
    const rightPanel = screen.getByTestId("right-panel");
    expect(rightPanel).toBeInTheDocument();
  });
  it("should close the right panel on click of close icon", async () => {
    render(<ProtocolTab />);
    await userEvent.click(screen.getAllByTestId("icon")[0]);
    await userEvent.click(screen.getByTestId("close"));
  });
});
