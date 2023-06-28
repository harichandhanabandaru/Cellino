import React from "react";
import AutoCompleteSearch from "../index";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "organisms/AutoCompleteSearch",
  component: AutoCompleteSearch,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69887",
    },
  },
} as Meta;

const Template: Story = (args) => <AutoCompleteSearch></AutoCompleteSearch>;

export const TopBarKanbanView = Template.bind({});
TopBarKanbanView.args = {};
