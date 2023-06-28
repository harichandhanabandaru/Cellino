import React from "react";
import TopBarKanbanView from "..";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "organisms/TopBarKanbanView",
  component: TopBarKanbanView,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69896",
    },
  },
} as Meta;

const Template: Story = (args) => <TopBarKanbanView></TopBarKanbanView>;

export const TopBarKanbanViewStory = Template.bind({});
TopBarKanbanViewStory.args = {};
