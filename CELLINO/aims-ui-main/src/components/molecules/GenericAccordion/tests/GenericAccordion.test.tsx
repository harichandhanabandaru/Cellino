import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenericAccordion from "..";
describe("Generic accordion Rendered", () => {
  it("Genereic accordion name accordion rendering", async () => {
    const onExpandedChange = jest.fn();
    const showDataFuncion = jest.fn();

    render(
      <GenericAccordion
        expanded={true}
        name={"Generic Accordion"}
        onExpandedChange={onExpandedChange}
        showData={showDataFuncion}
      />
    );
    const element = screen.getByTestId("GenericAccordion");
    expect(element).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", { name: "Generic Accordion" })
    );
    expect(onExpandedChange).toBeCalledWith(false);
  });
});
