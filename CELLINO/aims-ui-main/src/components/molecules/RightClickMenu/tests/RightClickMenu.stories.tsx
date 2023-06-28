import { ComponentStory, ComponentMeta } from "@storybook/react";
import RightClickMenu from "..";

export default {
  title: "Organisms/RightClickMenu",
  component: RightClickMenu,
  decorators: [
    () => {
      return (
        <RightClickMenu
          show={true}
          handleClickAway={() => {}}
          xCoordinate={0}
          yCoordinate={0}
          handleRightClickDelete={() => {}}
        />
      );
    },
  ],
} as ComponentMeta<typeof RightClickMenu>;

const Template: ComponentStory<typeof RightClickMenu> = (args) => (
  <RightClickMenu {...args} />
);
export const Default = Template.bind({});
Default.args = {};
