import React from "react";
import LeftPaneImageViewer from "..";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "organisms/LeftPaneImageViewer",
  component: LeftPaneImageViewer,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69192",
    },
  },
} as Meta;

const baseLayerData = {
  layerProps: {
    opacity: 1,
    contrastLimits: [[0, 100]],
    contrastLimitsRange: [[0, 100]],
  },
};

const setBaseLayerData = () => {
  //dummy function
};

const Template: Story = (args) => (
  <LeftPaneImageViewer
    newPolygonData={undefined}
    baseLayerData={baseLayerData}
    setBaseLayerData={setBaseLayerData}
    inferenceLayers={[]}
    scanObjectMetrics={[]}
    clusterMetrics={[]}
    colonyMetrics={{ imageEventId: "" }}
    imageEventIndex={0}
  />
);

export const LeftPaneImageViewerView = Template.bind({});
LeftPaneImageViewerView.args = {};
