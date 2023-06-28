import { render, screen } from "@testing-library/react";
import ClusterAccordion from "../index";
import userEvent from "@testing-library/user-event";

const clusterData = {
  name: "Cluster",
  clonality: "MONOCLONAL",
  color: "#e6461c",
  opacity: 0.4,
};

describe("ClusterAccordion", function () {
  it("should be trigger onSubmitClick and onExpandedChange", async function () {
    const onSubmitClick = jest.fn();
    const onExpandedChange = jest.fn();
    const handleAnalysisChange = jest.fn();
    render(
      <ClusterAccordion
        accordionName={"cluster"}
        onSubmitClick={onSubmitClick}
        onNameChange={jest.fn()}
        onExpandedChange={onExpandedChange}
        handleColorChange={jest.fn()}
        handleOpacityChange={jest.fn()}
        expanded={true}
        clusterData={clusterData}
        type={"System Generated"}
        submitDisabled={false}
        colonies={[]}
        clusterMetrics={[]}
        handleClonalityChange={jest.fn()}
        handleImageAnalysisRequestChange={handleAnalysisChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "cluster" }));
    expect(onExpandedChange).toBeCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmitClick).toBeCalledTimes(1);
  });

  it("should trigger onNameChange and handleClonalityChange", async function () {
    const handleClonalityChange = jest.fn();
    const handleAnalysisChange = jest.fn();
    render(
      <ClusterAccordion
        accordionName={"cluster"}
        onSubmitClick={jest.fn()}
        onNameChange={jest.fn()}
        onExpandedChange={jest.fn()}
        expanded={true}
        handleColorChange={jest.fn()}
        handleOpacityChange={jest.fn()}
        clusterData={clusterData}
        type={"System Generated"}
        submitDisabled={false}
        clusterMetrics={[]}
        colonies={[]}
        handleClonalityChange={handleClonalityChange}
        handleImageAnalysisRequestChange={handleAnalysisChange}
      />
    );

    await userEvent.click(
      screen.getAllByRole("button", { name: "Monoclonal" })[0]
    );
    await userEvent.click(screen.getByRole("option", { name: "Unknown" }));
    expect(handleClonalityChange).toBeCalledTimes(1);
  });

  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    const handleAnalysisChange = jest.fn();
    render(
      <ClusterAccordion
        accordionName={"cluster"}
        onSubmitClick={jest.fn()}
        onNameChange={jest.fn()}
        onExpandedChange={onExpandedChange}
        expanded={true}
        handleColorChange={jest.fn()}
        handleOpacityChange={jest.fn()}
        clusterData={clusterData}
        type={"System Generated"}
        submitDisabled={false}
        clusterMetrics={[]}
        colonies={[]}
        handleClonalityChange={jest.fn()}
        handleImageAnalysisRequestChange={handleAnalysisChange}
      />
    );
    const element = screen.getByText("cluster");
    expect(element).toBeInTheDocument();
  });
});
