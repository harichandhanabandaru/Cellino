import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import InferenceAccordion from "../index";

export default {
  title: "Molecules/InferenceAccordion",
  component: InferenceAccordion,
  argTypes: {
    onExpandedChange: { action: "onExpandedChange" },
  },
} as ComponentMeta<typeof InferenceAccordion>;

const Template: ComponentStory<typeof InferenceAccordion> = (args) => (
  <div style={{ width: "256px" }}>
    <InferenceAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  name: "Inference",
  width: "12x",
  height: "14x",
  pixelSize: "14x",
  pixelSizeUnit: "μm",
  protocalID: "Protocal 1",
};
