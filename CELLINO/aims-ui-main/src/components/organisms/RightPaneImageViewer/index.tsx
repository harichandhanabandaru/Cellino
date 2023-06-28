import * as React from "react";
import Box from "@mui/material/Box";
import AngleDoubleLeft from "../../../assets/AngleDoubleLeft.png";
import IconButton from "@mui/material/IconButton";
import RightPaneImageViewerIcon from "../../atoms/RightPaneImageViewerIcon";
import Drawer from "@mui/material/Drawer";
import AttributeCommentTabs from "../AttributionPanel/AttributeCommentTabs";
import { Toolbar } from "@mui/material";
import { SIZES } from "../../../constants";
import {
  InferenceLayer,
  DropPlateProps,
  DropWellProps,
  Well,
  Plate,
} from "../../../constants/types";
import {
  ClusterMetrics,
  ImageEvent,
  ImageEventsQuery,
} from "../../../generated/graphql";

interface RightPanelImageViewerProps {
  rightPanelOpen: boolean;
  setRightPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newPolygonData: any;
  setNewPolygonData: React.Dispatch<React.SetStateAction<any>>;
  handleClusterCreation: Function;
  well: Well;
  selectedImageEventId: string | null;
  handleColonyAndClusterCreation: Function;
  inferenceLayers: InferenceLayer[];
  plate: Plate | undefined;
  dropWell: DropWellProps;
  setDropWell: React.Dispatch<React.SetStateAction<DropWellProps>>;
  handleDropWell: () => void;
  dropPlate: DropPlateProps;
  setDropPlate: React.Dispatch<React.SetStateAction<DropPlateProps>>;
  handleDropPlate: () => void;
  refetch?: () => void;
  setIsWellAttributesChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  imageEvents: ImageEvent[];
  handleScanObjectCreation: () => void;
  clusterMetrics?: ClusterMetrics[];
  imageEventsData?: ImageEventsQuery;
}

export default function RightPaneImageViewer({
  setRightPanelOpen,
  rightPanelOpen,
  newPolygonData,
  setNewPolygonData,
  handleClusterCreation,
  well,
  selectedImageEventId,
  handleColonyAndClusterCreation,
  inferenceLayers,
  plate,
  dropWell,
  setDropWell,
  handleDropWell,
  dropPlate,
  setDropPlate,
  handleDropPlate,
  refetch,
  setIsWellAttributesChanged,
  imageEvents,
  handleScanObjectCreation,
  clusterMetrics,
  imageEventsData,
}: RightPanelImageViewerProps) {
  const handleDrawer = () => {
    setRightPanelOpen(!rightPanelOpen);
  };

  return (
    <Box data-testid={"RightPaneImageViewer"}>
      <Drawer
        variant="permanent"
        open={rightPanelOpen}
        PaperProps={{
          style: {
            width: !rightPanelOpen
              ? `${SIZES.IMAGE_VIEWER_PAGE.RIGHT_PANEL}px`
              : "300px",
            height: "100%",
            overflowX: "hidden",
          },
        }}
        anchor="right"
      >
        <Toolbar />
        {!rightPanelOpen && (
          <IconButton
            disableRipple
            sx={{
              "&:hover": {
                backgroundColor: "white",
              },
              alignItems: "center",
              marginBottom: "5px",
              justifyContent: rightPanelOpen ? "initial" : "center",
            }}
            onClick={handleDrawer}
          >
            {
              <RightPaneImageViewerIcon
                src={AngleDoubleLeft}
                alt="AngleDoubleLeft"
              />
            }
          </IconButton>
        )}
        {rightPanelOpen && (
          <AttributeCommentTabs
            handleDrawer={handleDrawer}
            newPolygonData={newPolygonData}
            setNewPolygonData={setNewPolygonData}
            handleClusterCreation={handleClusterCreation}
            well={well}
            selectedImageEventId={selectedImageEventId}
            handleColonyAndClusterCreation={handleColonyAndClusterCreation}
            inferenceLayers={inferenceLayers}
            plate={plate}
            dropWell={dropWell}
            setDropWell={setDropWell}
            handleDropWell={handleDropWell}
            dropPlate={dropPlate}
            setDropPlate={setDropPlate}
            handleDropPlate={handleDropPlate}
            refetch={refetch}
            setIsWellAttributesChanged={setIsWellAttributesChanged}
            imageEvents={imageEvents}
            handleScanObjectCreation={handleScanObjectCreation}
            clusterMetrics={clusterMetrics}
            imageEventsData={imageEventsData}
          />
        )}
      </Drawer>
    </Box>
  );
}
