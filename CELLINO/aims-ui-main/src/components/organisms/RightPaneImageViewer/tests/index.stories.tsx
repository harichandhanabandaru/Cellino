import { SetStateAction } from "react";
import RightPaneImageViewer from "..";
import { Meta, Story } from "@storybook/react/types-6-0";
import {
  InferenceLayer,
  well,
  WellDropStatus,
  Plate,
} from "../../../../mocks/constants";

export default {
  title: "organisms/RightPaneImageViewer",
  component: RightPaneImageViewer,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A70049",
    },
  },
} as Meta;

const Template: Story = () => (
  <RightPaneImageViewer
    setRightPanelOpen={function (value: SetStateAction<boolean>): void {}}
    rightPanelOpen={false}
    newPolygonData={undefined}
    setNewPolygonData={function (value: any): void {}}
    handleClusterCreation={() => {}}
    well={well}
    handleScanObjectCreation={() => {}}
    selectedImageEventId={"116050"}
    handleColonyAndClusterCreation={() => {}}
    inferenceLayers={InferenceLayer}
    plate={Plate}
    dropPlate={{ plateId: "", status: "", reason: "" }}
    setDropPlate={() => {}}
    handleDropPlate={() => {}}
    dropWell={WellDropStatus}
    setDropWell={() => {}}
    handleDropWell={() => {}}
    imageEvents={[]}
  />
);

export const RightPaneImageViewerView = Template.bind({});
RightPaneImageViewerView.args = {};
