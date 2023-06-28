// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loaderCountVar } from "../../../apollo/cache";
import {
  usePlatesLazyQuery,
  useRunByIdLazyQuery,
  useWorkflowDetailsByIdLazyQuery,
} from "../../../generated/graphql";
import LeftPanelRunDetails from "../../organisms/LeftPanelRunDetails";
import RightPanelRunDetails from "../../organisms/RightPanelRunDetails";
import memoize from "memoize-one";
import { WorkflowTabProps } from "../../../constants/types";
import { getRunReviewers } from "../../organisms/RunsView";

const PLATE_DATA_SIZE = 200;

const getRequiredPlates = memoize((plateData) => {
  const plates: string[] = [];
  plateData.map((plate: { name: string }) => plates.push(plate.name ?? ""));
  return plates;
});

const RunDetailPage = () => {
  const { runId } = useParams();

  const [getRunById, { data: runsData, loading: runLoading, error: runError }] =
    useRunByIdLazyQuery();
  const [
    getPlatesData,
    { data: requiredPlatesData, loading: plateLoading, error: plateError },
  ] = usePlatesLazyQuery();
  const [getWorkflowDetailsById, { data: workflowData, error: workflowError }] =
    useWorkflowDetailsByIdLazyQuery();

  const [variables, setVariables] = useState<{
    runIds: string[];
    size: number;
    page: number;
  }>({
    runIds: [runId ?? ""],
    page: 1,
    size: PLATE_DATA_SIZE,
  });

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!runLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (runLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [runLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!plateLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (plateLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [plateLoading]);

  useEffect(() => {
    return () => {
      loaderCountVar({ count: 0 });
    };
  }, []);

  useEffect(() => {
    setVariables((prevState) => ({
      ...prevState,
      runIds: [runId ?? ""],
      page: 1,
    }));
  }, [runId]);

  useEffect(() => {
    if (runId) {
      getRunById({
        variables: {
          runId: runId,
        },
      });
      getPlatesData({
        variables: variables,
      });
    }
  }, [getPlatesData, getRunById, runId, variables]);

  useEffect(() => {
    if (runsData) {
      getWorkflowDetailsById({
        variables: {
          workflowDetailsId: runsData?.run?.workflowId ?? "",
        },
      });
    }
  }, [getWorkflowDetailsById, runsData]);

  const getStartDay = (seedingDay: string) => {
    if (seedingDay) {
      const date = new Date(seedingDay);
      const result = date.toLocaleDateString();
      return result;
    }
    return "-";
  };

  const plates =
    requiredPlatesData?.plates.content &&
    getRequiredPlates(requiredPlatesData?.plates.content);

  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "auto 1fr",
        height: "100%",
        width: "100%",
      }}
    >
      <LeftPanelRunDetails
        runData={{
          name: runsData?.run.name ?? "-",
          workflowType: workflowData?.workflowDetails?.type ?? "",
          startDate: getStartDay(runsData?.run.seedingDay ?? ""),
          NoofPlates: runsData?.run.runMetric?.platesCount ?? "-",
          NoofWells: runsData?.run.runMetric?.wellsCount ?? "-",
          activePlates: runsData?.run.runMetric?.activePlatesCount ?? "-",
          activeWells: runsData?.run.runMetric?.activeWellsCount ?? "-",
          originalPlates: runsData?.run.runMetric?.originalPlateCount ?? "-",
          originalWells: runsData?.run.runMetric?.originalWellCount ?? "-",
          status: runsData?.run?.status ?? "-",
          runDay: runsData?.run.runDay ?? "-",
          reviewer: getRunReviewers(runsData?.run?.runReviewer),
        }}
      />
      <div css={{ backgroundColor: "#FBFAFC", height: "100%" }}>
        <RightPanelRunDetails
          runsError={runError && plateError ? true : false}
          runData={runsData?.run}
          plates={plates ?? []}
          workflowData={workflowData?.workflowDetails as WorkflowTabProps}
          workflowError={workflowError ? true : false}
        />
      </div>
    </div>
  );
};

export default RunDetailPage;
