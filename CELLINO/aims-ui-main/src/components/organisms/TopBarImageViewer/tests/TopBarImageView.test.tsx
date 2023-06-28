import TopBarImageView from "..";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe("<TopBarImageView>", () => {
  test("check if top bar in image view is present", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <TopBarImageView
                handleZaxisChange={jest.fn()}
                currentZAxis={1}
                zArray={[-1, 0, 4, 9]}
                onPolygonClick={jest.fn()}
                creationMode={true}
                internalPolygonDisabled={false}
                handleInternalPolygon={jest.fn()}
                canDrawInternalPolygon={false}
                wellList={[]}
                selectedWellId={""}
                handleWellChange={jest.fn()}
                handleComplete={jest.fn()}
                handleBackToPlate={jest.fn()}
                scanObjectMetrics={[]}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
    const element = screen.getByTestId("topBar");
    expect(element).toBeInTheDocument();
  });
});
