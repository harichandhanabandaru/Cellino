// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import "../../../i18n/config";
import { COLORS } from "../../../theme/Colors";
import ErrorSvg from "../../../assets/error.svg";
import { WorkflowTabProps } from "../../../constants/types";
import memoize from "memoize-one";
import { useTranslation } from "react-i18next";
import RunTabDetailItem from "../RunTabDetailItem";
import EmptyAndErrorState from "../EmptyAndErrorState";
import { TFunction } from "i18next";

const getLocalDateTime = (value: string | undefined) => {
  if (value) {
    const date = new Date(value);
    return date.toLocaleString();
  }
  return "-";
};

const getRequiredPhaseNames = (phases: { phaseName: string }[] | undefined) => {
  if (phases?.length === 0) {
    return "-";
  } else {
    let phaseNames: string[] = [];
    phases && phases?.map((phase) => phaseNames.push(phase?.phaseName));
    return phaseNames?.join(", ");
  }
};

const workflowDataMemoized = memoize(
  (workflowData: WorkflowTabProps | undefined, text: TFunction<string[]>) => {
    return [
      {
        label: text("workflowDetails:name"),
        value: workflowData?.name ?? "-",
      },
      {
        label: text("workflowDetails:type"),
        value: workflowData?.type ?? "-",
      },
      {
        label: text("workflowDetails:version"),
        value: workflowData?.version ?? "-",
      },
      {
        label: text("workflowDetails:id"),
        value: workflowData?.id ?? "-",
      },
      {
        label: text("workflowDetails:objective"),
        value: workflowData?.objective ?? "-",
      },
      {
        label: text("workflowDetails:phases"),
        value: getRequiredPhaseNames(workflowData?.phases) ?? "-",
      },
      {
        label: text("workflowDetails:createdBy"),
        value: workflowData?.createdBy ?? "-",
      },
      {
        label: text("workflowDetails:createdAt"),
        value: getLocalDateTime(workflowData?.createdAt),
      },
      {
        label: text("workflowDetails:modifiedBy"),
        value: workflowData?.modifiedBy ?? "-",
      },
      {
        label: text("workflowDetails:modifiedAt"),
        value: getLocalDateTime(workflowData?.modifiedAt),
      },
    ];
  }
);

const WorkflowTab = ({
  workflowData,
  workflowError,
}: {
  workflowData: WorkflowTabProps | undefined;
  workflowError?: boolean;
}) => {
  const { t: text } = useTranslation(["workflowDetails"]);
  const worflowDataList = workflowDataMemoized(workflowData, text);

  return workflowError ? (
    <div css={{ height: "100vh", marginRight: "40px", marginTop: 80 }}>
      <EmptyAndErrorState
        image={ErrorSvg}
        heading="Error loading workflow details"
        subText="We were unable to fetch workflow details. Please refresh the page and try again"
      />
    </div>
  ) : (
    <div
      css={{
        backgroundColor: COLORS.GAMMA_BACKGROUND_02,
        border: `1px solid ${COLORS.GAMMA_HEATMAP_300}`,
        borderRadius: "12px",
        margin: "31px 31px 0px 10px",
      }}
    >
      <div
        css={{
          display: "grid",
          gridAutoFlow: "row",
          gap: 22,
          margin: "30px",
        }}
      >
        {worflowDataList.map((item, index) => {
          return (
            <RunTabDetailItem
              label={item.label}
              value={item.value}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowTab;
