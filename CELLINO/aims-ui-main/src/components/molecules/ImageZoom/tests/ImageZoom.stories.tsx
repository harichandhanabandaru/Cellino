import React from "react";
import ImageZoom from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Molecules/ImageZoom",
  component: ImageZoom,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69608",
    },
  },
} as Meta;

const Template: Story<any> = () => <ImageZoom zommValue={0} />;

export const Default = Template.bind({});
