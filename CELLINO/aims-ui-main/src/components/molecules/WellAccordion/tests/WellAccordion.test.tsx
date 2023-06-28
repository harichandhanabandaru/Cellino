import { render, screen } from "@testing-library/react";
import WellAccordion from "../index";
import userEvent from "@testing-library/user-event";

describe("WellAccordion", function () {
  it("should be trigger onExpandedChange", async function () {
    const onExpandedChange = jest.fn();
    render(
      <WellAccordion
        expanded={true}
        wellId={"efdc9d24-ec00-11ec-b2c5-0242ac120004"}
        plateId={"efdc9d24-ec00-11ec-b2c5-0242ac120004"}
        positionName={"BO5"}
        processStatus={"In progress"}
        reviewStatus={"In progress"}
        analysisStatus={"In progress"}
        analysisStatusDetails={"Analysis status details"}
        confluence={"-"}
        interiorConfluence={"-"}
        nonLiveCellOccupancy={"-"}
        numberOfCells={"-"}
        numberOfColonies={"-"}
        contaminationScore={"-"}
        listOfEvents={[{ name: "", event: "", startedAt: "" }]}
        reviewers={[]}
        onExpandedChange={onExpandedChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Well" }));
    expect(onExpandedChange).toBeCalledWith(false);
  });
  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    render(
      <WellAccordion
        expanded={true}
        wellId={"efdc9d24-ec00-11ec-b2c5-0242ac120004"}
        plateId={"efdc9d24-ec00-11ec-b2c5-0242ac120004"}
        positionName={"BO5"}
        processStatus={"In progress"}
        reviewStatus={"In progress"}
        analysisStatus={"In progress"}
        analysisStatusDetails={"Analysis status details"}
        confluence={"-"}
        interiorConfluence={"-"}
        nonLiveCellOccupancy={"-"}
        numberOfCells={"-"}
        numberOfColonies={"-"}
        contaminationScore={"-"}
        listOfEvents={[{ name: "", event: "", startedAt: "" }]}
        reviewers={[]}
        onExpandedChange={onExpandedChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Well" }));
    expect(onExpandedChange).toBeCalledWith(false);
  });
});
