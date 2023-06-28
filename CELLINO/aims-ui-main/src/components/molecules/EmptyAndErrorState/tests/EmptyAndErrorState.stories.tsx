import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import EmptyAndErrorState from "../index";
import ErrorSvg from "../../../../assets/error.svg";

export default {
  title: "Molecules/EmptyAndErrorState",
  component: EmptyAndErrorState,
} as ComponentMeta<typeof EmptyAndErrorState>;

const Template: ComponentStory<typeof EmptyAndErrorState> = (args) => (
  <EmptyAndErrorState {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  image: ErrorSvg,
  heading: "No run details available",
  subText:
    "We were unable to fetch run details. Please refresh the page and try again",
};
