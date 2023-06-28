import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ScaleBar from "../index";

export default {
  title: "Molecules/ScaleBar",
  component: ScaleBar,
} as ComponentMeta<typeof ScaleBar>;

const Template: ComponentStory<typeof ScaleBar> = (args) => (
  <ScaleBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  size: 100,
  width: 140,
  x: 0,
  y: 0,
  value: "",
};
