// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import "../../../i18n/config";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { COLORS } from "../../../theme/Colors";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { runDetails } from "../../../constants/types";
import memoize from "memoize-one";
import { useTranslation } from "react-i18next";
import RunAccordionDetails from "../../molecules/RunAccordionDetails";
import { useNavigate } from "react-router-dom";
import { TFunction } from "i18next";

const runDataMemoized = memoize(
  (runData: runDetails, text: TFunction<string[]>) => {
    return [
      {
        label: text("runDetails:name"),
        value: runData.name,
      },
      {
        label: text("runDetails:workflowType"),
        value: runData.workflowType,
      },
      {
        label: text("runDetails:status"),
        value: runData.status,
        isIcon: runData.status !== "-",
      },
      {
        label: text("runDetails:startDate"),
        value: runData.startDate,
      },
      {
        label: text("runDetails:NoofPlates"),
        value: runData.NoofPlates,
      },
      {
        label: text("runDetails:NoofWells"),
        value: runData.NoofWells,
      },
      {
        label: text("runDetails:activePlates"),
        value: runData.activePlates,
      },
      {
        label: text("runDetails:activeWells"),
        value: runData.activeWells,
      },
      {
        label: text("runDetails:originalPlates"),
        value: runData.originalPlates,
      },
      {
        label: text("runDetails:originalWells"),
        value: runData.originalWells,
      },
      {
        label: text("runDetails:runDay"),
        value: runData.runDay,
      },
      {
        label: text("runDetails:reviewer"),
        value: runData.reviewer,
      },
    ];
  }
);

const LeftPanelRunDetails = ({ runData }: { runData: runDetails }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const handleChange = () => {
    setExpanded(!expanded);
  };
  const { t: text } = useTranslation(["runDetails"]);
  const runsDataList = runDataMemoized(runData, text);
  const handleRedirection = () => {
    navigate("/runs");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "242px",
        position: "relative",
        borderRight: `1px solid ${COLORS.GAMMA_BACKGROUND_03}`,
        height: "100%",
      }}
    >
      <div
        css={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gridAutoFlow: "row",
        }}
      >
        <div
          css={{
            height: "79px",
            display: "grid",
            justifyContent: "flex-start",
            marginLeft: 16,
          }}
        >
          <Button
            disableRipple
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={handleRedirection}
          >
            <KeyboardArrowLeftIcon
              sx={{ color: COLORS.BETA_SECONDARY_GREY, mr: 2 }}
            />
            <Typography variant="body4" color={COLORS.BETA_TEXT_LOW_EMPHASIS}>
              Runs list
            </Typography>
          </Button>
        </div>
        <Divider
          style={{
            border: `1px solid ${COLORS.GAMMA_BACKGROUND_03}`,
            color: COLORS.GAMMA_BACKGROUND_03,
          }}
        />
        <div css={{ marginLeft: 16 }}>
          <Accordion
            sx={{
              boxShadow: "none",
            }}
            onChange={handleChange}
            disableGutters
            defaultExpanded={true}
            data-testid="accordion"
          >
            <AccordionSummary
              expandIcon={
                expanded ? (
                  <KeyboardArrowUpIcon
                    sx={{ color: COLORS.BETA_SECONDARY_GREY }}
                  />
                ) : (
                  <KeyboardArrowRightIcon
                    sx={{ color: COLORS.BETA_SECONDARY_GREY }}
                  />
                )
              }
              sx={{ width: "fit-content" }}
            >
              <Typography
                variant="body3"
                color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
              >
                Run overview
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "row",
                  gap: 21,
                }}
              >
                {runsDataList.map((detail, index) => {
                  return (
                    <RunAccordionDetails
                      label={detail.label}
                      value={detail.value}
                      isIcon={detail.isIcon}
                      key={index}
                    />
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Paper>
  );
};

export default LeftPanelRunDetails;
