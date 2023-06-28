import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import ReviewersAssignPlatesTab from "..";
import {
  PlateReviewersDocument,
  UnassignedPlatesDocument,
} from "../../../../../generated/graphql";

const mockedQueries = [
  {
    request: {
      query: PlateReviewersDocument,
      variables: {
        page: 1,
        size: 5,
      },
    },
    result: {
      data: {
        plateReviewers: {
          content: [
            {
              user: {
                id: "1",
                firstName: "ABC",
                lastName: "CDE",
                email: "A@cellinobio.com",
                role: {
                  id: "1",
                  name: "Data Viewer",
                  __typename: "Role",
                },
                __typename: "User",
              },
              plate: [
                {
                  id: "7",
                  name: "CELL-000303",
                  runId: "6",
                  runName: "Run 3",
                  __typename: "PlateBasicDetails",
                },
              ],
              __typename: "PlateReviewer",
            },
          ],
          pageInfo: {
            totalElements: 1,
            page: 1,
            size: 1,
            __typename: "PageInformation",
          },
          __typename: "PaginatedPlateReviewer",
        },
      },
    },
  },
  {
    request: {
      query: UnassignedPlatesDocument,
      variables: {
        reviewerIds: "",
        size: 10,
        page: 1,
      },
    },
    result: {
      data: {
        plates: {
          content: [
            {
              run: {
                id: "9",
                name: "IPSC101 Run 2",
                __typename: "Run",
              },
              id: "1",
              name: "CELL-ABC",
              __typename: "Plate",
            },
          ],
          pageInfo: {
            page: 1,
            size: 1,
            totalElements: 1,
            __typename: "PageInformation",
          },
          __typename: "PaginatedPlates",
        },
      },
    },
  },
];

const waitFor = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

describe("Reviewers Page - Assign Plates Tab", () => {
  test("Render", async () => {
    render(
      <MockedProvider mocks={mockedQueries}>
        <ReviewersAssignPlatesTab />
      </MockedProvider>
    );
    await waitFor(2000);
    expect(screen.getByText("Reviewer")).toBeInTheDocument();
  });
});
