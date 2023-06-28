import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ScaleBarValues from "../index";

export default {
  title: "Molecules/ScaleBarValues",
  component: ScaleBarValues,
} as ComponentMeta<typeof ScaleBarValues>;

const Template: ComponentStory<typeof ScaleBarValues> = (args) => (
  <ScaleBarValues {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  value: "",
  x: 0,
  y: 0,
};
