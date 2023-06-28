import { render, screen } from "@testing-library/react";
import BrightFieldAccordion from "../index";
import userEvent from "@testing-library/user-event";

describe("BrightFieldAccordion", function () {
  it("should be trigger onSubmitClick and onExpandedChange", async function () {
    const onExpandedChange = jest.fn();
    render(
      <BrightFieldAccordion
        expanded={true}
        onExpandedChange={onExpandedChange}
        captureStartTime=""
        captureEndTime=""
        zMin=""
        zMax=""
        zStep=""
        numberOfZStep=""
        magnification=""
        width=""
        height=""
        pixelSize=""
        exposureTime=""
        protocalID=""
        Illuminator=""
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Brightfield" }));
    expect(onExpandedChange).toBeCalledWith(false);
  });

  it("should render closed accordion", async function () {
    const onExpandedChange = jest.fn();
    render(
      <BrightFieldAccordion
        expanded={false}
        onExpandedChange={onExpandedChange}
        captureStartTime=""
        captureEndTime=""
        zMin=""
        zMax=""
        zStep=""
        numberOfZStep=""
        magnification=""
        width=""
        height=""
        pixelSize=""
        exposureTime=""
        protocalID=""
        Illuminator=""
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Brightfield" }));
    expect(onExpandedChange).toBeCalledWith(true);
  });
});
