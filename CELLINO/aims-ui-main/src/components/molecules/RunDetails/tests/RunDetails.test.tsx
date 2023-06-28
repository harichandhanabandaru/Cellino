import { screen, render, waitFor } from "@testing-library/react";
import RunDetails from "..";
import userEvent from "@testing-library/user-event";

describe("RunDetails Test Cases", () => {
  test("RunDetails rendered", async () => {
    render(
      <RunDetails
        name="iPSC101 - Confluence rate improvements with monobasic Sodium Phosphate"
        collaboratorName="Integra Lifesciences"
        runDay={10}
        type="Development run"
        purpose="The aim of this run is to assess effects of monobasic Sodium Phosphate during the lifecycle of iPSC101.\nCorresponding GBG experiement protocol is EXP302.\nKey watch windows are days 8-10 and 22-25 during the lifecycle."
      />
    );
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText("Integra Lifesciences")).toBeVisible()
    );
  });
});
