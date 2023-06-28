import { render, screen, waitFor } from "@testing-library/react";
import PlateDetails from "..";
import userEvent from "@testing-library/user-event";

describe("PlateDetails", function () {
  it("should open accordion items to see the contents", async () => {
    render(
      <PlateDetails
        plateName="Plate_409102"
        noOfWells={96}
        passageNumber={"0"}
        downSelectionDay={2}
        phaseName="Clone Isolation"
      />
    );
    const button = screen.getByRole("button");
    await userEvent.click(button);
    await waitFor(() =>
      expect(
        screen.getByText("96 wells , Passage 0 , Days to downselection : 2")
      ).toBeVisible()
    );
  });
});
