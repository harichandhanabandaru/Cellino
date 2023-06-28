import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DataAccordion from "..";

describe("<DataAccordion>", () => {
  test("check if data accordion is present or not", () => {
    render(
      <DataAccordion
        confluenceValue={"80%"}
        status={"In progress"}
        runValue={35}
      />
    );
    const element = screen.getByTestId("data");
    expect(element).toBeInTheDocument();
  });
});
