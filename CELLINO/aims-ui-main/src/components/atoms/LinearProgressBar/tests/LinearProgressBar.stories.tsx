import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import LinearProgressBar from "../index";

export default {
  title: "Atoms/LinearProgressBar",
  component: LinearProgressBar,
} as ComponentMeta<typeof LinearProgressBar>;

const Template: ComponentStory<typeof LinearProgressBar> = (args) => (
  <LinearProgressBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  loading: true,
};
