import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ZarrImageViewer from "../index";

export default {
  title: "Organisms/ZarrImageViewer",
  component: ZarrImageViewer,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4707%3A33628",
    },
  },
} as ComponentMeta<typeof ZarrImageViewer>;

const Template: ComponentStory<typeof ZarrImageViewer> = (args) => (
  <ZarrImageViewer {...args} />
);

export const ImageViewer = Template.bind({});
ImageViewer.args = {
  dataUrl: "http://storage.googleapis.com/cellino/10364-287-231/",
};
