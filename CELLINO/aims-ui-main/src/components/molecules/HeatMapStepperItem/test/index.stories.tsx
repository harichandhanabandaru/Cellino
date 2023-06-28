import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import HeatMapStepperItem from "../index";

export default {
  title: "Molecules/StepperItem",
  component: HeatMapStepperItem,
} as ComponentMeta<typeof HeatMapStepperItem>;

const Template: ComponentStory<typeof HeatMapStepperItem> = (args) => (
  <HeatMapStepperItem {...args} />
);

export const Stepper = Template.bind({});
Stepper.args = {
  listOfEvents: ["a", "b", "c"],
  date: "23 March 2022",
  runDay: "32",
};
