// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { SyntheticEvent, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import "../../../i18n/config";
import { COLORS } from "../../../theme/Colors";
import AttributeField from "../AttributeField";
import memoize from "memoize-one";
import CustomSelect from "../CustomSelect";
import CustomAutoComplete from "../CustomAutoCompleteFreeSolo";
import { PLATE_DROP_REASONS } from "../../../constants";
import { DropPlateProps } from "../../../constants/types";
import AttributePanelReadMore from "../../atoms/AttributePanelReadMore";
import ListOfEvents from "../../molecules/ListOfEventsAccordion";
import { TFunction } from "i18next";

interface PlateAccordionProps {
  expanded: boolean;
  labwareID: string;
  name: string;
  barcode: string;
  listOfEvents: [{ name: string; event: string; startedAt: string }];
  currentPhase: string;
  processStatus: string;
  processStatusDetail: string;
  reviewStatus: string;
  anaysisStatus: string;
  analysisStatusDetails: string;
  reviewer: string;
  plateStatus?: string;
  plateStatusReason?: string;
  onExpandedChange: (arg: boolean) => void;
  dropPlate: DropPlateProps;
  setDropPlate: React.Dispatch<React.SetStateAction<DropPlateProps>>;
  handleDropPlate: () => void;
}
const plateOptionsMemoized = memoize(
  (PlateAccordionProps: PlateAccordionProps, text: TFunction<string[]>) => {
    return [
      {
        label: text("platesAccordion:labwareID"),
        value: PlateAccordionProps.labwareID,
      },
      {
        label: text("platesAccordion:name"),
        value: PlateAccordionProps.name,
      },
      {
        label: text("platesAccordion:barcode"),
        value: PlateAccordionProps.barcode,
      },
      {
        label: text("platesAccordion:currentPhase"),
        value: PlateAccordionProps.currentPhase,
      },
      {
        label: text("platesAccordion:processStatus"),
        value: PlateAccordionProps.processStatus,
      },
      {
        label: text("platesAccordion:reviewStatus"),
        value: PlateAccordionProps.reviewStatus,
      },
      {
        label: text("platesAccordion:anaysisStatus"),
        value: PlateAccordionProps.anaysisStatus,
      },
      {
        label: text("platesAccordion:reviewer"),
        value: PlateAccordionProps.reviewer,
      },
    ];
  }
);

function PlatesAccordion(PlateAccordionProps: PlateAccordionProps) {
  const [listOfEventsExpanded, setListOfEventsExpanded] = useState(false);

  const {
    dropPlate,
    setDropPlate,
    handleDropPlate,
    plateStatus,
    plateStatusReason,
  } = PlateAccordionProps;
  const handleStatusChange = (newValue: string) => {
    setDropPlate((prev: any) => {
      if (newValue === "Drop") return { ...prev, status: newValue };
      else {
        return { ...prev, status: newValue, reason: "" };
      }
    });
  };
  const handleReasonChange = (newValue: string) => {
    setDropPlate((prev: any) => {
      return { ...prev, reason: newValue };
    });
  };

  const { t: text } = useTranslation(["platesAccordion"]);
  const plateOptionsList = plateOptionsMemoized(PlateAccordionProps, text);
  return (
    <Accordion
      expanded={PlateAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        PlateAccordionProps.onExpandedChange(arg)
      }
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          backgroundColor: PlateAccordionProps.expanded
            ? COLORS.GAMMA_BACKGROUND_02
            : "initial",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography variant={"body4"} sx={{ textTransform: "none" }}>
          Plates
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div
          css={{
            display: "grid",
            gridAutoFlow: "row",
            gap: 15,
          }}
        >
          <div
            css={{
              padding: "10px 0 0px 0",
              display: "grid",
              gridAutoFlow: "row",
              gap: 15,
            }}
          >
            {plateOptionsList
              .slice(0, 3)
              .map(
                (
                  plateOption: { label: string; value: string | number },
                  index
                ) => (
                  <AttributeField
                    key={index}
                    label={plateOption.label}
                    value={plateOption.value}
                  />
                )
              )}
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ListOfEvents
              expanded={listOfEventsExpanded}
              listOfEvents={PlateAccordionProps.listOfEvents}
              onExpandedChange={setListOfEventsExpanded}
            />
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              gap: 15,
            }}
          >
            {plateOptionsList
              .slice(3, 5)
              .map(
                (
                  plateOption: { label: string; value: string | number },
                  index
                ) => (
                  <AttributeField
                    key={index}
                    label={plateOption.label}
                    value={plateOption.value}
                  />
                )
              )}
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color={COLORS.BETA_TEXT_LOW_EMPHASIS} variant={"body4"}>
              {text("platesAccordion:processStatusDetail")}
            </Typography>
            <AttributePanelReadMore
              wholetext={PlateAccordionProps.processStatusDetail}
              showMoreText=" Read More"
              showLessText=" Show Less"
            />
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              gap: 15,
            }}
          >
            {plateOptionsList
              .slice(5, 7)
              .map(
                (
                  plateOption: { label: string; value: string | number },
                  index
                ) => (
                  <AttributeField
                    key={index}
                    label={plateOption.label}
                    value={plateOption.value}
                  />
                )
              )}
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color={COLORS.BETA_TEXT_LOW_EMPHASIS} variant={"body4"}>
              {text("platesAccordion:analysisStatusDetails")}
            </Typography>
            <AttributePanelReadMore
              wholetext={PlateAccordionProps.analysisStatusDetails}
              showMoreText=" Read More"
              showLessText=" Show Less"
            />
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              gap: 15,
            }}
          >
            {plateOptionsList
              .slice(7)
              .map(
                (
                  plateOption: { label: string; value: string | number },
                  index
                ) => (
                  <AttributeField
                    key={index}
                    label={plateOption.label}
                    value={plateOption.value}
                  />
                )
              )}
          </div>
          <div css={{ display: "grid", width: "172px" }}>
            <CustomSelect
              value={dropPlate.status}
              isDisabled={
                plateStatus === "DROP" ||
                PlateAccordionProps.processStatus === "Retired"
              }
              label="Status"
              options={[
                { label: "KEEP", value: "KEEP" },
                { label: "DROP", value: "DROP" },
              ]}
              onChange={handleStatusChange}
            />
          </div>
          {dropPlate.status === "DROP" ? (
            <div css={{ dispay: "grid" }}>
              <CustomAutoComplete
                label={"Reason"}
                value={plateStatusReason}
                isDisabled={plateStatus === "DROP"}
                options={PLATE_DROP_REASONS}
                onChange={handleReasonChange}
              />
            </div>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE,
              borderRadius: "8px",
              height: "40px",

              "&:hover": { backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE },
            }}
            disabled={dropPlate.reason === "" || plateStatus === "DROP"}
            onClick={handleDropPlate}
          >
            Submit
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default PlatesAccordion;
