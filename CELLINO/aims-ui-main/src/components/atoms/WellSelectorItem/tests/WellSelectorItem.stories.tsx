import React from "react";
import WellSelectorItem, { IProps } from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Atoms/WellSelectorItem",
  component: WellSelectorItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69775",
    },
  },
} as Meta<IProps>;

const Template: Story<IProps> = (args) => <WellSelectorItem {...args} />;

export const Default_WellSelector_Item = Template.bind({});
Default_WellSelector_Item.args = {
  name: "B2",
  status: "NotStarted",
};
