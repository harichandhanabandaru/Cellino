import React from "react";
import TopBarImageView from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Organisms/TopBarImageView",
  component: TopBarImageView,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A69596",
    },
  },
} as Meta;

// @ts-ignore
const Template: Story<any> = () => (
  <TopBarImageView
    handleZaxisChange={Function}
    zArray={[-1, 0, 4, 9]}
    currentZAxis={1}
    onPolygonClick={() => {}}
    creationMode={true}
    internalPolygonDisabled={false}
    handleInternalPolygon={() => {}}
    canDrawInternalPolygon={false}
    handleWellChange={() => {}}
    wellList={[]}
    selectedWellId={""}
    handleComplete={() => {}}
    handleBackToPlate={jest.fn()}
    scanObjectMetrics={[]}
  />
);

export const Default = Template.bind({});
