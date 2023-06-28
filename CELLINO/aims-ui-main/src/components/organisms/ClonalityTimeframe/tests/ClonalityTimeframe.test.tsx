import { render, screen } from "@testing-library/react";
import ClonalityTimeframe from "../index";
// import { sampleImageEvents } from "../../../../utils/tests/sampleData";
import userEvent from "@testing-library/user-event";

jest.mock(
  "../../../molecules/ClonalityTimeframeItem",
  () =>
    ({ selectImage }: { selectImage: Function }) =>
      <div onClick={() => selectImage("123")}>ImageComponent</div>
);

describe("ClonalityTimeframe", function () {
  it("should render component", function () {
    render(
      <ClonalityTimeframe
        // imageEvents={sampleImageEvents}
        setSelectedImageEventId={jest.fn()}
        selectedImageEventId={"116050"}
        setThumbnails={jest.fn()}
      />
    );
    expect(screen.getByText("12 May 2022 (Run day )")).toBeInTheDocument();
  });

  it("should be able to use date steppers", async function () {
    const setSelectedEventImageId = jest.fn();
    render(
      <ClonalityTimeframe
        // imageEvents={sampleImageEvents}
        setSelectedImageEventId={setSelectedEventImageId}
        selectedImageEventId={"114909"}
        setThumbnails={jest.fn()}
      />
    );
    const buttons = screen.getAllByRole("button");
    //click date steppers and other buttons
    await userEvent.click(buttons[0]);
    expect(setSelectedEventImageId).toHaveBeenNthCalledWith(1, "114375");
    await userEvent.click(buttons[1]);
    expect(setSelectedEventImageId).toHaveBeenNthCalledWith(2, "115547");
    await userEvent.click(buttons[2]);
    expect(setSelectedEventImageId).toHaveBeenNthCalledWith(3, "112094");
    await userEvent.click(buttons[3]);
    expect(setSelectedEventImageId).toHaveBeenNthCalledWith(4, "114375");
    await userEvent.click(buttons[4]);
    expect(setSelectedEventImageId).toHaveBeenNthCalledWith(5, "115227");
    await userEvent.click(buttons[5]);
    expect(setSelectedEventImageId).toHaveBeenNthCalledWith(6, "116050");

    //click on element
    await userEvent.click(screen.getAllByText("ImageComponent")[0]);
    expect(setSelectedEventImageId).toHaveBeenNthCalledWith(7, "123");
  });
});
