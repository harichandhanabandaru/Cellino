import { Meta, Story } from "@storybook/react/types-6-0";
import RunDetails, { RunDetailsProps } from "..";

export default {
  title: "Molecules/RunDetails",
  component: RunDetails,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41620",
    },
  },
} as Meta;

const Template: Story<RunDetailsProps> = (args) => <RunDetails {...args} />;

export const Run1 = Template.bind({});
Run1.args = {
  name: "iPSC101 - Confluence rate improvements with monobasic Sodium Phosphate",
  collaboratorName: "Integra Lifesciences",
  type: "Development run",
  runDay: 10,
  purpose:
    "The aim of this run is to assess effects of monobasic Sodium Phosphate during the lifecycle of iPSC101. Corresponding GBG experiement protocol is EXP302. Key watch windows are days 8-10 and 22-25 during the lifecycle.",
};
