import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CustomTreeItemLabel from "../index";

export default {
  title: "Molecules/CustomTreeItemLabel",
  component: CustomTreeItemLabel,
  argTypes: {
    handleMoreItemClick: { action: "handleMoreItemClick" },
    setShowObject: { action: "setShowObject" },
  },
} as ComponentMeta<typeof CustomTreeItemLabel>;

const Template: ComponentStory<typeof CustomTreeItemLabel> = (args) => (
  <CustomTreeItemLabel {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "tree item",
  showObject: true,
  showHideToggle: true,
  showMoreIcon: true,
};
