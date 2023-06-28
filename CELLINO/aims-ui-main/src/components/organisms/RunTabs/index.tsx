// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Divider, Link, Typography } from "@mui/material";
import React from "react";
import "../../../i18n/config";
import { Run } from "../../../constants/types";
import { COLORS } from "../../../theme/Colors";
import memoize from "memoize-one";
import { useTranslation } from "react-i18next";
import RunTabDetailItem from "../../molecules/RunTabDetailItem";
import { CLONE_REVIEW_STATUS, ROUTES, RUN_STATUS } from "../../../constants";
import EmptyAndErrorState from "../../molecules/EmptyAndErrorState";
import ErrorSvg from "../../../assets/error.svg";
import { getRunReviewers } from "../RunsView";
import { formatName } from "../../../utils/formatName";
import { TFunction } from "i18next";
export interface RunDetailMetadata {
  runId: string;
  partnerId: string;
  orderId: string;
  requestId: string;
}

export const getRunStatusValue = (status: string | number) => {
  if (status === RUN_STATUS.ABORTED) {
    return "Aborted";
  } else if (
    status === RUN_STATUS.FINISHED ||
    status === CLONE_REVIEW_STATUS.COMPLETED
  ) {
    return "Completed";
  } else if (status === RUN_STATUS.IN_PROGRESS) {
    return "In progress";
  } else if (status === CLONE_REVIEW_STATUS.IN_REVIEW) {
    return "In review";
  }
  return "-";
};

const runsMetadataMemoized = memoize(
  (runData: Run | undefined, text: TFunction<string[]>) => {
    const metadata = JSON.parse(runData?.metadata || "{}");
    return [
      {
        label: text("runDetails:runId"),
        value: runData?.id ?? "-",
      },
      {
        label: text("runDetails:partnerId"),
        value: runData?.partnerId ?? "-",
      },
      {
        label: text("runDetails:orderId"),
        value: metadata["biosero_master_order_id"] || "-",
      },
      {
        label: text("runDetails:requestId"),
        value: "-",
      },
    ];
  }
);

const runDataMemoized = memoize(
  (runData: Run | undefined, text: TFunction<string[]>) => {
    return [
      {
        label: text("runDetails:name"),
        value: runData?.name ?? "-",
      },
      {
        label: text("runDetails:summary"),
        value: runData?.summary ?? "-",
      },
      {
        label: text("runDetails:owner"),
        value:
          formatName(
            runData?.runOwner?.firstName ?? "",
            runData?.runOwner?.lastName ?? ""
          ) ?? "-",
      },
      {
        label: text("runDetails:reviewer"),
        value: getRunReviewers(runData?.runReviewer),
      },
      {
        label: text("runDetails:runDay"),
        value: runData?.runDay ?? "-",
      },
      {
        label: text("runDetails:objective"),
        value: runData?.objective ?? "-",
      },
      {
        label: text("runDetails:creator"),
        value: runData?.creator ?? "-",
      },
      {
        label: text("runDetails:status"),
        value: runData?.status ?? "-",
        isIcon: !!runData?.status,
      },
      {
        label: text("runDetails:cloneReviewStatus"),
        value: getRunStatusValue(runData?.cloneReviewStatus ?? ""),
        isIcon: !!runData?.cloneReviewStatus,
      },
      {
        label: text("runDetails:workflowId"),
        value: runData?.workflowId ?? "-",
      },
    ];
  }
);

const RunTabs = ({
  runData,
  plates,
  runsError,
}: {
  runData: Run | undefined;
  plates: string[];
  runsError?: boolean;
}) => {
  const { t: text } = useTranslation(["runDetails"]);
  const runsDataList = runDataMemoized(runData, text);
  const runsMetadataList = runsMetadataMemoized(runData, text);

  const handleRedirectToPlateView = (plate: string) => {
    localStorage.setItem("Passage Number", "");
    localStorage.setItem("Run Name", "");
    localStorage.setItem("Plate Name", plate);
  };

  return runsError ? (
    <div css={{ height: "100vh", marginRight: "40px", marginTop: 80 }}>
      <EmptyAndErrorState
        image={ErrorSvg}
        heading="Error loading run details"
        subText="We were unable to fetch run details. Please refresh the page and try again"
      />
    </div>
  ) : (
    <div
      css={{
        backgroundColor: COLORS.GAMMA_BACKGROUND_02,
        border: `1px solid ${COLORS.GAMMA_HEATMAP_300}`,
        borderRadius: "12px",
        marginRight: "31px",
        marginBottom: "20px",
        marginTop: "31px",
      }}
    >
      <div
        css={{
          display: "grid",
          gridAutoFlow: "row",
          gap: 22,
          margin: "25px 18px 12px 25px",
        }}
      >
        {runsDataList.map((item, index) => {
          return (
            <RunTabDetailItem
              label={item.label}
              value={item.value}
              isIcon={item.isIcon}
              key={index}
            />
          );
        })}
        {/* Rendering of plates */}
        <div>
          <Typography
            variant="body2"
            sx={{ fontSize: "13px" }}
            color={COLORS.BETA_TEXT_LOW_EMPHASIS}
          >{`Plates (${plates.length})`}</Typography>
          <div
            css={{
              height: "43px",
              width: "180px",
              backgroundColor: COLORS.GAMMA_BACKGROUND_04,
              display: "grid",
              alignContent: "center",
            }}
          >
            <Typography
              variant="caption1"
              sx={{
                paddingLeft: "12px",
              }}
              color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
            >
              Plate ID
            </Typography>
          </div>
          <div
            css={{ maxHeight: "183px", overflowY: "scroll", width: "191px" }}
          >
            {plates.map((plate: string, index: number) => {
              return (
                <div
                  key={index}
                  css={{
                    display: "grid",
                    alignContent: "center",
                    height: "43px",
                    backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
                    borderBottom: `1px solid ${COLORS.GAMMA_BACKGROUND_02}`,
                  }}
                >
                  <Link
                    href={`${ROUTES.PLATES}`}
                    sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
                    onClick={() => handleRedirectToPlateView(plate)}
                  >
                    <Typography
                      variant="body4"
                      sx={{
                        color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                        paddingLeft: "12px",
                      }}
                    >{`${plate}`}</Typography>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: 35, marginBottom: 10 }}>
          <Divider
            style={{
              border: `1px solid ${COLORS.BETA_TEXT_LOW_EMPHASIS}`,
              backgroundColor: COLORS.BETA_TEXT_LOW_EMPHASIS,
            }}
          />
        </div>
        {/* Metadata information */}
        <div>
          <Typography variant="caption2">Metadata</Typography>
          {runsMetadataList.map((item, index) => {
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
    </div>
  );
};

export default RunTabs;
