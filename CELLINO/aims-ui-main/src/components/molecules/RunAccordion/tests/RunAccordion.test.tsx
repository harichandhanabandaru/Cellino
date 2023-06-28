import { render, screen } from "@testing-library/react";
import RunAccordion from "../index";
import userEvent from "@testing-library/user-event";

describe("RunAccordion", function () {
  it("should be trigger onExpandedChange", async function () {
    const onExpandedChange = jest.fn();
    render(
      <RunAccordion
        expanded={true}
        runName={"IPSC101 v1.0 Run3"}
        partner={"Cellino"}
        runId={"27381312"}
        objective={
          "The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101 The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101"
        }
        summary={
          "iPSC101 - Confluence rate improvements with monobasic Sodium Phospate"
        }
        creator={"Rosie S."}
        owner={"Rosie S."}
        runDay={"35"}
        startDay={"02/10/22 10=06pm"}
        runStatus={"In Progress"}
        cloneReviewStatus={"In progress"}
        workFlowID={"1084319"}
        currentPhase={"Colony emergency"}
        plates={["x1204"]}
        onExpandedChange={onExpandedChange}
        reviewers={[]}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Run" }));
    expect(onExpandedChange).toBeCalledWith(false);
  });
  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    render(
      <RunAccordion
        expanded={false}
        runName={"IPSC101 v1.0 Run3"}
        partner={"Cellino"}
        runId={"27381312"}
        objective={
          "The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101 The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101"
        }
        summary={
          "iPSC101 - Confluence rate improvements with monobasic Sodium Phospate"
        }
        creator={"Rosie S."}
        owner={"Rosie S."}
        runDay={"35"}
        startDay={"02/10/22 10=06pm"}
        runStatus={"In Progress"}
        cloneReviewStatus={"In progress"}
        workFlowID={"1084319"}
        currentPhase={"Colony emergency"}
        plates={["x1204"]}
        onExpandedChange={onExpandedChange}
        reviewers={[]}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Run" }));
    expect(onExpandedChange).toBeCalledWith(true);
  });
});
