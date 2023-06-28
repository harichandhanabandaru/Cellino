import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import LeftPanelRunDetails from "../index";
import { MOCK_RUN_DETAILS } from "../../../../mockData/mockData";

export default {
  title: "Organisms/LeftPanelRunDetails",
  component: LeftPanelRunDetails,
} as ComponentMeta<typeof LeftPanelRunDetails>;

const Template: ComponentStory<typeof LeftPanelRunDetails> = (args) => (
  <LeftPanelRunDetails {...args} />
);

export const LeftPanel = Template.bind({});
LeftPanel.args = {
  runData: MOCK_RUN_DETAILS,
};
