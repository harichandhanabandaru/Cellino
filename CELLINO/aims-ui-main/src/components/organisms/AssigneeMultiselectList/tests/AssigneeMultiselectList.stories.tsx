import { Meta, Story } from "@storybook/react/types-6-0";
import AssigneeMultiselectList from "..";

export default {
  title: "Organisms/AssigneeMultiselectList",
  component: AssigneeMultiselectList,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41115",
    },
  },
} as Meta;

const Template: Story = () => <AssigneeMultiselectList />;

export const Assignee = Template.bind({});
