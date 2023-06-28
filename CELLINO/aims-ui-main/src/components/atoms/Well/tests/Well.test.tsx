import { render, screen } from "@testing-library/react";
import { Well } from "..";
import userEvent from "@testing-library/user-event";

describe("Well test case", () => {
  test("render well", () => {
    render(
      <Well
        confluenceValue={100}
        onClick={jest.fn()}
        status="InProgress"
        wellStatus="DROP"
      />
    );
    const element = screen.getByText("DROPPED");
    expect(element).toBeInTheDocument();
  });
  test("it should trigger handleClick", async () => {
    const handleClick = jest.fn();
    render(
      <Well
        confluenceValue={100}
        onClick={handleClick}
        status="InProgress"
        wellStatus="DROP"
      />
    );
    await userEvent.click(screen.getByTestId("Well"));
    expect(handleClick).toBeCalledTimes(1);
  });

  test("Completed status image icon", async () => {
    const handleClick = jest.fn();
    render(
      <Well
        confluenceValue={100}
        onClick={handleClick}
        status="COMPLETED"
        wellStatus="DROP"
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage.src).toContain("well-completed.svg");
  });

  test("In review status image icon", async () => {
    const handleClick = jest.fn();
    render(
      <Well
        confluenceValue={100}
        onClick={handleClick}
        status="INREVIEW"
        wellStatus="DROP"
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage.src).toContain("well-progress.svg");
  });

  test("Not started status image icon", async () => {
    const handleClick = jest.fn();
    render(
      <Well
        confluenceValue={100}
        onClick={handleClick}
        status="NOTSTARTED"
        wellStatus="DROP"
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage.src).toContain("well-notstarted.svg");
  });

  test("Background color when noImageData is true", async () => {
    const handleClick = jest.fn();
    render(
      <Well
        confluenceValue={100}
        onClick={handleClick}
        status="NOTSTARTED"
        wellStatus="DROP"
        noImageData={true}
      />
    );
    expect(screen.getByTestId("WellBoxColor")).toHaveStyle(
      "background: #FEF1D7"
    );
  });

  test("Background color when isMLAttributeAvailable is false", async () => {
    const handleClick = jest.fn();
    render(
      <Well
        confluenceValue={100}
        onClick={handleClick}
        status="NOTSTARTED"
        wellStatus="DROP"
        isMLAttributeAvailable={false}
      />
    );
    expect(screen.getByTestId("WellBoxColor")).toHaveStyle(
      "background: #BCB7C0"
    );
  });

  test("Background color when confluenceValue is undefined", async () => {
    const handleClick = jest.fn();
    render(
      <Well
        confluenceValue={undefined}
        onClick={handleClick}
        status="NOTSTARTED"
        wellStatus="DROP"
      />
    );
    expect(screen.getByTestId("WellBoxColor")).toHaveStyle(
      "background: #EAE4F0"
    );
  });
});
