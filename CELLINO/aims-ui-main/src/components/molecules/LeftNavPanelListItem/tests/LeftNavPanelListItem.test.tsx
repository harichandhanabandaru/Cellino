import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeftNavPanelListItem from "../index";

describe("Left nav panel list item tests", () => {
  it("the left nav panel should be rendered", () => {
    const handleItemClick = jest.fn();
    render(
      <LeftNavPanelListItem
        open={true}
        handleListItem={handleItemClick}
        selectedItem={2}
        item={{
          id: 2,
          label: "Plates",
          src: "",
          path: "/home",
        }}
      />
    );
    const element = screen.getByText("Plates");
    expect(element).toBeInTheDocument();
  });
  it("should trigger handle list item click", async () => {
    const handleItemClick = jest.fn();
    render(
      <LeftNavPanelListItem
        open={true}
        handleListItem={handleItemClick}
        selectedItem={2}
        item={{
          id: 2,
          label: "Plates",
          src: "",
          path: "/home",
        }}
      />
    );
    const button = screen.getByTestId("listItem");
    await userEvent.click(button);
    expect(handleItemClick).toBeCalledTimes(1);
  });
});
