import InferencesAccordionWrapper from "..";
import { Meta, Story } from "@storybook/react/types-6-0";
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

export default {
  title: "organisms/InferencesAccordionWrapper",
  component: InferencesAccordionWrapper,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69192",
    },
  },
} as Meta;

const Template: Story = (args) => (
  <MockedProvider mocks={mockQueries}>
    <InferencesAccordionWrapper
      selectedImageEventId={"f51fde49-91f2-4f4f-80fb-40ee5b1ee1c0"}
      count={1}
      {...args}
    />
  </MockedProvider>
);

export const InferencesAccordionWrapperView = Template.bind({});
