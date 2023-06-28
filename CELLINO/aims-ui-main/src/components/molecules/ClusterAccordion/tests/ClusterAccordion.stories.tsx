import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ClusterAccordion from "../index";

export default {
  title: "Molecules/ClusterAccordion",
  component: ClusterAccordion,
  argTypes: {
    onNameChange: { action: "onNameChange" },
    handleCategoryChange: { action: "handleCategoryChange" },
    onExpandedChange: { action: "onExpandedChange" },
    setAssociatedColonyId: { action: "setAssociatedColonyId" },
    onSubmitClick: { action: "onSubmitClick" },
    handleClonalityChange: { action: "handleClonalityChange" },
  },
} as ComponentMeta<typeof ClusterAccordion>;

const Template: ComponentStory<typeof ClusterAccordion> = (args) => (
  <div style={{ width: "256px" }}>
    <ClusterAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  clusterData: {
    name: "Cluster",
    clonality: "MONOCLONAL",
    color: "#e6461c",
    opacity: 0.4,
  },
  type: "System Generated",
  colonies: [],
  clusterMetrics: [],
};
