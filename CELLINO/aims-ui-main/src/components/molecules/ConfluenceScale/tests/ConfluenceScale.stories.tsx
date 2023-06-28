import React from "react";
import ConfluenceScale from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Molecules/ConfluenceScale",
  component: ConfluenceScale,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41216",
    },
  },
} as Meta<typeof ConfluenceScale>;

const Template: Story<typeof ConfluenceScale> = () => (
  <ConfluenceScale value="No of cells" handleDropdownChange={() => {}} />
);

export const Primary = Template.bind({});
