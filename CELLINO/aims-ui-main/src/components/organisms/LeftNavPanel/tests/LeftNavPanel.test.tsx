import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { LeftNavPanel } from "../LeftNavPanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe("Left nav panel tests", () => {
  it("the left nav panel should be rendered", () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<LeftNavPanel />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>
    );
    const element = screen.getByText("Plates");
    expect(element).toBeInTheDocument();
  });
  it("hide the text if left nav is open", async () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<LeftNavPanel />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>
    );
    const button = screen.getByTestId("cellino-logo");
    await userEvent.click(button);
    const element = screen.getByTestId("chevron-right");
    expect(element).toBeInTheDocument();
  });
});
