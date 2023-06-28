import MenuItemSelected from "../MenuItemSelected";
import MenuItemUnSelected from "../MenuItemUnSelected";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Atoms/MenuItem",
  component: MenuItemSelected,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A70487",
    },
  },
} as Meta<typeof MenuItemSelected>;

const TemplateSelected: Story<typeof MenuItemSelected> = () => (
  <MenuItemSelected Item="Mark as keep" index={0} handleChange={() => {}} />
);

export const MenuSelected = TemplateSelected.bind({});

const TemplateUnSelected: Story<typeof MenuItemUnSelected> = () => (
  <MenuItemUnSelected Item="Mark as keep" index={0} handleChange={() => {}} />
);

export const MenuUnSelected = TemplateUnSelected.bind({});
