import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import OverflowTip from "../index";

export default {
  title: "Molecules/OverflowTip",
  component: OverflowTip,
} as ComponentMeta<typeof OverflowTip>;

const Template: ComponentStory<typeof OverflowTip> = (args) => (
  <OverflowTip {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: "tree item",
};
