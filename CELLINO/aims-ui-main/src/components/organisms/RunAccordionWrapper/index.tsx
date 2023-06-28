import { useEffect, useState } from "react";
import RunAccordion from "../../molecules/RunAccordion";
import { Run, Plate, Reviewer } from "../../../constants/types";
import {
  usePlatesLazyQuery,
  usePhaseLazyQuery,
} from "../../../generated/graphql";
import memoize from "memoize-one";
import { formatName } from "../../../utils/formatName";

const PLATE_DATA_SIZE = 200;
const plateNameData = memoize((requiredPlatesData) => {
  if (requiredPlatesData?.plates?.content !== undefined) {
    return requiredPlatesData?.plates?.content.map(
      (plate: Plate, index: number) => {
        return plate.name;
      }
    );
  }
});

const cloneReviewStatus = (cloneReviewStatus: string | undefined | null) => {
  if (cloneReviewStatus !== null && cloneReviewStatus !== undefined) {
    if (cloneReviewStatus === "INREVIEW") {
      return "In review";
    } else if (cloneReviewStatus === "COMPLETED") {
      return "Completed";
    } else {
      return "-";
    }
  } else {
    return "-";
  }
};

const runOwner = (runOwnerFirst: any, runOwnerLast: any) => {
  return formatName(runOwnerFirst, runOwnerLast);
};

const currentPhase = (phaseName: string | undefined | null) => {
  if (phaseName !== null && phaseName !== undefined) {
    return phaseName;
  } else {
    return "-";
  }
};

const reviewers = (reviewers: Reviewer | null | undefined) => {
  if (reviewers !== null && reviewers !== undefined) {
    if (reviewers?.length > 0) {
      const reviewersList = [];
      for (let i = 0; i < reviewers?.length; i++) {
        reviewersList.push(
          reviewers[0]?.firstName + "  " + reviewers[0]?.lastName
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

function RunAccordionWrapper({ run }: { run: Run | undefined | null }) {
  const [expanded, setExpanded] = useState(false);

  const [getPlatesData, { data: requiredPlatesData }] = usePlatesLazyQuery();
  const [getPhaseData, { data: phaseData }] = usePhaseLazyQuery();

  const [variables, setVariables] = useState<{
    runIds: string[];
    size: number;
    page: number;
  }>({
    runIds: [run?.id ?? ""],
    page: 1,
    size: PLATE_DATA_SIZE,
  });
  useEffect(() => {
    if (run?.id !== undefined) {
      getPlatesData({
        variables: variables,
      });
    }
    if (run?.phaseId !== undefined && run?.phaseId !== null) {
      getPhaseData({
        variables: { phaseId: run?.phaseId },
      });
    }
  }, [getPhaseData, getPlatesData, run?.id, run?.phaseId, variables]);

  useEffect(() => {
    setVariables((prevState) => ({
      ...prevState,
      runIds: [run?.id ?? ""],
      page: 1,
    }));
  }, [run?.id]);

  const plateNames = plateNameData(requiredPlatesData);

  const startDay = () => {
    if (run?.seedingDay !== undefined && run?.seedingDay !== null) {
      const date = new Date(run?.seedingDay);
      return date.toLocaleString();
    } else {
      return "-";
    }
  };
  return (
    <RunAccordion
      expanded={expanded}
      runName={run?.name ?? "-"}
      partner={run?.partner?.name ?? "-"}
      runId={`${run?.id}` ?? "-"}
      objective={run?.objective ?? "-"}
      summary={run?.summary ?? "-"}
      creator={run?.creatorId ?? "-"}
      owner={runOwner(run?.runOwner?.firstName, run?.runOwner?.lastName)}
      runDay={run?.runDay ?? "-"}
      startDay={startDay() ?? "-"}
      runStatus={run?.status ?? "-"}
      cloneReviewStatus={cloneReviewStatus(run?.cloneReviewStatus)}
      workFlowID={run?.workflowId ?? "-"}
      currentPhase={currentPhase(phaseData?.phase?.phaseName)}
      plates={plateNames}
      onExpandedChange={() => setExpanded((prevState) => !prevState)}
      reviewers={reviewers(run?.runReviewer)}
    />
  );
}

export default RunAccordionWrapper;
