import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { KanbanViewCards } from "..";

export default {
  title: "Organisms/KanbanViewCards",
  component: KanbanViewCards,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41094",
    },
  },
} as ComponentMeta<typeof KanbanViewCards>;

const Template: ComponentStory<typeof KanbanViewCards> = (args) => (
  <KanbanViewCards {...args} />
);

export const Default = Template.bind({});

Default.args = {
  phase: {
    __typename: "Phase",
    id: "29196408-48fb-4b74-843d-f1d67d02f0aa",
    phaseName: "VECTOR CLEARANCE",
    plateData: {
      pageInfo: {
        __typename: "PageInformation",
        page: 1,
        size: 30,
        totalElements: 100,
      },
      content: [],
    },
  },
};
