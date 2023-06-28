import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Well } from "..";

export default {
  title: "Atoms/Well",
  component: Well,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69933",
    },
  },
} as ComponentMeta<typeof Well>;

const Template: ComponentStory<typeof Well> = (args) => <Well {...args}></Well>;

export const Default = Template.bind({});

Default.args = {
  sx: { width: "88px", height: "57px" },
};

export const InProgressGrid = Template.bind({});
InProgressGrid.args = {
  confluenceValue: 30,
  status: "InProgress",
  sx: { width: "88px", height: "57px" },
};

export const Completed = Template.bind({});
Completed.args = {
  confluenceValue: 30,
  status: "Completed",
  sx: { width: "88px", height: "57px" },
};
