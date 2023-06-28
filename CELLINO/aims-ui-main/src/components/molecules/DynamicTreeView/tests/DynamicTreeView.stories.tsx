import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import DynamicTreeView from "../index";

export default {
  title: "Molecules/DynamicTreeView",
  component: DynamicTreeView,
} as ComponentMeta<typeof DynamicTreeView>;

const Template: ComponentStory<typeof DynamicTreeView> = (args) => (
  <DynamicTreeView {...args} />
);

export const DynamicTreeViewStory = Template.bind({});
DynamicTreeViewStory.args = {
  treeViewRenderData: {
    sendai_x1356_m2D5_z0_4_8_12: {
      metadata: {
        width: 12224,
        height: 12224,
        data_type: "zarr",
        pixel_size: 0.6753,
        z_offset_um: 0,
      },
      protocol: "70824293-ce79-41e6-baa1-96c7dc4574b4",
    },
  },
};
