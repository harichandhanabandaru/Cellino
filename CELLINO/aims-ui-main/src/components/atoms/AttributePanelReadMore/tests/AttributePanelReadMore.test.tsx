import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AttributePanelReadMore from "..";

describe("AttributePanelReadMore test cases", () => {
  test("AttributePanelReadMore rendered", async () => {
    render(
      <AttributePanelReadMore
        wholetext="The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101...."
        showMoreText="...Read More"
        showLessText="Show Less"
      />
    );
    const element = screen.getByTestId("readMore");
    expect(element).toBeInTheDocument();
    const option1 = screen.getByText("...Read More");
    fireEvent.click(option1);
    expect(
      screen.getByText(
        "The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101...."
      )
    ).toBeVisible();
    await waitFor(() => expect(screen.getByText("Show Less")).toBeVisible());
  });
});
