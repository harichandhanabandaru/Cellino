import { render, screen } from "@testing-library/react";
import { SetStateAction } from "react";
import RightPaneImageViewer from "..";
import {
  InferenceLayer,
  well,
  WellDropStatus,
  Plate,
} from "../../../../mocks/constants";

describe("RightPaneImageViewer test case", () => {
  test("render RightPaneImageViewer", () => {
    const setDropWell = jest.fn();
    const handleDropWell = jest.fn();
    const setDropPlate = jest.fn();
    const handleDropPlate = jest.fn();
    render(
      <RightPaneImageViewer
        setRightPanelOpen={function (value: SetStateAction<boolean>): void {}}
        rightPanelOpen={false}
        newPolygonData={undefined}
        setNewPolygonData={function (value: any): void {}}
        well={well}
        handleClusterCreation={jest.fn()}
        selectedImageEventId={"116050"}
        handleColonyAndClusterCreation={jest.fn()}
        handleScanObjectCreation={jest.fn()}
        inferenceLayers={InferenceLayer}
        plate={Plate}
        dropPlate={{ plateId: "", status: "", reason: "" }}
        setDropPlate={setDropPlate}
        handleDropPlate={handleDropPlate}
        dropWell={WellDropStatus}
        setDropWell={setDropWell}
        handleDropWell={handleDropWell}
        imageEvents={[]}
      />
    );
    expect(screen.getByTestId("RightPaneImageViewer")).toBeInTheDocument();
  });
});
