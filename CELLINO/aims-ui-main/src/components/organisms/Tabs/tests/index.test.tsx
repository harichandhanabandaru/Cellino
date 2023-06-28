import { Box } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "..";

const tabs = [
  {
    label: "Tab1",
    tabpanel: <Box>Tab panel for tab 1</Box>,
  },
  {
    label: "Tab2",
    tabpanel: <Box>Tab panel for tab 2</Box>,
  },
];

describe("Tabs", () => {
  it("should render tabs", () => {
    render(<Tabs tabs={tabs} />);
    const element = screen.getByText("Tab1");
    expect(element).toBeInTheDocument();
  });
  it("should trigger the handle change of tabs", async () => {
    render(<Tabs tabs={tabs} />);
    await userEvent.click(screen.getByText("Tab2"));
    const element = screen.getByText("Tab2");
    expect(element).toBeInTheDocument();
  });
});
