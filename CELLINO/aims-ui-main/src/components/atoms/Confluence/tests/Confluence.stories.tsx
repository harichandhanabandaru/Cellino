import React from "react";
import Confluence from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Atoms/Confluence",
  component: Confluence,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41216",
    },
  },
} as Meta<typeof Confluence>;

const Template: Story<typeof Confluence> = () => <Confluence />;

export const Primary = Template.bind({});
