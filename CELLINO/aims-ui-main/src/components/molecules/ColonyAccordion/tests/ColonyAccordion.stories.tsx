import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ColonyAccordion from "../index";

export default {
  title: "Molecules/ColonyAccordion",
  component: ColonyAccordion,
  argTypes: {
    onNameChange: { action: "onNameChange" },
    handleClonalityChange: { action: "handleClonalityChange" },
    handleIsSelectedChange: { action: "handleIsSelectedChange" },
    onSubmitClick: { action: "onSubmitClick" },
    onExpandedChange: { action: "onExpandedChange" },
  },
} as ComponentMeta<typeof ColonyAccordion>;

const Template: ComponentStory<typeof ColonyAccordion> = (args) => (
  <div style={{ width: "256px" }}>
    <ColonyAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  type: "Manual",
  noOfClusters: "3",
  submitDisabled: false,
  colonyData: {
    name: "colont-123",
    isSelected: true,
    color: "#e6461c",
    clonality: "unknown",
    opacity: 0.4,
  },
};
