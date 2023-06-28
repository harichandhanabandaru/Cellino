import { render, screen } from "@testing-library/react";
import CustomDiscardModal from "../index";
import userEvent from "@testing-library/user-event";
import imageViewerMessages from "../../../../messages/imageViewerMessages";

describe("CustomDiscardModal", function () {
  it("should trigger handleContinue", async function () {
    const handleCancel = jest.fn();
    const handleContinue = jest.fn();
    render(
      <CustomDiscardModal
        open={true}
        handleCancel={handleCancel}
        handleContinue={handleContinue}
        heading={imageViewerMessages.CLUSTER_DISCARD_POPUP_TEXT}
        subText={imageViewerMessages.CLUSTER_DISCARD_POPUP_SUBTEXT}
      />
    );
    const continueButton = screen.getByRole("button", { name: "Continue" });
    await userEvent.click(continueButton);
    expect(handleContinue).toBeCalledTimes(1);
  });

  it("should trigger handleCancel", async function () {
    const handleCancel = jest.fn();
    const handleContinue = jest.fn();
    render(
      <CustomDiscardModal
        open={true}
        handleCancel={handleCancel}
        handleContinue={handleContinue}
        heading={imageViewerMessages.CLUSTER_DISCARD_POPUP_TEXT}
        subText={imageViewerMessages.CLUSTER_DISCARD_POPUP_SUBTEXT}
      />
    );
    await userEvent.keyboard("[Escape]");
    expect(handleCancel).toBeCalledTimes(1);
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelButton);
    expect(handleCancel).toBeCalledTimes(2);
  });
});
