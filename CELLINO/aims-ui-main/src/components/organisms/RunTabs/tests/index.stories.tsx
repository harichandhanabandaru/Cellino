import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RunTabs from "../index";
import { MOCK_PLATES, MOCK_RUN_TABS } from "../../../../mockData/mockData";

export default {
  title: "Organisms/RunTabs",
  component: RunTabs,
} as ComponentMeta<typeof RunTabs>;

const Template: ComponentStory<typeof RunTabs> = (args) => (
  <RunTabs {...args} />
);

export const DefaultRunTabs = Template.bind({});
DefaultRunTabs.args = {
  runData: MOCK_RUN_TABS,
  plates: MOCK_PLATES,
};
