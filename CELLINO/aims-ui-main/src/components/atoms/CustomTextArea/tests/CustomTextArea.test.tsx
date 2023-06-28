import CustomTextArea from "..";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<CustomTextArea/>", () => {
  test("CustomTextArea component", () => {
    render(<CustomTextArea />);
  });
});
