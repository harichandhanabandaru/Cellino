import { Meta, Story } from "@storybook/react/types-6-0";
import MultiSelectSearch from "..";

export default {
  title: "Organisms/MultiSelectSearch",
  component: MultiSelectSearch,
} as Meta;

const Template: Story = () => {
  return (
    <MultiSelectSearch label={"Plate Name"} setSearchTextList={() => {}} />
  );
};

export const MultiSelectSearchStory = Template.bind({});
