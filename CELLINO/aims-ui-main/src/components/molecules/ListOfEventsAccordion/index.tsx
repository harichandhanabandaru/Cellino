// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../../../i18n/config";
import { COLORS } from "../../../theme/Colors";

interface ListOfEventsProps {
  expanded: boolean;
  listOfEvents: { name?: string; event: string; startedAt: string }[];
  onExpandedChange: (arg: boolean) => void;
}

function ListOfEventsAccordion(ListOfEventsProps: ListOfEventsProps) {
  const listOfEvents = () => {
    if (ListOfEventsProps?.listOfEvents !== undefined) {
      return ListOfEventsProps?.listOfEvents.map(
        (
          item: { name?: string; event: string; startedAt: string },
          index: number
        ) => {
          return (
            <div
              css={{
                padding: "10px 0px 10px 15px",
                display: "grid",
                gridAutoFlow: "row",
                width: 240,
                overflowY: "scroll",
                borderBottom: `3px solid white`,
                backgroundColor: COLORS.GAMMA_BACKGROUND_02,
              }}
              key={index}
            >
              <Typography variant={"body4"}>
                {item.name}
                {"  "}
                {item.event}
              </Typography>
              <Typography variant={"body4"}>{item.startedAt}</Typography>
            </div>
          );
        }
      );
    }
  };
  return (
    <Accordion
      expanded={ListOfEventsProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        ListOfEventsProps.onExpandedChange(arg)
      }
      disableGutters
      elevation={0}
      sx={{
        "& .MuiAccordionSummary-root": {
          padding: "0px",
          minHeight: "0px",
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
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
        }}
      >
        <Typography variant={"body4"} sx={{ textTransform: "none" }}>
          List of Events
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <div
          css={{
            width: 260,
            maxHeight: 120,
            overflowY: "scroll",
          }}
        >
          {listOfEvents()}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ListOfEventsAccordion;
