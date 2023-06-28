import React from "react";
import { WellGrid } from "..";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { wellData } from "./mockData";

export default {
  title: "Molecules/WellGrid",
  component: WellGrid,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41221",
    },
  },
} as ComponentMeta<typeof WellGrid>;

const Template: ComponentStory<typeof WellGrid> = (args) => (
  <WellGrid {...args}></WellGrid>
);

export const Default = Template.bind({});

Default.args = {
  rows: 8,
  columns: 12,
  wellValues: wellData,
};

export const upgradedPlate = Template.bind({});

upgradedPlate.args = {
  rows: 16,
  columns: 24,
  wellValues: wellData,
  plateProcessStatus: "RETIRED",
};
