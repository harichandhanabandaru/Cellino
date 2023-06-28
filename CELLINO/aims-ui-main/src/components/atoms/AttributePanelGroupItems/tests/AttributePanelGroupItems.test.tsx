import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AttributePanelGroupItems from "..";

describe("AttributePanelGroupItems test cases", () => {
  test("AttributePanelGroupItems Empty list rendered", () => {
    render(<AttributePanelGroupItems itemList={[]} />);
    const element = screen.getByTestId("EmptyList");
    expect(element).toBeInTheDocument();
  });

  test("AttributePanelGroupItems Non empty list rendered", () => {
    render(
      <AttributePanelGroupItems
        itemList={["plate1", "plate2", "plate3", "plate4", "plate5", "plate6"]}
      />
    );
    const element = screen.getByTestId("NonEmptyList");
    expect(element).toBeInTheDocument();

    const element1 = screen.getByTestId("PlusOthers");
    expect(element1).toBeInTheDocument();
    fireEvent.click(element1);
    expect(screen.getByText("less")).toBeVisible();
  });
});
