import React, { useEffect, useRef, useCallback } from "react";
import {
  Box,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import ClonalityTimeframeItem from "../../molecules/ClonalityTimeframeItem";
import { ReactComponent as BackIcon } from "../../../assets/back.svg";
import { ReactComponent as BackDisabledIcon } from "../../../assets/backDisabled.svg";
import { ReactComponent as NextIcon } from "../../../assets/next.svg";
import { ReactComponent as NextDisabledIcon } from "../../../assets/nextDisabled.svg";
import { ReactComponent as LeftChevronIcon } from "../../../assets/angle-left.svg";
import { ReactComponent as LeftChevronDisabledIcon } from "../../../assets/angle-left-disabled.svg";
import { ReactComponent as RightChevronIcon } from "../../../assets/angle-right.svg";
import { ReactComponent as RightChevronDisableIcon } from "../../../assets/angle-right-disabled.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/arrow-left.svg";
import { ReactComponent as ArrowLeftDisabledIcon } from "../../../assets/arrow-left-disabled.svg";
import { ReactComponent as ArrowRightIcon } from "../../../assets/arrow-right.svg";
import { ReactComponent as ArrowRightDisabledIcon } from "../../../assets/arrow-right-disabled.svg";
import handleDateStepperDecrease from "../../../utils/handleDateStepperDecrease";
import handleDateStepperIncrease from "../../../utils/handleDateStepperIncrease";
import {
  ImageEvent,
  ImageEventAnalysisStatus,
  useThumbnailsLazyQuery,
} from "../../../generated/graphql";
import { useSearchParams } from "react-router-dom";
import { loaderCountVar } from "../../../apollo/cache";

export interface ImageMeasurement {
  createdAt: string;
  imageEventId: string;
  confluence?: number;
  interiorConfluence?: number;
  thumbnailUrl: string;
}

interface ClonalityTimeframeProps {
  setSelectedImageEventId: Function;
  selectedImageEventId: string | null;
  seedingDay?: string;
  setThumbnails: Function;
}

const ClonalityTimeframe = ({
  setSelectedImageEventId,
  selectedImageEventId,
  seedingDay,
  setThumbnails,
}: ClonalityTimeframeProps) => {
  const listRef = useRef<HTMLElement>(null);
  //get url search params and extract well id and event
  let [searchParams, setSearchParams] = useSearchParams();
  const emptyImageEvents: Array<ImageEvent> = [];

  const wellId = searchParams.get("wellId") ?? "";
  const plateId = searchParams.get("plateId") ?? "";
  const eventId = searchParams.get("eventId") ?? "";

  const [
    getThumbnailsByWellId,
    { data: getThumbnailsByWellIdData, loading: thumbnailsDataLoading },
  ] = useThumbnailsLazyQuery();

  // @ts-ignore
  const imageEvents: ImageEvent[] =
    getThumbnailsByWellIdData?.imageEvents ?? emptyImageEvents;

  useEffect(() => {
    if (wellId) {
      getThumbnailsByWellId({
        variables: {
          wellId: wellId,
          width: 100,
          analysisStatus: ImageEventAnalysisStatus.Success,
          isBaseImage: true,
        },
      });
    }
  }, [getThumbnailsByWellId, wellId]);

  useEffect(() => {
    if (imageEvents?.length > 0) {
      setThumbnails(imageEvents);
    }
  }, [setThumbnails, imageEvents?.length, imageEvents]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!thumbnailsDataLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (thumbnailsDataLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [thumbnailsDataLoading]);

  useEffect(() => {
    const imageEvent = imageEvents?.find(
      (ie) => ie.id === selectedImageEventId
    );
    if (
      plateId &&
      wellId &&
      imageEvent?.event?.id &&
      imageEvent?.event?.id !== eventId
    ) {
      setSearchParams({ plateId, wellId, eventId: imageEvent.event.id });
    }
  }, [
    eventId,
    imageEvents,
    plateId,
    selectedImageEventId,
    setSearchParams,
    wellId,
  ]);

  useEffect(() => {
    /* istanbul ignore else  */
    let shouldUpdate = true;
    if (imageEvents?.length > 0) {
      if (selectedImageEventId) {
        const index = imageEvents.findIndex(
          (x) => x.id === selectedImageEventId
        );
        if (index > -1) {
          shouldUpdate = false;
        }
      }
      //check if the url has event id in it if not select the last image event in timeline
      if (
        shouldUpdate &&
        imageEvents &&
        imageEvents.length > 0 &&
        eventId === ""
      ) {
        setSelectedImageEventId(imageEvents[imageEvents.length - 1].id);
      } else if (
        shouldUpdate &&
        imageEvents &&
        imageEvents.length > 0 &&
        eventId !== "" &&
        !imageEvents?.some((ie) => ie?.event?.id === eventId)
      ) {
        setSelectedImageEventId(imageEvents[imageEvents.length - 1].id);
      }
      //if there is event id fetch the image event associated to this event and highlight it in time line
      else if (
        shouldUpdate &&
        imageEvents &&
        imageEvents.length > 0 &&
        eventId !== ""
      ) {
        const ie = imageEvents?.find((ie) => ie?.event?.id === eventId);
        setSelectedImageEventId(ie?.id);
      }
    }
  }, [imageEvents, setSelectedImageEventId, selectedImageEventId, eventId]);

  useEffect(() => {
    function isElementVisibleInParent(el: Element, parent: Element) {
      const rect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      return (
        rect.top >= parentRect.top &&
        rect.left >= parentRect.left &&
        rect.bottom <= parentRect.bottom &&
        rect.right <= parentRect.right
      );
    }
    /* istanbul ignore else */
    if (imageEvents.length && selectedImageEventId && listRef?.current) {
      const index = imageEvents.findIndex((x) => x.id === selectedImageEventId);
      /* istanbul ignore else */
      if (index > -1) {
        const el = listRef.current.childNodes?.[index] as Element;
        /* istanbul ignore if */
        if (el && !isElementVisibleInParent(el, listRef.current)) {
          el.scrollIntoView();
        }
      }
    }
  }, [selectedImageEventId, imageEvents]);

  const handleDecreaseDate = useCallback(() => {
    /* istanbul ignore next */
    const id = selectedImageEventId ?? "";
    if (imageEvents && imageEvents.length > 0) {
      const newImageEventId = handleDateStepperDecrease(id, imageEvents);
      setSelectedImageEventId(newImageEventId);
    }
  }, [selectedImageEventId, setSelectedImageEventId, imageEvents]);

  const handleIncreaseDate = useCallback(() => {
    /* istanbul ignore next */
    const id = selectedImageEventId ?? "";
    if (imageEvents && imageEvents.length > 0) {
      const newImageEventId = handleDateStepperIncrease(id, imageEvents);
      setSelectedImageEventId(newImageEventId);
    }
  }, [selectedImageEventId, setSelectedImageEventId, imageEvents]);

  const handleFastRewindEndOnClick = useCallback(() => {
    const newEventImageId = imageEvents?.[imageEvents?.length - 1]?.id;
    setSelectedImageEventId(newEventImageId);
  }, [setSelectedImageEventId, imageEvents]);

  const handleFastRewindStartOnClick = useCallback(() => {
    const newEventImageId = imageEvents?.[0]?.id;
    setSelectedImageEventId(newEventImageId);
  }, [setSelectedImageEventId, imageEvents]);

  const handleBackwardOnClick = useCallback(() => {
    const index = imageEvents.findIndex((x) => x.id === selectedImageEventId);
    /* istanbul ignore next */
    if (index > 0) {
      const newEventImageId = imageEvents?.[index - 1]?.id;
      setSelectedImageEventId(newEventImageId);
    }
  }, [imageEvents, selectedImageEventId, setSelectedImageEventId]);

  const handleForwardOnClick = useCallback(() => {
    const index = imageEvents.findIndex((x) => x.id === selectedImageEventId);
    /* istanbul ignore else */
    if (index < imageEvents.length - 1) {
      const newEventImageId = imageEvents?.[index + 1]?.id;
      setSelectedImageEventId(newEventImageId);
    }
  }, [imageEvents, selectedImageEventId, setSelectedImageEventId]);

  /* istanbul ignore next */
  const timestamp =
    imageEvents.find((x) => x.id === selectedImageEventId)?.startedAt ??
    new Date().toISOString();

  const runDay = useCallback(
    (index: number) => {
      if (seedingDay && imageEvents.length > 0) {
        const requestedTime = new Date(
          imageEvents[index]?.startedAt!
        ).getTime();
        const seedingTime = new Date(seedingDay).getTime();
        const diffTime = requestedTime - seedingTime;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays}`;
      } else {
        return "";
      }
    },
    [imageEvents, seedingDay]
  );

  const dateText = useCallback(() => {
    const index = imageEvents.findIndex((x) => x.id === selectedImageEventId);

    return `${new Date(timestamp).toUTCString().slice(5, 16)}
                (Run day ${runDay(index)})`;
  }, [imageEvents, runDay, selectedImageEventId, timestamp]);

  const getDateText = useCallback(
    (index: number) => {
      const currentDate = new Date(imageEvents?.[index]?.startedAt!);
      if (index === 0) {
        return (
          currentDate.toUTCString().slice(5, 11) + "(Day" + runDay(index) + ")"
        );
      }
      const prevDate = new Date(imageEvents?.[index - 1]?.startedAt!);
      if (
        prevDate.getUTCDate() < currentDate.getUTCDate() ||
        prevDate.getUTCMonth() < currentDate.getUTCMonth() ||
        prevDate.getUTCFullYear() < currentDate.getUTCFullYear()
      ) {
        return (
          currentDate.toUTCString().slice(5, 11) + "(Day " + runDay(index) + ")"
        );
      }
      return "";
    },
    [imageEvents, runDay]
  );

  const selectImage = useCallback(
    (id: any) => {
      setSelectedImageEventId(id);
    },
    [setSelectedImageEventId]
  );

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Box
          sx={{
            justifySelf: "start",
            display: "grid",
            gridAutoFlow: "column",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => handleDecreaseDate()} disableRipple>
            {selectedImageEventId === imageEvents[0]?.id ? (
              <SvgIcon component={LeftChevronDisabledIcon} />
            ) : (
              <SvgIcon component={LeftChevronIcon} />
            )}
          </IconButton>
          <Typography
            sx={{
              fontFamily: "Space Grotesk",
              fontSize: "12px",
              fontWeight: "700px",
              letterSpacing: "0.25px",
              textAlign: "center",
            }}
          >
            {dateText()}
          </Typography>
          <IconButton onClick={handleIncreaseDate} disableRipple>
            {selectedImageEventId ===
            imageEvents[imageEvents?.length - 1]?.id ? (
              <SvgIcon component={RightChevronDisableIcon} />
            ) : (
              <SvgIcon component={RightChevronIcon} />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            justifySelf: "center",
          }}
        >
          <IconButton onClick={handleFastRewindStartOnClick} disableRipple>
            {selectedImageEventId === imageEvents[0]?.id ? (
              <SvgIcon component={BackDisabledIcon} />
            ) : (
              <SvgIcon component={BackIcon} />
            )}
          </IconButton>
          <IconButton onClick={handleBackwardOnClick} disableRipple>
            {selectedImageEventId === imageEvents[0]?.id ? (
              <SvgIcon component={ArrowLeftDisabledIcon} />
            ) : (
              <SvgIcon component={ArrowLeftIcon} />
            )}
          </IconButton>

          <IconButton onClick={handleForwardOnClick} disableRipple>
            {selectedImageEventId ===
            imageEvents[imageEvents?.length - 1]?.id ? (
              <SvgIcon component={ArrowRightDisabledIcon} />
            ) : (
              <SvgIcon component={ArrowRightIcon} />
            )}
          </IconButton>
          <IconButton onClick={handleFastRewindEndOnClick} disableRipple>
            {selectedImageEventId ===
            imageEvents[imageEvents?.length - 1]?.id ? (
              <SvgIcon component={NextDisabledIcon} />
            ) : (
              <SvgIcon component={NextIcon} />
            )}
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          paddingTop: "16px",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
      >
        <Divider
          sx={{
            backgroundColor: "#BCB7C0",
          }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          {
            // @ts-ignore
            <ImageList
              ref={listRef}
              cols={imageEvents.length}
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                overflowY: "hidden",
                overflowX: "scroll",
                marginTop: "-10px",
                width: "100%",
              }}
            >
              {imageEvents.map((image, index) => (
                <div key={image.id}>
                  <ImageListItem
                    sx={{
                      paddingBottom: "8px",
                    }}
                  >
                    <ClonalityTimeframeItem
                      img={image.derivedArtifacts?.blob_path!}
                      time={new Date(image.startedAt!)
                        .toLocaleTimeString("it-IT")
                        .slice(0, 5)}
                      date={getDateText(index)}
                      selected={image.id === selectedImageEventId}
                      imageid={image.id!}
                      index={index}
                      selectImage={selectImage}
                    />
                  </ImageListItem>
                  <Divider
                    orientation="vertical"
                    sx={{
                      backgroundColor: "#BCB7C0",
                      marginTop: "10px",
                    }}
                  />
                </div>
              ))}
            </ImageList>
          }
        </Box>
        <Divider
          sx={{
            backgroundColor: "#BCB7C0",
            marginTop: "-18px",
          }}
        />
      </Box>
    </>
  );
};

export default ClonalityTimeframe;
