import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Scanning } from "../../KanbanViewCards/tests/mockData";
import CardBox from "..";

export default {
  title: "Organisms/CardBox",
  component: CardBox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41106",
    },
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CardBox>;

const Template: ComponentStory<typeof CardBox> = (args) => (
  <CardBox {...args} />
);

export const card1 = Template.bind({});
card1.args = {
  cardDetails: Scanning[0],
};
