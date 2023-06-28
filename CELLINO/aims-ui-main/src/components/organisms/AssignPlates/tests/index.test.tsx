import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AssignPlates from "..";
import { AssignPlatesMock } from "../../../../mockData/mockData";
import { AssignReviewerToPlatesDocument } from "../../../../generated/graphql";

const mockQueries = [
  {
    request: {
      query: AssignReviewerToPlatesDocument,
      variables: {
        plateIds: ["634"],
        userId: "987",
      },
    },
    result: {
      data: {
        assignReviewerToPlates: {
          status: "Added record(s)",
          message: "Success",
          __typename: "StatusMessage",
        },
      },
    },
  },
];

describe("Assign Plates - Test", () => {
  test("Render", () => {
    render(
      <MockedProvider>
        <AssignPlates
          items={[]}
          loadMoreItems={() => {}}
          totalElements={0}
          userId={"987"}
          refetch={() => {}}
        />
      </MockedProvider>
    );
    expect(screen.getByText("Assign plate")).toBeInTheDocument();
  });

  test("Render popover", () => {
    render(
      <MockedProvider>
        <AssignPlates
          items={[]}
          loadMoreItems={() => {}}
          totalElements={0}
          userId={"987"}
          refetch={() => {}}
        />
      </MockedProvider>
    );
    const assignPlate = screen.getByText("Assign plate");
    // Open the popover
    fireEvent.click(assignPlate);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  test("Search", () => {
    render(
      <MockedProvider>
        <AssignPlates
          items={AssignPlatesMock}
          loadMoreItems={() => {}}
          totalElements={2}
          userId={"987"}
          refetch={() => {}}
        />
      </MockedProvider>
    );
    const assignPlate = screen.getByText("Assign plate");
    // Open the popover
    fireEvent.click(assignPlate);

    // Search using the keyword
    const searchBar: HTMLInputElement = screen.getByPlaceholderText("Search");
    expect(searchBar).toBeInTheDocument();

    fireEvent.input(searchBar, { target: { value: "Plate" } });
    expect(searchBar.value).toBe("Plate");

    // Remove the search string
    fireEvent.input(searchBar, { target: { value: undefined } });
  });

  test("Select a plate", () => {
    render(
      <MockedProvider>
        <AssignPlates
          items={AssignPlatesMock}
          loadMoreItems={() => {}}
          totalElements={2}
          userId={"987"}
          refetch={() => {}}
        />
      </MockedProvider>
    );

    const assignPlate = screen.getByText("Assign plate");
    // Open the popover
    fireEvent.click(assignPlate);

    // Get html node for Plate 1
    const plateCheckbox = screen
      .getByTestId(`plate-checkbox-${AssignPlatesMock[0].plates[0].name}`)
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('input[type="checkbox"]');

    expect(plateCheckbox).toBeInTheDocument();
    fireEvent.click(plateCheckbox as HTMLElement);
  });

  test("Select a run", () => {
    render(
      <MockedProvider>
        <AssignPlates
          items={AssignPlatesMock}
          loadMoreItems={() => {}}
          totalElements={2}
          userId={"987"}
          refetch={() => {}}
        />
      </MockedProvider>
    );

    const assignPlate = screen.getByText("Assign plate");
    // Open the popover
    fireEvent.click(assignPlate);

    // Get html node for Plate 1
    const runCheckbox = screen
      .getByTestId(`run-checkbox-${AssignPlatesMock[0].runName}`)
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('input[type="checkbox"]');

    expect(runCheckbox).toBeInTheDocument();
    fireEvent.click(runCheckbox as HTMLElement);
  });

  test("Assign a plate", () => {
    render(
      <MockedProvider mocks={mockQueries}>
        <AssignPlates
          items={AssignPlatesMock}
          loadMoreItems={() => {}}
          totalElements={2}
          userId={"987"}
          refetch={() => {}}
        />
      </MockedProvider>
    );

    const assignPlate = screen.getByText("Assign plate");
    // Open the popover
    fireEvent.click(assignPlate);

    // Get html node for Plate 1
    const plateCheckbox = screen
      .getByTestId(`plate-checkbox-${AssignPlatesMock[0].plates[0].name}`)
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('input[type="checkbox"]');

    fireEvent.click(plateCheckbox as HTMLElement);

    const assignButton = screen.getByTestId("assign-plates-button");
    expect(assignButton).toBeInTheDocument();
    fireEvent.click(assignButton);
  });
});
