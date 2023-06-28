import { render, screen } from "@testing-library/react";
import InferneceAccordionWrapper from "..";
import { MockedProvider } from "@apollo/client/testing";
import { InferencesDocument } from "../../../../generated/graphql";

const mockQueries = [
  {
    request: {
      query: InferencesDocument,
      variables: {
        imageEventId: "f51fde49-91f2-4f4f-80fb-40ee5b1ee1c0",
      },
    },
    result: {
      data: {
        inferences: [
          {
            __typename: "Inference",
            name: "sendai_x1356_m2D5_z0_4_8_12",
            metadata: {
              width: 12224,
              height: 12224,
              data_type: "zarr",
              pixel_size: 0.6753,
              z_offset_um: 0,
            },
            protocolId: "70824293-ce79-41e6-baa1-96c7dc4574b4",
          },
        ],
      },
    },
  },
];

describe("InferenceAccordionWrapper rendered", () => {
  it("Inference data rendered in InfereneceAccordionWrapper", () => {
    render(
      <MockedProvider mocks={mockQueries}>
        <InferneceAccordionWrapper
          selectedImageEventId={"f51fde49-91f2-4f4f-80fb-40ee5b1ee1c0"}
          count={1}
        />
      </MockedProvider>
    );
    const element = screen.getByText("Inference(1)");
    expect(element).toBeInTheDocument();
  });
});
