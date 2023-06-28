import { Meta, Story } from "@storybook/react/types-6-0";
import PlateDetails, { PlateDetailsProps } from "..";

export default {
  title: "Molecules/PlateDetails",
  component: PlateDetails,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41648",
    },
  },
} as Meta;

const Template: Story<PlateDetailsProps> = (args) => <PlateDetails {...args} />;

export const Plate1 = Template.bind({});
Plate1.args = {
  plateName: "Plate_409102",
  noOfWells: 96,
  passageNumber: "0",
  downSelectionDay: "2",
};
