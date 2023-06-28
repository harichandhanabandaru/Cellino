import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import RecenterButton from "../index";

export default {
  title: "Atoms/RecenterButton",
  component: RecenterButton,
  argTypes: {
    onClick: { action: "onClick" },
  },
} as ComponentMeta<typeof RecenterButton>;

const Template: ComponentStory<typeof RecenterButton> = (args) => (
  <RecenterButton {...args} />
);

export const Primary = Template.bind({});
