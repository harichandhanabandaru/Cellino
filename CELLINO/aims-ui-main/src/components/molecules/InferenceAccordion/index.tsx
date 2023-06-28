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
import { COLORS } from "../../../theme/Colors";
import AttributeField from "../AttributeField";
import memoize from "memoize-one";
import { TFunction } from "i18next";

interface InferenceAccordionProps {
  expanded: boolean;
  onExpandedChange: (arg: boolean) => void;
  name: string;
  width: string;
  height: string;
  pixelSize: string;
  pixelSizeUnit: string;
  protocalID: string;
}
const inferenceOptionsMemoized = memoize(
  (
    InferenceAccordionProps: InferenceAccordionProps,
    text: TFunction<string[]>
  ) => {
    return [
      {
        label: text("inferenceAccordion:width"),
        value: InferenceAccordionProps.width,
      },
      {
        label: text("inferenceAccordion:height"),
        value: InferenceAccordionProps.height,
      },
      {
        label: text("inferenceAccordion:pixelSize"),
        value: InferenceAccordionProps.pixelSize,
      },
      {
        label: text("inferenceAccordion:pixelSizeUnit"),
        value: InferenceAccordionProps.pixelSizeUnit,
      },
      {
        label: text("inferenceAccordion:protocalID"),
        value: InferenceAccordionProps.protocalID,
      },
    ];
  }
);

function InferenceAccordion(InferenceAccordionProps: InferenceAccordionProps) {
  const { t: text } = useTranslation(["inferenceAccordion"]);
  const inferenceOptionsList = inferenceOptionsMemoized(
    InferenceAccordionProps,
    text
  );

  return (
    <Accordion
      expanded={InferenceAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        InferenceAccordionProps.onExpandedChange(arg)
      }
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          backgroundColor: InferenceAccordionProps.expanded
            ? COLORS.GAMMA_BACKGROUND_02
            : "initial",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography
          variant={"overline"}
          sx={{ textTransform: "Capitalize", fontSize: "12px" }}
        >
          {InferenceAccordionProps.name}
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
          {inferenceOptionsList.map(
            (inferenceOption: { label: string; value: string | number }) => (
              <AttributeField
                key={inferenceOption.label}
                label={inferenceOption.label}
                value={inferenceOption.value}
              />
            )
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default InferenceAccordion;
