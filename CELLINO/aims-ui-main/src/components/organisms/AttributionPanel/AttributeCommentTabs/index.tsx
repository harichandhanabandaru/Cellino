import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import { COLORS } from "../../../../theme/Colors";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RightPaneImageViewerIcon from "../../../atoms/RightPaneImageViewerIcon";
import AngleDoubleRight from "../../../../assets/AngleDoubleRight.png";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PlatesAccordionWrapper from "../../../organisms/PlatesAccordionWrapper";
import WellAccordionWrapper from "../../WellAccordionWrapper";
import InferenceAccordionWrapper from "../../InferenceAccordionWrapper";
import BrightFeildAccordionWrapper from "../../BrightFieldAccordionWrapper";
import {
  DropPlateProps,
  InferenceLayer,
  Well,
  Plate,
  DropWellProps,
  colony,
} from "../../../../constants/types";
import ColonyAccordionWrapper from "../../ColonyAccordionWrapper";
import ClusterAccordionWrapper from "../../ClusterAccordionWrapper";
import {
  Cluster,
  ClusterMetrics,
  Colony,
  ImageEventsQuery,
  ImageEvent,
} from "../../../../generated/graphql";
import ClusterAccorditionGrid from "../ClusterAccorditionGrid";
import {
  clustersByAnalysisRequestOrColonyQualityVar,
  coloniesByQualityVar,
  selectedClusterIdVar,
} from "../../../../apollo/cache";
import { useReactiveVar } from "@apollo/client";
import memoize from "memoize-one";
import { useEffect, useState } from "react";

interface AttributeCommentTabsProps {
  handleDrawer: Function;
  newPolygonData: any;
  setNewPolygonData: React.Dispatch<React.SetStateAction<any>>;
  handleClusterCreation: Function;
  well: Well;
  selectedImageEventId: string | null;
  handleColonyAndClusterCreation: Function;
  inferenceLayers: InferenceLayer[];
  plate: Plate | undefined;
  dropWell: DropWellProps;
  setDropWell: React.Dispatch<React.SetStateAction<any>>;
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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const getSelectedCluster = memoize(
  (
    clustersByAnalysisOrColonyQuality: {
      [p: string]: { clusters?: Cluster[]; isVisible: Boolean };
    },
    selectedClusterId: string
  ) => {
    for (let option of Object.values(clustersByAnalysisOrColonyQuality)) {
      const clusters = option?.clusters ?? [];
      const index = clusters.findIndex(
        (cluster: { id: string }) => cluster.id === selectedClusterId
      );
      if (index > -1) {
        return clusters[index];
      }
    }
  }
);

const getColonyAssociatedWithCluster = memoize(
  (coloniesByQuality: { [p: string]: Colony[] }, colonyId) => {
    for (let colonies of Object.values(coloniesByQuality)) {
      const index = colonies?.findIndex((x) => x.id === colonyId);
      if (index > -1) {
        return colonies[index];
      }
    }
    return null;
  }
);

export default function AttributeCommentTabs({
  handleDrawer,
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
  setIsWellAttributesChanged,
  imageEvents,
  handleScanObjectCreation,
  clusterMetrics,
  imageEventsData,
}: AttributeCommentTabsProps) {
  const [value, setValue] = React.useState(0);
  const clustersByAnalysisOrColonyQuality = useReactiveVar(
    clustersByAnalysisRequestOrColonyQualityVar
  );
  const coloniesByQuality = useReactiveVar(coloniesByQualityVar);
  const selectedClusterId = useReactiveVar(selectedClusterIdVar);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);

  useEffect(() => {
    const cluster = getSelectedCluster(
      clustersByAnalysisOrColonyQuality,
      selectedClusterId
    );
    setSelectedCluster(cluster as Cluster);
  }, [clustersByAnalysisOrColonyQuality, selectedClusterId]);

  const colonyAssociatedWithCluster = getColonyAssociatedWithCluster(
    coloniesByQuality,
    selectedCluster?.colony?.id
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        "& .MuiBox-root": {
          padding: "0px",
        },
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "fixed",
          width: "287px",
          zIndex: 1,
          background: "white",
        }}
      >
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Grid item>
            <Tabs
              data-testid="tabs"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={
                  <Typography
                    variant="body5"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Attributes
                  </Typography>
                }
              />
            </Tabs>
          </Grid>
          <Grid item>
            <IconButton
              disableRipple
              sx={{
                "&:hover": {
                  backgroundColor: "white",
                },
                alignItems: "center",
              }}
              onClick={() => handleDrawer()}
            >
              <RightPaneImageViewerIcon
                src={AngleDoubleRight}
                alt="AngleDoubleRight"
              />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          data-testid="accorditions"
          sx={{
            overflowX: "scroll",
            marginTop: "50px",
          }}
        >
          {/* <RunAccordionWrapper run={plate?.run} /> */}
          <PlatesAccordionWrapper
            dropPlate={dropPlate}
            setDropPlate={setDropPlate}
            handleDropPlate={handleDropPlate}
            plate={plate}
          />
          <WellAccordionWrapper
            well={well}
            selectedEventImageId={selectedImageEventId}
            dropWell={dropWell}
            setDropWell={setDropWell}
            handleDropWell={handleDropWell}
            plateProcessStatus={plate?.processStatus ?? ""}
            imageEvents={imageEvents}
          />
          {inferenceLayers.length > 0 && (
            <InferenceAccordionWrapper
              selectedImageEventId={selectedImageEventId}
              count={inferenceLayers.length}
            />
          )}
          <BrightFeildAccordionWrapper imageEventsData={imageEventsData} />
          {colonyAssociatedWithCluster ? (
            <ColonyAccordionWrapper
              colonyAssociatedWithCluster={
                colonyAssociatedWithCluster as colony
              }
              selectedClusterId={selectedClusterId}
              setIsWellAttributesChanged={setIsWellAttributesChanged}
              selectedImageEventId={selectedImageEventId}
              clusterMetrics={clusterMetrics as ClusterMetrics[]}
            />
          ) : (
            selectedCluster && (
              <ClusterAccordionWrapper
                expandedCluster={true}
                cluster={selectedCluster}
                setIsWellAttributesChanged={setIsWellAttributesChanged}
                clusterMetrics={clusterMetrics}
                selectedImageEventId={selectedImageEventId}
              />
            )
          )}
          {newPolygonData && (
            <Accordion
              sx={{
                padding: 0,
                "& .Mui-expanded": {
                  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                },
              }}
              expanded={true}
              elevation={0}
              disableGutters
            >
              <AccordionSummary
                expandIcon={<ChevronRightIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  alignItems: "center",
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(90deg)",
                  },
                }}
              >
                <Typography variant="overline" sx={{ textTransform: "none" }}>
                  {newPolygonData?.category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ClusterAccorditionGrid
                  newPolygonData={newPolygonData}
                  setNewPolygonData={setNewPolygonData}
                  handleClusterCreation={handleClusterCreation}
                  handleColonyAndClusterCreation={
                    handleColonyAndClusterCreation
                  }
                  handleScanObjectCreation={handleScanObjectCreation}
                  clusterMetrics={clusterMetrics}
                  selectedImageEventId={selectedImageEventId}
                />
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </TabPanel>
    </Box>
  );
}
