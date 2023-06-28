import Menu from "..";
import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Organisms/RightClickMenu",
  component: Menu,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A70487",
    },
  },
  decorators: [
    () => {
      // mock state
      const [value, setValue] = useState(0);
      const options = ["Mark as keep", "Mark as kill"];

      const handleChange = (event: any) => {
        setValue(event.target.value);
      };

      return (
        <Menu value={value} options={options} handleChange={handleChange} />
      );
    },
  ],
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;
export const Default = Template.bind({});
Default.args = {};
