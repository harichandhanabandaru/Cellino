import React from "react";
import InputTextField from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Atoms/InputTextField",
  component: InputTextField,
} as Meta<typeof InputTextField>;

const Template: Story<typeof InputTextField> = () => {
  const [text, setText] = React.useState("");

  return <InputTextField value={text} setSearchText={setText} />;
};

export const InputTextFieldStory = Template.bind({});
