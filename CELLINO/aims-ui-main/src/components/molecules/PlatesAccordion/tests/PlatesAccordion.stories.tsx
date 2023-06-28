import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import PlatesAccordion from "../index";

export default {
  title: "Molecules/PlatesAccordion",
  component: PlatesAccordion,
  argTypes: {
    onExpandedChange: { action: "onExpandedChange" },
  },
} as ComponentMeta<typeof PlatesAccordion>;

const Template: ComponentStory<typeof PlatesAccordion> = (args) => (
  <div style={{ width: "256px" }}>
    <PlatesAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  labwareID: "90279014",
  name: "x1410",
  barcode: "102398",
  listOfEvents: [{ name: "event", event: "IMAGING", startedAt: "7/7/22 4:55" }],
  currentPhase: "Clone Isolation",
  processStatus: "Scanning",
  processStatusDetail: "Placed in incubator 03/12/22 10:32 am.",
  reviewStatus: "In progress",
  anaysisStatus: "In queue",
  analysisStatusDetails: "Analysis completed at 03/12/22 12:44 pm.",
  reviewer: "Rosie R.",
};
