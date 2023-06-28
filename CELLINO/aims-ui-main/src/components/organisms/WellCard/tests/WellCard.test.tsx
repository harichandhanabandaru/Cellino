import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WellCard from "..";

describe("<WellCard>", () => {
  test("check if data accordion is present or not", () => {
    render(
      <WellCard
        confluenceValue={"80%"}
        status={"In progress"}
        runValue={35}
        open={() => {}}
      />
    );
    const element = screen.getByTestId("wellcard");
    expect(element).toBeInTheDocument();
  });
});
