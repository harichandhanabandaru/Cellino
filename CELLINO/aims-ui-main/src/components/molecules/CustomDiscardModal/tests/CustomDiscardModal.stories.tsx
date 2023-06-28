import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CustomDiscardModal from "../index";
import imageViewerMessages from "../../../../messages/imageViewerMessages";

export default {
  title: "Molecules/CustomDiscardModal",
  component: CustomDiscardModal,
  argTypes: {
    handleCancel: { action: "handleCancel" },
    handleContinue: { action: "handleContinue" },
  },
} as ComponentMeta<typeof CustomDiscardModal>;

const Template: ComponentStory<typeof CustomDiscardModal> = (args) => (
  <CustomDiscardModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  open: true,
  heading: imageViewerMessages.CLUSTER_DISCARD_POPUP_TEXT,
  subText: imageViewerMessages.CLUSTER_DISCARD_POPUP_SUBTEXT,
};
