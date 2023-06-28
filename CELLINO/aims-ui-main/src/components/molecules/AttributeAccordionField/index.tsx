// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../../../i18n/config";
import AttributeField from "../AttributeField";

interface AccordionFieldsProps {
  expanded: boolean;
  name: string;
  fields: { label: string; value: string | number }[];
  onExpandedChange: (arg: boolean) => void;
}

function AttributeAccordionField(AccordionFieldsProps: AccordionFieldsProps) {
  return (
    <Accordion
      expanded={AccordionFieldsProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        AccordionFieldsProps.onExpandedChange(arg)
      }
      elevation={0}
      disableGutters
      sx={{
        "& .MuiAccordionSummary-root": {
          padding: "0px",
          margin: "0px",
        },
        "&.Mui-expanded": {
          margin: 0,
        },
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          width: "100%",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography variant={"body4"} sx={{ textTransform: "none" }}>
          {AccordionFieldsProps.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Box
          sx={{
            padding: "24px 0 20px 0",
            display: "grid",
            gridAutoFlow: "row",
            gap: "12px",
            marginBottom: "10px",
          }}
        >
          {AccordionFieldsProps.fields.map(
            (item: { label: string; value: string | number }) => (
              <AttributeField
                key={item.label}
                label={item.label}
                value={item.value}
              />
            )
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default AttributeAccordionField;
