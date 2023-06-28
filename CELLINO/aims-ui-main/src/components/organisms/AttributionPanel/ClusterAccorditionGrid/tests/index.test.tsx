import { render, screen } from "@testing-library/react";
import ClusterAccorditionGrid from "..";

describe("ClusterAccorditionGrid", () => {
  test("ClusterAccorditionGrid rendered", () => {
    render(
      <ClusterAccorditionGrid
        newPolygonData={undefined}
        setNewPolygonData={function (value: any): void {}}
        handleClusterCreation={() => {}}
        handleColonyAndClusterCreation={() => {}}
        handleScanObjectCreation={jest.fn()}
        selectedImageEventId={""}
      />
    );
    const element = screen.getByTestId("ClusterGrid");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Name");
  });
});
