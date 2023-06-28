import { Meta, Story } from "@storybook/react/types-6-0";
import AdjustmentSlider from "..";

export default {
  title: "Atoms/AdjustmentSlider",
  component: AdjustmentSlider,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A72216",
    },
  },
} as Meta;

const Template: Story = (args) => (
  <AdjustmentSlider name={"Opacity"} value={50} {...args} />
);

export const DefaultAdjustmentSlider = Template.bind({});
