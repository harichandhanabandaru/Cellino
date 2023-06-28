import { render, screen } from "@testing-library/react";
import PlatesAccordion from "../index";
import userEvent from "@testing-library/user-event";

describe("PlatesAccordion", function () {
  it("should be trigger onExpandedChange", async function () {
    const onExpandedChange = jest.fn();
    const setDropPlate = jest.fn();
    const handleDropPlate = jest.fn();
    render(
      <PlatesAccordion
        expanded={true}
        labwareID={"90279014"}
        name={"x1410"}
        barcode={"102398"}
        listOfEvents={[
          { name: "event", event: "IMAGING", startedAt: "7/7/22 4:55" },
        ]}
        currentPhase={"Clone Isolation"}
        processStatus={"Scanning"}
        processStatusDetail={"Placed in incubator 03/12/22 10:32 am."}
        reviewStatus={"In progress"}
        anaysisStatus={"In queue"}
        analysisStatusDetails={"Analysis completed at 03/12/22 12:44 pm."}
        reviewer={"Rosie R."}
        onExpandedChange={onExpandedChange}
        dropPlate={{ plateId: "", status: "", reason: "" }}
        setDropPlate={setDropPlate}
        handleDropPlate={handleDropPlate}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Plates" }));
    expect(onExpandedChange).toBeCalledWith(false);
  });
  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    const setDropPlate = jest.fn();
    const handleDropPlate = jest.fn();
    render(
      <PlatesAccordion
        expanded={false}
        labwareID={"90279014"}
        name={"x1410"}
        barcode={"102398"}
        listOfEvents={[
          { name: "event", event: "IMAGING", startedAt: "7/7/22 4:55" },
        ]}
        currentPhase={"Clone Isolation"}
        processStatus={"Scanning"}
        processStatusDetail={"Placed in incubator 03/12/22 10:32 am."}
        reviewStatus={"In progess"}
        anaysisStatus={"In queue"}
        analysisStatusDetails={"Analysis completed at 03/12/22 12:44 pm."}
        reviewer={"Rosie R."}
        onExpandedChange={onExpandedChange}
        dropPlate={{ plateId: "", status: "", reason: "" }}
        setDropPlate={setDropPlate}
        handleDropPlate={handleDropPlate}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Plates" }));
    expect(onExpandedChange).toBeCalledWith(true);
  });
});
