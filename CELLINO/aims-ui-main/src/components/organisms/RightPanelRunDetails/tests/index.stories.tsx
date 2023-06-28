import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RightPanelRunDetails from "../index";
import { MOCK_PLATES, MOCK_RUN_TABS } from "../../../../mockData/mockData";

export default {
  title: "Organisms/RightPanelRunDetails",
  component: RightPanelRunDetails,
} as ComponentMeta<typeof RightPanelRunDetails>;

const Template: ComponentStory<typeof RightPanelRunDetails> = (args) => (
  <RightPanelRunDetails {...args} />
);

export const DefaultRightPanelRunDetails = Template.bind({});
DefaultRightPanelRunDetails.args = {
  runData: MOCK_RUN_TABS,
  plates: MOCK_PLATES,
};
