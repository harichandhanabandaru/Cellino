import { render, screen } from "@testing-library/react";
import Menu from "..";

describe("RightClickMenu test cases", () => {
  const options = ["Mark as keep", "Mark as kill"];
  const handleChange = (event: any) => {};
  test("RightClickMenu rendered", () => {
    render(<Menu value={0} options={options} handleChange={handleChange} />);
    const element = screen.getByTestId("RightClickPopper");
    expect(element).toBeInTheDocument();
  });
});
