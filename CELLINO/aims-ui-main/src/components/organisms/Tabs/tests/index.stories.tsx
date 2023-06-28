import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Tabs from "../index";
import { Box } from "@mui/material";

export default {
  title: "Organisms/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const DefaultTabs = Template.bind({});
DefaultTabs.args = {
  tabs: [
    {
      label: "Tab1",
      tabpanel: <Box>Tab panel for tab 1</Box>,
    },
    {
      label: "Tab2",
      tabpanel: <Box>Tab panel for tab 2</Box>,
    },
  ],
};
