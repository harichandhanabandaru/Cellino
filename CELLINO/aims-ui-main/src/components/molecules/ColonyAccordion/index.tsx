// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { ChangeEvent, SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import "../../../i18n/config";
import { COLORS } from "../../../theme/Colors";
import CustomInputField from "../CustomInputField";
import AttributeField from "../AttributeField";
import CustomSelect from "../CustomSelect";
import { CLONALITY_OPTIONS, COLONY_SELECTION_OPTION } from "../../../constants";
import memoize from "memoize-one";
import { ColonyAccordionState } from "../../organisms/ColonyAccordionWrapper";
import ColorOpacity from "../ColorOpacity";

interface ColonyAccordionProps {
  expanded: boolean;
  colonyData: ColonyAccordionState;
  onNameChange: (arg: string) => void;
  type: string;
  noOfClusters: string;
  onSubmitClick: () => void;
  handleClonalityChange: (arg: string) => void;
  handleIsSelectedChange: (arg: string) => void;
  submitDisabled: boolean;
  onExpandedChange: (arg: boolean) => void;
  handleOpacityChange: (event: Event, value: number | number[]) => void;
  handleColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const colonyOptionsMemoized = memoize(
  (ColonyAccordionProps: ColonyAccordionProps, text) => {
    return [
      {
        label: text("colonyAccordion:type"),
        value: ColonyAccordionProps.type,
      },
      {
        label: text("colonyAccordion:noOfClusters"),
        value: ColonyAccordionProps.noOfClusters,
      },
    ];
  }
);

function ColonyAccordion(ColonyAccordionProps: ColonyAccordionProps) {
  const { t: text } = useTranslation(["colonyAccordion"]);

  const colonyOptionList = colonyOptionsMemoized(ColonyAccordionProps, text);

  return (
    <Accordion
      expanded={ColonyAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        ColonyAccordionProps.onExpandedChange(arg)
      }
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          backgroundColor: ColonyAccordionProps.expanded
            ? COLORS.GAMMA_BACKGROUND_02
            : "initial",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography
          variant={"overline"}
          sx={{ textTransform: "none", fontSize: "12px" }}
        >
          Colony
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CustomInputField
          label={text("colonyAccordion:name")}
          value={ColonyAccordionProps.colonyData.name}
          onChange={ColonyAccordionProps.onNameChange}
          required={true}
        />
        <Box
          sx={{
            padding: "24px 0 20px 0",
            display: "grid",
            gridAutoFlow: "row",
            gap: "12px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {colonyOptionList.map(
            (colonyOptionOption: { label: string; value: string | number }) => (
              <AttributeField
                key={colonyOptionOption.label}
                label={colonyOptionOption.label}
                value={colonyOptionOption.value}
              />
            )
          )}
        </Box>
        <ColorOpacity
          opacity={ColonyAccordionProps.colonyData.opacity}
          color={ColonyAccordionProps.colonyData.color}
          handleColorChange={ColonyAccordionProps.handleColorChange}
          handleOpacityChange={ColonyAccordionProps.handleOpacityChange}
        />
        <CustomSelect
          label={text("colonyAccordion:clonality")}
          options={CLONALITY_OPTIONS}
          onChange={ColonyAccordionProps.handleClonalityChange}
          value={ColonyAccordionProps.colonyData.clonality}
        />
        <br />
        <br />
        <CustomSelect
          label={text("colonyAccordion:selected")}
          options={COLONY_SELECTION_OPTION}
          onChange={ColonyAccordionProps.handleIsSelectedChange}
          value={ColonyAccordionProps.colonyData.isSelected ? "true" : "false"}
        />
        <br />
        <br />
        <Button
          disabled={ColonyAccordionProps.submitDisabled}
          onClick={() => ColonyAccordionProps.onSubmitClick()}
          variant={"contained"}
          sx={{
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Submit
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}

export default ColonyAccordion;
