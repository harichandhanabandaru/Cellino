import AttributeCommentTabs from "..";
import {
  InferenceLayer,
  well,
  Plate,
  WellDropStatus,
} from "../../../../../mocks/constants";

export default {
  title: "organisms/AttributeCommentTabs",
  component: AttributeCommentTabs,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=2031%3A58222",
    },
  },
};

export const AttributeCommentTabsStory = () => (
  <AttributeCommentTabs
    handleDrawer={Function}
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
