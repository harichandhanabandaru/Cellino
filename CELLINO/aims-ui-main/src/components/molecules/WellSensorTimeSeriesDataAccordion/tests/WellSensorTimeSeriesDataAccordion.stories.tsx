import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import WellSensorTimeSeriesDataAccordion from "../index";

export default {
  title: "Molecules/WellSensorTimeSeriesDataAccordion",
  component: WellSensorTimeSeriesDataAccordion,
  argTypes: {
    onExpandedChange: { action: "onExpandedChange" },
  },
} as ComponentMeta<typeof WellSensorTimeSeriesDataAccordion>;

const Template: ComponentStory<typeof WellSensorTimeSeriesDataAccordion> = (
  args
) => (
  <div style={{ width: "256px" }}>
    <WellSensorTimeSeriesDataAccordion {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  expanded: true,
  dailyAverageTemp: "-",
  dailyMaxTemp: "-",
  ph: "-",
  o2Level: "-",
  co2Level: "-",
};
