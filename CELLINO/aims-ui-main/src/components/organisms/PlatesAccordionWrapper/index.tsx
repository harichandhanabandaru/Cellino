import { useEffect, useState } from "react";
import PlatesAccordion from "../../molecules/PlatesAccordion";
import { Plate, Reviewer } from "../../../constants/types";
import {
  useEventsLazyQuery,
  usePhaseLazyQuery,
} from "../../../generated/graphql";
import { DropPlateProps } from "../../../constants/types";
import memoize from "memoize-one";
import { ANALYSIS_STATUS } from "../../../constants";

const listOfEventsMemoized = memoize((imageEventData: any) => {
  return imageEventData?.events?.map((imageEvent: any) => {
    const date = new Date(imageEvent?.startedAt);
    return {
      name: imageEvent?.name,
      event: imageEvent?.eventType,
      startedAt: imageEvent?.startedAt !== null ? date.toLocaleString() : "-",
    };
  });
});

const reviewStatus = (reviewStatus: string | null | undefined) => {
  if (reviewStatus === "CONFIRMED") {
    return "Confirmed";
  } else if (reviewStatus === "INPROGRESS") {
    return "In progress";
  } else if (reviewStatus === "NOTSTARTED") {
    return "Not started";
  } else {
    return "-";
  }
};
const processStatus = (processStatus: string | null | undefined) => {
  if (processStatus === "IMAGINGQUEUE") {
    return "Imaging queue";
  } else if (processStatus === "IMAGING") {
    return "Imaging";
  } else if (processStatus === "SCANNINGQUEUE") {
    return "Scanning queue";
  } else if (processStatus === "SCANNING") {
    return "Scanning";
  } else if (processStatus === "INCUBATOR") {
    return "Incubator";
  } else if (processStatus === "DROPPED") {
    return "Dropped";
  } else if (processStatus === "RETIRED") {
    return "Retired";
  } else {
    return "-";
  }
};

const analysisStatus = (analysisStatus: string | null | undefined) => {
  if (analysisStatus === ANALYSIS_STATUS.IN_QUEUE) {
    return "In queue";
  } else if (analysisStatus === ANALYSIS_STATUS.IN_PROGRESS) {
    return "In progress";
  } else if (analysisStatus === ANALYSIS_STATUS.FAILED) {
    return "Failed";
  } else if (analysisStatus === ANALYSIS_STATUS.SUCCESS) {
    return "Success";
  } else {
    return "-";
  }
};

const reviewers = (reviewers: Reviewer) => {
  if (reviewers !== null && reviewers !== undefined) {
    if (reviewers?.length > 0) {
      return reviewers[0]?.firstName + "  " + reviewers[0]?.lastName;
    } else {
      return "-";
    }
  } else {
    return "-";
  }
};
function PlatesAccordionWrapper({
  plate,
  dropPlate,
  setDropPlate,
  handleDropPlate,
}: {
  plate: Plate | undefined;
  dropPlate: DropPlateProps;
  setDropPlate: React.Dispatch<React.SetStateAction<DropPlateProps>>;
  handleDropPlate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [getImageEventData, { data: imageEventData }] = useEventsLazyQuery();
  const [getPhase, { data }] = usePhaseLazyQuery();

  useEffect(() => {
    if (plate?.currentPhaseId) {
      getPhase({
        variables: {
          phaseId: plate?.currentPhaseId,
        },
      });
    }
    if (plate?.id) {
      getImageEventData({
        variables: {
          plateId: plate?.id,
          eventType: "IMAGING",
        },
      });
    }
  }, [getImageEventData, getPhase, plate]);

  const listOfEvents = listOfEventsMemoized(imageEventData);

  return (
    <PlatesAccordion
      expanded={expanded}
      labwareID={plate?.labwareId ?? "-"}
      name={plate?.name ?? "-"}
      barcode={plate?.barcode ?? "-"}
      listOfEvents={listOfEvents}
      currentPhase={data?.phase.phaseName ?? "-"}
      processStatus={processStatus(plate?.processStatus)}
      processStatusDetail={plate?.processStatusDetail ?? "-"}
      reviewStatus={reviewStatus(plate?.reviewStatus)}
      anaysisStatus={analysisStatus(plate?.analysisStatus)}
      analysisStatusDetails={plate?.analysisStatusDetail ?? "-"}
      reviewer={reviewers(plate?.reviewers)}
      onExpandedChange={() => setExpanded((prevState) => !prevState)}
      dropPlate={dropPlate}
      setDropPlate={setDropPlate}
      handleDropPlate={handleDropPlate}
      plateStatus={plate?.plateStatus ?? "-"}
      plateStatusReason={plate?.plateStatusReason ?? "-"}
    />
  );
}

export default PlatesAccordionWrapper;
