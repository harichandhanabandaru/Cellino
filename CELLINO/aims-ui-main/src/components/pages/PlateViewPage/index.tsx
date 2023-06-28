// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TopBarPlateView from "../../organisms/TopBarPlateView";
import RunDetails from "../../molecules/RunDetails";
import PlateDetails from "../../molecules/PlateDetails";
import ConfluenceScale from "../../molecules/ConfluenceScale";
import LegendsOnPlateView from "../../molecules/LegendsOnPlateView";
import WellCard from "../../organisms/WellCard";
import { LinearProgress, Modal } from "@mui/material";
import wellImg from "../../../assets/well.png";
import ProtocolRightPanel from "../../molecules/ProtocolRightPanel";
import Page from "../Page";
import { useParams } from "react-router-dom";
import {
  useEventsLazyQuery,
  usePhaseLazyQuery,
  usePlateByIdLazyQuery,
  usePlateContextLazyQuery,
  useImageEventsForEventIdLazyQuery,
  ImageEventAnalysisStatus,
} from "../../../generated/graphql";
import memoize from "memoize-one";
import { WELL_STATUS } from "../../../constants";
import { COLORS } from "../../../theme/Colors";
import { loaderCountVar, wellReviewCompletedVar } from "../../../apollo/cache";
import Tabs from "../../organisms/Tabs";
import WellHeatMapTimeSeries from "../../organisms/WellHeatMapTimeSeries";
import HeatMapDateRange from "../../molecules/HeatMapDateRange";
import { getPlateViewImageData } from "../../../utils/getPlateViewTimeSeriesData";
import { useSnackbar } from "notistack";
import { useReactiveVar } from "@apollo/client";
import { handleDownloadContextJsonFile } from "../../../utils/handleDownloadContextJsonFile";

const fetchImageViewerPage = () => import("../../pages/ImageViewerPage");

export interface ImageEventMetadata {
  notes: string;
  settings: string;
}

const ButtonStyle = {
  borderRadius: "12px",
  height: "40px",
  bgcolor: "#8900FF",
  "&:hover": {
    bgcolor: "#8900FF",
  },
};

export interface PlateEvent {
  id: string;
  createdAt: string;
  createdBy: string;
  startedAt: string;
  eventType: string;
  metadata?: string;
  modifiedAt: string;
  modifiedBy: string;
  plateId: string;
  name: string;
  completedAt: string;
}

interface EventData {
  date: string;
  events: PlateEvent[];
  runDay: string;
}

const getCompletedReviewWells = memoize((eventBasedWellData) => {
  let completedWells = 0;
  for (let imageEvent of eventBasedWellData.imageEvents) {
    if (imageEvent?.reviewStatus === WELL_STATUS.COMPLETED) {
      completedWells += 1;
    }
  }
  return completedWells;
});

const getStartDay = (createdAt: string) => {
  if (createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleString();
  }
  return " ";
};

const getTotalColoniesAndCells = memoize((wellData) => {
  let totalColonies = 0;
  let totalCells = 0;
  wellData &&
    wellData?.imageEvents?.forEach((well: any) => {
      totalColonies += well.imageMeasurements?.colonies ?? 0;
      totalCells += well.imageMeasurements?.cell_count ?? 0;
    });
  return { totalColonies, totalCells };
});

const getRequiredTimeFramesData = memoize((page, imageData) => {
  const size = 10;
  const start = page * size;
  const end = start + size;
  return imageData.slice(start, end).reverse();
});

