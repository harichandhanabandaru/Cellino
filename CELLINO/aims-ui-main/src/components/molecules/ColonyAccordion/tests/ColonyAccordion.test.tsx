import { render, screen } from "@testing-library/react";
import ColonyAccordion from "../index";
import userEvent from "@testing-library/user-event";

const colonyData = {
  name: "colont-123",
  isSelected: true,
  color: "#e6461c",
  quality: "GOOD",
  clonality: "UNKNOWN",
  opacity: 0.4,
};

describe("ColonyAccordion", function () {
  it("should be trigger onSubmitClick and onExpandedChange", async function () {
    const onSubmitClick = jest.fn();
    const onExpandedChange = jest.fn();
    render(
      <ColonyAccordion
        colonyData={colonyData}
        onSubmitClick={onSubmitClick}
        handleClonalityChange={jest.fn()}
        handleIsSelectedChange={jest.fn()}
        expanded={true}
        onNameChange={jest.fn()}
        handleColorChange={jest.fn()}
        handleOpacityChange={jest.fn()}
        type={"Manual"}
        noOfClusters={"0"}
        submitDisabled={false}
        onExpandedChange={onExpandedChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Colony" }));
    expect(onExpandedChange).toBeCalledWith(false);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmitClick).toBeCalledTimes(1);
  });

  it("should trigger onNameChange and handleClonalityChange", async function () {
    const onNameChange = jest.fn();
    const handleClonalityChange = jest.fn();
    render(
      <ColonyAccordion
        colonyData={colonyData}
        onSubmitClick={jest.fn()}
        handleClonalityChange={handleClonalityChange}
        handleIsSelectedChange={jest.fn()}
        expanded={true}
        onNameChange={onNameChange}
        type={"Manual"}
        noOfClusters={"0"}
        handleColorChange={jest.fn()}
        handleOpacityChange={jest.fn()}
        submitDisabled={true}
        onExpandedChange={jest.fn()}
      />
    );
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(onNameChange).toBeCalledTimes(5);

    await userEvent.click(
      screen.getAllByRole("button", { name: "Unknown" })[0]
    );
    await userEvent.click(screen.getByRole("option", { name: "Polyclonal" }));
    expect(handleClonalityChange).toBeCalledTimes(1);
  });

  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    render(
      <ColonyAccordion
        colonyData={colonyData}
        noOfClusters={"0"}
        handleColorChange={jest.fn()}
        handleOpacityChange={jest.fn()}
        onSubmitClick={jest.fn()}
        handleClonalityChange={jest.fn()}
        handleIsSelectedChange={jest.fn()}
        expanded={false}
        onNameChange={jest.fn()}
        type={"Manual"}
        submitDisabled={true}
        onExpandedChange={onExpandedChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Colony" }));
    expect(onExpandedChange).toBeCalledWith(true);
  });
});
