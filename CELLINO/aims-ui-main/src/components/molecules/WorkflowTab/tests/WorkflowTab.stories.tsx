import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import WorkflowTab from "../index";

export default {
  title: "Molecules/WorkflowTab",
  component: WorkflowTab,
} as ComponentMeta<typeof WorkflowTab>;

const Template: ComponentStory<typeof WorkflowTab> = (args) => (
  <WorkflowTab {...args} />
);

export const DefaultRunTabs = Template.bind({});
DefaultRunTabs.args = {
  workflowData: {
    createdAt: "2017-08-19 12:17:55 -0400",
    createdBy: "Olivia S.",
    id: "19380920934",
    modifiedAt: "2017-08-19 12:17:55 -0400",
    modifiedBy: "Andy E.",
    name: "IPSC101",
    objective: "Measure the effect of temperature on cell density",
    phases: [{ phaseName: "Reprogramming" }, { phaseName: "QC" }],
    type: "Development",
    version: "IPSC101  V1.0 Run1",
  },
};
