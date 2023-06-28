import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ScaleBarWrapper from "../index";

export default {
  title: "Organism/ScaleBarWrapper",
  component: ScaleBarWrapper,
} as ComponentMeta<typeof ScaleBarWrapper>;

const Template: ComponentStory<typeof ScaleBarWrapper> = (args) => (
  <ScaleBarWrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  zoom: -6.6798980159999575,
  px_mm: 0.0006753,
};
