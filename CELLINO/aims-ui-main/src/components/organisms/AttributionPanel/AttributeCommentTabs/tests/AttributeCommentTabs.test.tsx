import { render, screen, fireEvent } from "@testing-library/react";
import AttributeCommentTabs from "..";
import { MockedProvider } from "@apollo/client/testing";
import {
  InferenceLayer,
  well,
  Plate,
  WellDropStatus,
} from "../../../../../mocks/constants";

describe("AttributeCommentTabs test cases", () => {
  test("AttributeCommentTabs rendered", () => {
    const setDropWell = jest.fn();
    const handleDropWell = jest.fn();
    const setDropPlate = jest.fn();
    const handleDropPlate = jest.fn();
    render(
      <MockedProvider>
        <AttributeCommentTabs
          handleDrawer={Function}
          newPolygonData={undefined}
          setNewPolygonData={function (value: any): void {}}
          handleClusterCreation={() => {}}
          well={well}
          selectedImageEventId={"116050"}
          handleColonyAndClusterCreation={() => {}}
          inferenceLayers={InferenceLayer}
          plate={Plate}
          dropPlate={{ plateId: "", status: "", reason: "" }}
          setDropPlate={setDropPlate}
          handleDropPlate={handleDropPlate}
          dropWell={WellDropStatus}
          setDropWell={setDropWell}
          handleDropWell={handleDropWell}
          imageEvents={[]}
          handleScanObjectCreation={jest.fn()}
        />
      </MockedProvider>
    );
    const element = screen.getByTestId("tabs");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Attributes");
    fireEvent.click(screen.getByText("Attributes"));
  });

  test("Accordition rendered", () => {
    const setDropWell = jest.fn();
    const handleDropWell = jest.fn();
    const setDropPlate = jest.fn();
    const handleDropPlate = jest.fn();
    render(
      <MockedProvider>
        <AttributeCommentTabs
          handleDrawer={Function}
          newPolygonData={undefined}
          setNewPolygonData={function (value: any): void {}}
          handleClusterCreation={() => {}}
          well={well}
          selectedImageEventId={"116050"}
          handleColonyAndClusterCreation={() => {}}
          inferenceLayers={InferenceLayer}
          plate={Plate}
          dropPlate={{ plateId: "", status: "", reason: "" }}
          setDropPlate={setDropPlate}
          handleDropPlate={handleDropPlate}
          dropWell={WellDropStatus}
          setDropWell={setDropWell}
          handleDropWell={handleDropWell}
          imageEvents={[]}
          handleScanObjectCreation={jest.fn()}
        />
      </MockedProvider>
    );
    const elementAccordition = screen.getByTestId("accorditions");
    expect(elementAccordition).toHaveTextContent("Plate");
    expect(elementAccordition).toHaveTextContent("Well");
    expect(elementAccordition).toHaveTextContent("Run");
  });
});
