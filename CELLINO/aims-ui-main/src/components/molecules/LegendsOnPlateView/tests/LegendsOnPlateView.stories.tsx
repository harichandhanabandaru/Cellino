import { Meta, Story } from "@storybook/react/types-6-0";
import LegendsOnPlateView from "..";

export default {
  title: "Molecules/LegendsOnPlateView",
  component: LegendsOnPlateView,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A42308",
    },
  },
} as Meta;

const Template: Story = (args) => <LegendsOnPlateView {...args} />;

export const DefaultLegend = Template.bind({});
