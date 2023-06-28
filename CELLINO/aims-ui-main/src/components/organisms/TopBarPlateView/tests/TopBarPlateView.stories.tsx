import TopBarPlateView from "..";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "Organisms/TopBarPlateView",
  component: TopBarPlateView,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69583",
    },
  },
} as Meta;

const Template: Story = (args) => <TopBarPlateView></TopBarPlateView>;

export const TopBarPlateViewStory = Template.bind({});
TopBarPlateViewStory.args = {};
