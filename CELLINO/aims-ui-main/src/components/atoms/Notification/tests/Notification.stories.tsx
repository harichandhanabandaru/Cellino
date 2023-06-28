import { NotificationIcon } from "..";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Atoms/NotificationIcon",
  component: NotificationIcon,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69588",
    },
  },
} as ComponentMeta<typeof NotificationIcon>;

const Template: ComponentStory<typeof NotificationIcon> = (args) => (
  <NotificationIcon {...args}></NotificationIcon>
);

export const Default = Template.bind({});

Default.args = {};
