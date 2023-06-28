import React from "react";
import WellSelector from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Molecules/WellSelector",
  component: WellSelector,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69767",
    },
  },
} as Meta;

const Template: Story<any> = () => (
  <WellSelector
    wellList={[]}
    selectedWellId={""}
    handleChange={function (arg: string): void {
      // empty fn
    }}
  />
);

export const Primary = Template.bind({});