function PlateViewPage() {
  const [open, setOpen] = useState(false);
  const [metadataPopupOpen, setMetadataPopupOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [attributeValue, setAttributeValue] = useState("Confluence");
  const [convertedImageEventData, setConvertedImageEventData] = useState<
    EventData[]
  >([]);
  const [timeFrameData, setTimeFrameData] = useState<EventData[]>([]);
  const [isCircular, setIsCircular] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isConfirmForScanClicked, setIsConFirmForScanClicked] =
    useState<boolean>(false);

  const { plateId } = useParams();
  const [getPlateByPlateId, { data: plateData, loading }] =
    usePlateByIdLazyQuery({
      fetchPolicy: "cache-and-network",
    });
  const [
    getWellDataByImageEvent,
    { data: eventBasedWellData, loading: wellDataLoading },
  ] = useImageEventsForEventIdLazyQuery({ fetchPolicy: "cache-and-network" });
  const [getPhase, { data: phaseData }] = usePhaseLazyQuery();
  const [
    getImageEventData,
    { data: imageEventData, loading: imageEventLoading },
  ] = useEventsLazyQuery();
  const [getPlateContext, { data: plateContextData }] =
    usePlateContextLazyQuery({ fetchPolicy: "no-cache" });

  const isWellReviewCompleted = useReactiveVar(wellReviewCompletedVar);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCloseSnackbar = useCallback(() => {
    closeSnackbar();
    wellReviewCompletedVar({ reviewCompleted: false, wellName: "" });
  }, [closeSnackbar]);

  useEffect(() => {
    if (plateData) {
      fetchImageViewerPage();
      setIsCircular(Boolean(plateData.plate.labware?.attributes.circular));
      const xDiameter = plateData.plate.labware?.attributes.x_diameter ?? 1;
      const yDiameter = plateData.plate.labware?.attributes.y_diameter ?? 1;
      setAspectRatio(xDiameter / yDiameter);
    }
  }, [plateData]);

  useEffect(() => {
    if (plateId) {
      getPlateByPlateId({
        variables: {
          plateId,
        },
      });
    }
  }, [plateId, getPlateByPlateId]);

  useEffect(() => {
    if (plateId) {
      getImageEventData({
        variables: {
          plateId: plateId,
        },
      });
    }
  }, [getImageEventData, plateId]);

  useEffect(() => {
    return () => {
      loaderCountVar({ count: 0 });
    };
  }, []);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!loading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (loading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [loading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!imageEventLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (imageEventLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [imageEventLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!wellDataLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (wellDataLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [wellDataLoading]);

  useEffect(() => {
    if (imageEventData) {
      // convert the image events into the series of date range
      const requiredImageEventData = getPlateViewImageData(
        imageEventData?.events,
        plateData?.plate?.run?.seedingDay
      );
      setConvertedImageEventData(requiredImageEventData);
    }
  }, [imageEventData, plateData?.plate?.run?.seedingDay]);

  useEffect(() => {
    // get the timeframe data for the date range
    if (convertedImageEventData) {
      setTimeFrameData(
        getRequiredTimeFramesData(page, convertedImageEventData)
      );
    }
  }, [convertedImageEventData, page]);

  useEffect(() => {
    if (plateData?.plate.currentPhaseId) {
      getPhase({
        variables: {
          phaseId: plateData?.plate.currentPhaseId,
        },
      });
    }
  }, [getPhase, plateData?.plate.currentPhaseId]);

  const handleChange = () => {
    setOpen(!open);
  };

  const handleDecreaseDate = () => {
    setPage(page + 1);
  };
  const handleIncreaseDate = () => {
    setPage(page - 1);
  };

  const handleAttributeSelect = (e: any) => {
    setAttributeValue(e.target.value as string);
  };

  const handleImageSelect = (event: PlateEvent) => {
    setSelectedEventImage(event);
    if (event && event.eventType === "SEEDING") {
      setMetadataPopupOpen(true);
    }
  };

  const imageEventsLength =
    timeFrameData && timeFrameData[timeFrameData?.length - 1]?.events?.length;
  // selected image holds the event which is selected in time series,stores (eventId, createdat, createdby)
  const [selectedEventImage, setSelectedEventImage] = useState<PlateEvent>(
    (timeFrameData &&
      timeFrameData[timeFrameData?.length - 1]?.events[
        imageEventsLength - 1
      ]) ??
      " "
  );

  useEffect(() => {
    setSelectedEventImage(
      timeFrameData &&
        timeFrameData[timeFrameData?.length - 1]?.events[imageEventsLength - 1]
    );
  }, [imageEventsLength, timeFrameData]);

  useEffect(() => {
    if (isWellReviewCompleted.reviewCompleted) {
      enqueueSnackbar(
        `Well ${isWellReviewCompleted.wellName} marked completed.`,
        {
          variant: "success",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          preventDuplicate: true,
          onClose: handleCloseSnackbar,
        }
      );
    }
  }, [enqueueSnackbar, handleCloseSnackbar, isWellReviewCompleted]);

  const { totalColonies, totalCells } =
    getTotalColoniesAndCells(eventBasedWellData);

  const numberOfWells = eventBasedWellData?.imageEvents?.length ?? 0;

  useEffect(() => {
    if (selectedEventImage?.id) {
      getWellDataByImageEvent({
        variables: {
          eventId: selectedEventImage?.id,
          analysisStatus: ImageEventAnalysisStatus.Success,
          isBaseImage: true,
        },
      });
    }
  }, [getWellDataByImageEvent, selectedEventImage?.id]);

  const completedReviewWells =
    (eventBasedWellData && getCompletedReviewWells(eventBasedWellData)) ?? 0;

  const linearProgressValue = numberOfWells
    ? (completedReviewWells * 100) / numberOfWells
    : 0;

  useEffect(() => {
    if (isConfirmForScanClicked && plateContextData) {
      handleDownloadContextJsonFile(plateContextData, true);
      setIsConFirmForScanClicked(false);
    }
  }, [isConfirmForScanClicked, plateContextData]);

  const handleConfirmForScan = useCallback(() => {
    getPlateContext({
      variables: {
        plateContextId: plateId ?? "",
      },
    });
    setIsConFirmForScanClicked(true);
  }, [getPlateContext, plateId]);

  const wellHeatMapTabs = [
    {
      label: "All events",
      tabpanel: timeFrameData && (
        <WellHeatMapTimeSeries
          plateId={plateId as string}
          attributeValue={attributeValue}
          eventBasedWellData={eventBasedWellData?.imageEvents ?? []}
          eventData={timeFrameData}
          totalColonies={totalColonies}
          handleImageSelect={handleImageSelect}
          selectedEventImage={selectedEventImage}
          totalCells={totalCells}
          plateStatus={plateData?.plate?.plateStatus as string}
          plateProcessStatus={plateData?.plate?.processStatus as string}
          isCircular={isCircular}
          aspectRatio={aspectRatio}
          rows={plateData?.plate?.labware?.attributes?.rows ?? 1}
          columns={plateData?.plate?.labware?.attributes?.columns ?? 1}
        />
      ),
    },
  ];

  return (
    <>
      <Page title="Wells">
        <div
          css={{
            display: "grid",
            gridAutoFlow: "row",
            gridTemplateRows: "auto 1fr",
            height: "100%",
          }}
        >
          <TopBarPlateView />
          <div
            css={{
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateColumns: "auto 1fr",
              height: "100%",
              marginLeft: 37,
              overflow: "hidden",
            }}
          >
            <ConfluenceScale
              handleDropdownChange={handleAttributeSelect}
              value={attributeValue}
            />
            <div
              css={{
                display: "grid",
                gridTemplateRows: "auto  auto auto 1fr",
                gridAutoFlow: "row",
                marginLeft: 30,
                marginTop: 20,
                paddingRight: 37,
                overflow: "scroll",
              }}
            >
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  css={{
                    display: "grid",
                    gridAutoFlow: "row",
                  }}
                >
                  <RunDetails
                    name={plateData?.plate?.run?.name ?? ""}
                    collaboratorName={
                      plateData?.plate?.run?.partner?.name ?? ""
                    }
                    type={plateData?.plate?.run?.workflow?.type ?? ""}
                    runDay={Number(plateData?.plate.run?.runDay ?? 0)}
                    purpose={plateData?.plate?.run?.objective ?? ""}
                  />
                  <PlateDetails
                    phaseName={phaseData?.phase?.phaseName ?? ""}
                    plateName={plateData?.plate?.name ?? ""}
                    noOfWells={numberOfWells}
                    passageNumber={
                      plateData?.plate?.processMetadata?.passage_number ?? ""
                    }
                    downSelectionDay={
                      plateData?.plate?.processMetadata?.downSelectionDay ?? ""
                    }
                  />
                  <Typography variant="caption2">{`${totalColonies} colonies`}</Typography>
                </div>
                <Button
                  variant="contained"
                  sx={{
                    ...ButtonStyle,
                  }}
                  onClick={handleConfirmForScan}
                >
                  <Typography variant="body5">Confirm for Scanning</Typography>
                </Button>
              </div>
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "column",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: 10,
                }}
              >
                <div
                  css={{
                    display: "grid",
                    gridAutoFlow: "column",
                    gap: 4,
                    alignItems: "baseline",
                  }}
                >
                  <LinearProgress
                    data-testid={"ProgressBar"}
                    sx={{
                      marginTop: "15px",
                      height: "5px",
                      width: "156px",
                      backgroundColor: " #EAE4F0",
                      borderRadius: "45px",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#38CB89",
                        borderRadius: "45px",
                      },
                    }}
                    variant="determinate"
                    value={linearProgressValue}
                  />
                  <Typography
                    variant="body4"
                    sx={{
                      color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                      whiteSpace: "nowrap",
                    }}
                  >{`${completedReviewWells}/${numberOfWells} completed`}</Typography>
                </div>
                <LegendsOnPlateView />
              </div>
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "column",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: 8,
                  marginTop: 9,
                }}
              >
                <Typography
                  variant="caption1"
                  color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
                >
                  {`Images created at: ${getStartDay(
                    selectedEventImage?.createdAt ?? ""
                  )}`}
                </Typography>
              </div>
              <div
                css={{
                  marginTop: 8,
                  display: "grid",
                  gridAutoFlow: "column",
                  position: "relative",
                }}
              >
                <Tabs tabs={wellHeatMapTabs} />
                {/* date range tab for increasing and decreasing dates */}
                <HeatMapDateRange
                  handleDecreaseDate={handleDecreaseDate}
                  handleIncreaseDate={handleIncreaseDate}
                  imageEventData={convertedImageEventData}
                  timeFrameData={timeFrameData}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={metadataPopupOpen}
          onClose={() => setMetadataPopupOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            css={{
              position: "absolute",
              top: "calc(50% - 270px)",
              right: "calc(50% - 11vw)",
              zIndex: 300,
            }}
          >
            <ProtocolRightPanel
              settingsData={selectedEventImage?.metadata || "{}"}
              handleClose={() => setMetadataPopupOpen(false)}
              rootName={plateData?.plate.name || "Plate"}
              tabName={"Seeding information"}
            />
          </div>
        </Modal>
        {open && (
          <WellCard
            runValue={35}
            status={"In progress"}
            confluenceValue={"80%"}
            img={wellImg}
            wellName={"A2"}
            plateId={"Plate_409102"}
            noOfColonies={3065}
            open={handleChange}
          />
        )}
      </Page>
    </>
  );
}

export default PlateViewPage;
