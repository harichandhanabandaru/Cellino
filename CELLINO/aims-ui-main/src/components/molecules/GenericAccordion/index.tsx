// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../../../i18n/config";
import { COLORS } from "../../../theme/Colors";

interface AccordionFieldsProps {
  expanded?: boolean;
  name: string;
  onExpandedChange: (arg: boolean) => void;
  showData: Function;
}
const GenericAccordion = ({
  expanded,
  name,
  onExpandedChange,
  showData,
}: AccordionFieldsProps) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) => {
        onExpandedChange(arg);
      }}
      data-testid={"GenericAccordion"}
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          backgroundColor: expanded ? COLORS.GAMMA_BACKGROUND_02 : "initial",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography variant={"body4"} sx={{ textTransform: "none" }}>
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Box
          sx={{
            marginLeft: "5%",
            overflowX: "scroll",
          }}
        >
          {expanded && showData()}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default GenericAccordion;
