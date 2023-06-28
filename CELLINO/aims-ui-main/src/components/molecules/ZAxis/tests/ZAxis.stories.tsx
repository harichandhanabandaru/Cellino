import React from "react";
import ZAxis from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Molecules/ZAxis",
  component: ZAxis,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69748",
    },
  },
} as Meta;

const Template: Story<any> = () => (
  <ZAxis handleZaxisChange={Function} currentZAxis={1} zArray={[1, 2, 3]} />
);

export const Default = Template.bind({});
