import { ComponentMeta, ComponentStory } from "@storybook/react";
import GenericAccordion from "../index";

export default {
  title: "Molecules/GenericAccordion",
  component: GenericAccordion,
  argTypes: {
    onExpandedChange: { action: "onExpandedChange" },
    showData: { action: "showData" },
  },
} as ComponentMeta<typeof GenericAccordion>;

const Template: ComponentStory<typeof GenericAccordion> = (args) => (
  <GenericAccordion {...args} />
);

export const GenericAccordionStory = Template.bind({});
GenericAccordionStory.args = {
  expanded: true,
  name: "Generic Accordion",
};
