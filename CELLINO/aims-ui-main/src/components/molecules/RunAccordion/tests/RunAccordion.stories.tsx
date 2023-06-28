import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RunAccordion from "../index";

export default {
  title: "Molecules/RunAccordion",
  component: RunAccordion,
  argTypes: {
    onExpandedChange: { action: "onExpandedChange" },
  },
} as ComponentMeta<typeof RunAccordion>;

const Template: ComponentStory<typeof RunAccordion> = (args) => (
  <div style={{ width: "256px" }}>
    <RunAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  runName: "IPSC101 v1.0 Run3",
  partner: "Cellino",
  runId: "27381312",
  objective:
    "The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101 The aim of this run is to access effects of monobasic Sodium Phosphate during the lifecycle of iPSC101",
  summary:
    "iPSC101 - Confluence rate improvements with monobasic Sodium Phospate",
  creator: "Rosie S.",
  owner: "Rosie S.",
  runDay: "35",
  startDay: "02/10/22 10:06pm",
  runStatus: "In Progress",
  cloneReviewStatus: "In progress",
  workFlowID: "1084319",
  currentPhase: "Colony emergency",
  plates: ["x1204"],
};
