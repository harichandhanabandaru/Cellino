import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import BrightFieldAccordion from "../index";

export default {
  title: "Molecules/BrightFieldAccordion",
  component: BrightFieldAccordion,
  argTypes: {
    onExpandedChange: { action: "onExpandedChange" },
  },
} as ComponentMeta<typeof BrightFieldAccordion>;

const Template: ComponentStory<typeof BrightFieldAccordion> = (args) => (
  <div style={{ width: "256px" }}>
    <BrightFieldAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  captureStartTime: "",
  captureEndTime: "",
  zMin: "",
  zMax: "",
  zStep: "",
  numberOfZStep: "",
  magnification: "",
  width: "",
  height: "",
  pixelSize: "",
  exposureTime: "",
  protocalID: "",
  Illuminator: "",
};
