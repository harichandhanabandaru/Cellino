import { render, screen } from "@testing-library/react";
import InferencesAccordion from "../index";
import userEvent from "@testing-library/user-event";

describe("InferencesAccordion", function () {
  it("should be trigger onExpandedChange", async function () {
    const onExpandedChange = jest.fn();
    render(
      <InferencesAccordion
        expanded={true}
        name={"Inference"}
        onExpandedChange={onExpandedChange}
        width={"12x"}
        height={"14x"}
        pixelSize={"14x"}
        pixelSizeUnit={" μm"}
        protocalID={"Protocal 1"}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onExpandedChange).toBeCalledWith(false);
  });
  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    render(
      <InferencesAccordion
        expanded={false}
        name={"Inference"}
        onExpandedChange={onExpandedChange}
        width={"12x"}
        height={"14x"}
        pixelSize={"14x"}
        pixelSizeUnit={" μm"}
        protocalID={"Protocal 1"}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onExpandedChange).toBeCalledWith(true);
  });
});
