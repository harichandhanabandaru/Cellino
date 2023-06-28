import { Meta, Story } from "@storybook/react/types-6-0";
import DropDown, { DropDownProps } from "..";

export default {
  title: "Molecules/DropDown",
  component: DropDown,
} as Meta;

const Template: Story<DropDownProps> = (args) => <DropDown {...args} />;

export const DefaultDropdown = Template.bind({});

DefaultDropdown.args = {
  options: [
    "Confluence",
    "Interior confluence",
    "No. of cells",
    "No. of colonies",
    "Contamination Score",
  ],
  defaultValue: "Confluence",
};
