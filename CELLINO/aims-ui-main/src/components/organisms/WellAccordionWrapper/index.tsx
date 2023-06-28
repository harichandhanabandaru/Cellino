import React, { useState } from "react";
import WellAccordion from "../../molecules/WellAccordion";
import memoize from "memoize-one";
import { Well, DropWellProps, Reviewer } from "../../../constants/types";
import WellStatusDropDown from "../../molecules/WellStatusDropDown";
import { formatName } from "../../../utils/formatName";
import { ANALYSIS_STATUS } from "../../../constants";
import { ImageEvent } from "../../../generated/graphql";

const listOfEvents = memoize((imageEvents: ImageEvent[]) => {
  const eventList = [];

  for (const imageEvent of imageEvents) {
    const date = new Date(imageEvent?.startedAt!);
    eventList.push({
      event: "IMAGING",
      startedAt: imageEvent?.startedAt! !== null ? date.toLocaleString() : "-",
    });
  }
  return eventList;
});

const processStatus = (well: Well) => {
  if (well?.processStatus === "IMAGINGQUEUE") {
    return "Imaging queue";
  } else if (well?.processStatus === "IMAGING") {
    return "Imaging";
  } else if (well?.processStatus === "SCANNINGQUEUE") {
    return "Scanning queue";
  } else if (well?.processStatus === "SCANNING") {
    return "Scanning";
  } else if (well?.processStatus === "DROPPED") {
    return "Dropped";
  } else if (well?.processStatus === "RETIRED") {
    return "Retired";
  } else {
    return "-";
  }
};

const analysisStatus = (well: Well) => {
  if (well?.analysisStatus === ANALYSIS_STATUS.IN_QUEUE) {
    return "In queue";
  } else if (well?.analysisStatus === ANALYSIS_STATUS.IN_PROGRESS) {
    return "In progress";
  } else if (well?.analysisStatus === ANALYSIS_STATUS.FAILED) {
    return "Failed";
  } else if (well?.analysisStatus === ANALYSIS_STATUS.SUCCESS) {
    return "Success";
  } else {
    return "-";
  }
};

const reviewStatus = (well: Well) => {
  if (well?.reviewStatus === "NOTSTARTED") {
    return "Not started";
  } else if (well?.reviewStatus === "INREVIEW") {
    return "In review";
  } else if (well?.reviewStatus === "PAUSED") {
    return "Paused";
  } else if (well?.reviewStatus === "COMPLETED") {
    return "Completed";
  } else {
    return "-";
  }
};

const reviewers = (reviewers: Reviewer) => {
  if (reviewers !== null && reviewers !== undefined) {
    if (reviewers.length > 0) {
      const reviewersList = [];
      for (let i = 0; i < reviewers.length; i++) {
        reviewersList.push(
          formatName(
            reviewers[0]?.firstName ?? "",
            reviewers[0]?.lastName ?? ""
          )
        );
      }
      return reviewersList;
    } else {
      return [];
    }
  } else {
    return [];
  }
};
function WellAccordionWrapper({
  well,
  dropWell,
  setDropWell,
  handleDropWell,
  plateProcessStatus,
  imageEvents,
}: {
  well: Well;
  selectedEventImageId: string | null;
  dropWell: DropWellProps;
  setDropWell: React.Dispatch<React.SetStateAction<any>>;
  handleDropWell: () => void;
  plateProcessStatus: string;
  imageEvents: ImageEvent[];
}) {
  // todo: analyse how we can measurement data
  const [expanded, setExpanded] = useState(false);

  const listOfEventsList = listOfEvents(imageEvents);

  return (
    <>
      <WellAccordion
        expanded={expanded}
        wellId={well?.id ?? "-"}
        plateId={well?.plateId ?? "-"}
        positionName={well?.position ?? "-"}
        processStatus={processStatus(well)}
        reviewStatus={reviewStatus(well)}
        analysisStatus={analysisStatus(well)}
        analysisStatusDetails={well?.analysisStatusDetail ?? "-"}
        reviewers={reviewers(well?.reviewers)}
        onExpandedChange={() => setExpanded((prevState) => !prevState)}
        confluence={"-"}
        interiorConfluence={"-"}
        nonLiveCellOccupancy={"-"}
        numberOfCells={"-"}
        numberOfColonies={"-"}
        contaminationScore={"-"}
        listOfEvents={listOfEventsList}
      />
      {expanded && (
        <>
          <WellStatusDropDown
            dropWell={dropWell}
            setDropWell={setDropWell}
            handleDropWell={handleDropWell}
            plateProcessStatus={plateProcessStatus}
          />
        </>
      )}
    </>
  );
}

export default WellAccordionWrapper;
