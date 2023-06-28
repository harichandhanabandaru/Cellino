import { SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import "../../../i18n/config";
import AttributeField from "../AttributeField";
import memoize from "memoize-one";

interface WellSensorTimeSeriesDataAccordionProps {
  dailyAverageTemp: string;
  dailyMaxTemp: string;
  ph: string;
  o2Level: string;
  co2Level: string;
  expanded: boolean;
  onExpandedChange: (arg: boolean) => void;
}

const wellSensorTimeSeriesDataOptionsMemoized = memoize(
  (WellSensorTimeSeriesDataAccordionProps, text) => {
    return [
      {
        label: text("wellAccordion:dailyAverageTemp"),
        value: WellSensorTimeSeriesDataAccordionProps.dailyAverageTemp,
      },
      {
        label: text("wellAccordion:dailyMaxTemp"),
        value: WellSensorTimeSeriesDataAccordionProps.dailyMaxTemp,
      },
      {
        label: text("wellAccordion:ph"),
        value: WellSensorTimeSeriesDataAccordionProps.ph,
      },
      {
        label: text("wellAccordion:o2Level"),
        value: WellSensorTimeSeriesDataAccordionProps.o2Level,
      },
      {
        label: text("wellAccordion:co2Level"),
        value: WellSensorTimeSeriesDataAccordionProps.co2Level,
      },
    ];
  }
);
function WellSensorTimeSeriesDataAccordion(
  WellSensorTimeSeriesDataAccordionProps: WellSensorTimeSeriesDataAccordionProps
) {
  const { t: text } = useTranslation(["wellAccordion"]);
  const wellSensorTimeSeriesDataOptionsList =
    wellSensorTimeSeriesDataOptionsMemoized(
      WellSensorTimeSeriesDataAccordionProps,
      text
    );

  return (
    <Accordion
      expanded={WellSensorTimeSeriesDataAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        WellSensorTimeSeriesDataAccordionProps.onExpandedChange(arg)
      }
      elevation={0}
      disableGutters
      sx={{
        "&.Mui-expanded": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography variant={"caption3"} sx={{ textTransform: "none" }}>
          Sensor timeseries data
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            padding: "24px 0 20px 0",
            display: "grid",
            gridAutoFlow: "row",
            gap: "12px",
          }}
        >
          {wellSensorTimeSeriesDataOptionsList.map(
            (wellSensorTimeSeriesDataOption: {
              label: string;
              value: string | number;
            }) => (
              <AttributeField
                key={wellSensorTimeSeriesDataOption.label}
                label={wellSensorTimeSeriesDataOption.label}
                value={wellSensorTimeSeriesDataOption.value}
              />
            )
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default WellSensorTimeSeriesDataAccordion;
