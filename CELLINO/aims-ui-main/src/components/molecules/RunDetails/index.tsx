// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { COLORS } from "../../../theme/Colors";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export interface RunDetailsProps {
  name: string;
  collaboratorName: string;
  type: string;
  purpose: string;
  runDay: number;
}

const commonGridStyle = {
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "flex-start",
  columnGap: 8,
};

const RunDetails: React.FC<RunDetailsProps> = ({
  name,
  collaboratorName,
  type,
  purpose,
  runDay,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      sx={{ boxShadow: "none", width: "fit-content" }}
      disableGutters
      onChange={handleChange}
    >
      <AccordionSummary
        sx={{ width: "fit-content", padding: "0px" }}
        expandIcon={
          expanded ? (
            <KeyboardArrowUpIcon
              fontSize="large"
              sx={{ color: COLORS.ALPHA_PRIMARY_PURPLE }}
            />
          ) : (
            <KeyboardArrowRightIcon fontSize="large" />
          )
        }
      >
        <Typography
          variant="subtitle5"
          sx={
            expanded
              ? { color: COLORS.ALPHA_PRIMARY_PURPLE }
              : { color: COLORS.BETA_TEXT_HIGH_EMPHASIS }
          }
        >
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ "&.MuiAccordionDetails-root": { paddingLeft: 0 } }}
      >
        <div css={{ display: "grid", rowGap: 9 }}>
          <div css={{ ...commonGridStyle }}>
            <Typography
              variant="body4"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              For
            </Typography>
            <Typography variant="body3" sx={{ fontWeight: "bold" }}>
              {collaboratorName}
            </Typography>
          </div>
          <div
            css={{
              ...commonGridStyle,
            }}
          >
            <Typography
              variant="body4"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              Workflow Type
            </Typography>
            <Typography
              variant="body3"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              {type}
            </Typography>
          </div>
          <div
            css={{
              ...commonGridStyle,
            }}
          >
            <Typography
              variant="body4"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              Run day
            </Typography>
            <Typography variant="body4">{runDay}</Typography>
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="body4"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              Objective
            </Typography>
            <Typography variant="body4" sx={{ display: "block" }}>
              {purpose}
            </Typography>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default RunDetails;
