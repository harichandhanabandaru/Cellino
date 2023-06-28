import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import WellAccordion from "../index";

export default {
  title: "Molecules/WellAccordion",
  component: WellAccordion,
  argTypes: {
    onExpandedChange: { action: "onExpandedChange" },
  },
} as ComponentMeta<typeof WellAccordion>;

const Template: ComponentStory<typeof WellAccordion> = (args) => (
  <div style={{ width: "256px" }}>
    <WellAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  wellId: "efdc9d24-ec00-11ec-b2c5-0242ac120004",
  plateId: "efdc9d24-ec00-11ec-b2c5-0242ac120004",
  positionName: "BO5",
  processStatus: "In progress",
  reviewStatus: "In progress",
  analysisStatus: "In progress",
  analysisStatusDetails: "Analysis status details",
  confluence: "",
  interiorConfluence: "",
  nonLiveCellOccupancy: "-",
  numberOfCells: "-",
  numberOfColonies: "-",
  contaminationScore: "-",
  reviewers: [],
  listOfEvents: [{ name: "", event: "", startedAt: "" }],
};
