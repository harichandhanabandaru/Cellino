import { ComponentMeta, ComponentStory } from "@storybook/react";
import ColorMap from "../index";

export default {
  title: "Molecules/ColorMap",
  component: ColorMap,
  argTypes: {
    handleColormapChange: { action: "handleColormapChange" },
  },
} as ComponentMeta<typeof ColorMap>;

const Template: ComponentStory<typeof ColorMap> = (args) => (
  <ColorMap {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: "Blue",
};
