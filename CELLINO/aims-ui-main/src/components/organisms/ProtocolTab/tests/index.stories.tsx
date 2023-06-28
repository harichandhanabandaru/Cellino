import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProtocolTab from "..";

export default {
  title: "Organisms/ProtocolTab",
  component: ProtocolTab,
} as ComponentMeta<typeof ProtocolTab>;

const Template: ComponentStory<typeof ProtocolTab> = () => <ProtocolTab />;

export const Protocol = Template.bind({});
