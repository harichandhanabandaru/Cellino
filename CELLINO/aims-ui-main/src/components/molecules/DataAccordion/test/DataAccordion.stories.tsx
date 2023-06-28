import React from "react";
import DataAccordion, { IDataAccordionProps } from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Molecules/DataAccordion",
  component: DataAccordion,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41543",
    },
  },
} as Meta<IDataAccordionProps>;

const Template: Story<IDataAccordionProps> = (args) => (
  <DataAccordion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  runValue: 35,
  status: "In progress",
  confluenceValue: "80%",
};
