import { SyntheticEvent, useState } from "react";
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
import { COLORS } from "../../../theme/Colors";
import AttributeField from "../AttributeField";
import memoize from "memoize-one";
import AttributePanelReadMore from "../../atoms/AttributePanelReadMore";
import AttributeAccordionField from "../AttributeAccordionField";
import ListOfEventsAccordion from "../ListOfEventsAccordion";

interface WellAccordionProps {
  wellId: string;
  plateId: string;
  positionName: string;
  processStatus: string;
  reviewStatus: string;
  analysisStatus: string;
  analysisStatusDetails: string;
  reviewers: string[];
  confluence: string;
  interiorConfluence: string;
  nonLiveCellOccupancy: string;
  numberOfCells: string;
  numberOfColonies: string;
  contaminationScore: string;
  listOfEvents: { name?: string; event: string; startedAt: string }[];
  expanded: boolean;
  onExpandedChange: (arg: boolean) => void;
}

const wellOptionsMemoized = memoize((WellAccordionProps, text) => {
  return [
    {
      label: text("wellAccordion:wellId"),
      value: WellAccordionProps.wellId,
    },
    {
      label: text("wellAccordion:plateId"),
      value: WellAccordionProps.plateId,
    },
    {
      label: text("wellAccordion:positionName"),
      value: WellAccordionProps.positionName,
    },
    {
      label: text("wellAccordion:processStatus"),
      value: WellAccordionProps.processStatus,
    },
    {
      label: text("wellAccordion:reviewStatus"),
      value: WellAccordionProps.reviewStatus,
    },
    {
      label: text("wellAccordion:analysisStatus"),
      value: WellAccordionProps.analysisStatus,
    },
  ];
});

const WellImageTimeSeriesDataAccordionMemoized = memoize(
  (WellAccordionProps, text) => {
    return [
      {
        label: text("wellAccordion:confluence"),
        value: WellAccordionProps.confluence,
      },
      {
        label: text("wellAccordion:interiorConfluence"),
        value: WellAccordionProps.interiorConfluence,
      },
      {
        label: text("wellAccordion:nonLiveCellOccupancy"),
        value: WellAccordionProps.nonLiveCellOccupancy,
      },
      {
        label: text("wellAccordion:numberOfCells"),
        value: WellAccordionProps.numberOfCells,
      },
      {
        label: text("wellAccordion:numberOfColonies"),
        value: WellAccordionProps.numberOfColonies,
      },
      {
        label: text("wellAccordion:contaminationScore"),
        value: WellAccordionProps.contaminationScore,
      },
      {
        label: text("wellAccordion:reviewer"),
        value: WellAccordionProps.reviewers,
      },
    ];
  }
);

function WellAccordion(WellAccordionProps: WellAccordionProps) {
  const { t: text } = useTranslation(["wellAccordion"]);
  const wellOptionsList = wellOptionsMemoized(WellAccordionProps, text);

  const WellImageTimeSeriesDataAccordionList =
    WellImageTimeSeriesDataAccordionMemoized(WellAccordionProps, text);
  const [wellImageTimeSeriesDataExpanded, setWellImageTimeSeriesDataExpanded] =
    useState(true);
  const [listOfEventsAccordionExpanded, setListOfEventsAccordionExpanded] =
    useState(true);

  return (
    <Accordion
      expanded={WellAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        WellAccordionProps.onExpandedChange(arg)
      }
      disableGutters
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          backgroundColor: WellAccordionProps.expanded
            ? COLORS.GAMMA_BACKGROUND_02
            : "initial",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography variant={"body4"} sx={{ textTransform: "none" }}>
          Well
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
          {wellOptionsList
            .slice(0, -1)
            .map((wellOption: { label: string; value: string | number }) => (
              <AttributeField
                key={wellOption.label}
                label={wellOption.label}
                value={wellOption.value}
              />
            ))}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography color={COLORS.BETA_TEXT_LOW_EMPHASIS} variant={"body4"}>
            {text("wellAccordion:analysisStatusDetails")}
          </Typography>
          <AttributePanelReadMore
            wholetext={WellAccordionProps.analysisStatusDetails}
            showMoreText="...Read More"
            showLessText=" Show Less"
          />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "row",
            gap: "12px",
            marginTop: "8px",
          }}
        >
          {wellOptionsList
            .slice(-1)
            .map((wellOption: { label: string; value: string | number }) => (
              <AttributeField
                key={wellOption.label}
                label={wellOption.label}
                value={wellOption.value}
              />
            ))}
        </Box>
        <AttributeAccordionField
          expanded={wellImageTimeSeriesDataExpanded}
          name={"Image timeseries data"}
          fields={WellImageTimeSeriesDataAccordionList}
          onExpandedChange={() =>
            setWellImageTimeSeriesDataExpanded((prevState) => !prevState)
          }
        />
        <ListOfEventsAccordion
          expanded={listOfEventsAccordionExpanded}
          listOfEvents={WellAccordionProps.listOfEvents}
          onExpandedChange={() => {
            setListOfEventsAccordionExpanded((prevState) => !prevState);
          }}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default WellAccordion;
