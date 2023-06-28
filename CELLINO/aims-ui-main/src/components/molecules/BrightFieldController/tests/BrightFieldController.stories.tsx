import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import BrightFieldController from "../index";

export default {
  title: "Molecules/BrightFieldController",
  component: BrightFieldController,
  argTypes: {
    handleOpacityChange: { action: "handleOpacityChange" },
    handleContrastChange: { action: "handleContrastChange" },
    handleColormapChange: { action: "handleColormapChange" },
    handleClose: { action: "handleClose" },
  },
} as ComponentMeta<typeof BrightFieldController>;

const Template: ComponentStory<typeof BrightFieldController> = (args) => (
  <BrightFieldController {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  opacity: 0.5,
  contrastLimit: [0, 100],
  contrastLimitRange: [0, 100],
  color: "Blue",
};
