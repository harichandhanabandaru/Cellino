import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { COLORS } from "../../../theme/Colors";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { PHASES } from "../../../constants";
export interface PlateDetailsProps {
  plateName: string;
  noOfWells: number;
  passageNumber: string | number;
  downSelectionDay: string | number;
  phaseName?: string;
}

const PlateDetails: React.FC<PlateDetailsProps> = ({
  plateName,
  noOfWells,
  passageNumber,
  downSelectionDay,
  phaseName,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        "&.MuiAccordion-root:before": {
          backgroundColor: "white",
        },
      }}
      onChange={handleChange}
      disableGutters
      elevation={0}
    >
      <AccordionSummary
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
        sx={{ width: "fit-content", padding: "0px" }}
      >
        <Typography
          variant="body2"
          sx={
            expanded
              ? { color: COLORS.ALPHA_PRIMARY_PURPLE }
              : { color: COLORS.BETA_TEXT_HIGH_EMPHASIS }
          }
        >
          {plateName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ "&.MuiAccordionDetails-root": { paddingLeft: 0 } }}
      >
        <Typography
          variant="body4"
          sx={{ fontSize: "15px" }}
        >{`${noOfWells} wells , Passage ${passageNumber}${
          phaseName === PHASES.CLONE_ISOLATION
            ? ` , Days to downselection : ${downSelectionDay}`
            : ""
        }`}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default PlateDetails;
