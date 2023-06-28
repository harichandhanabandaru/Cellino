import React from "react";
import WellCard, { IWellCardProps } from "..";
import { Meta, Story } from "@storybook/react";
import wellImg from "../../../../assets/well.png";

export default {
  title: "Organisms/WellCard",
  component: WellCard,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41354",
    },
  },
} as Meta<IWellCardProps>;

const Template: Story<IWellCardProps> = (args) => <WellCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  runValue: 35,
  status: "In progress",
  confluenceValue: "80%",
  img: wellImg,
  wellName: "A2",
  plateId: "Plate_409102",
  noOfColonies: 3065,
};
