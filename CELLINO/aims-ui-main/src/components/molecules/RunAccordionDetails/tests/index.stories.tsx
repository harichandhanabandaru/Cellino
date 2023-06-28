import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RunAccordionDetails from "../index";

export default {
  title: "Molecules/RunAccordionDetails",
  component: RunAccordionDetails,
} as ComponentMeta<typeof RunAccordionDetails>;

const Template: ComponentStory<typeof RunAccordionDetails> = (args) => (
  <RunAccordionDetails {...args} />
);

export const RunDetail = Template.bind({});
RunDetail.args = {
  label: "Run name",
  value: "IPSc v1.0.2",
};
