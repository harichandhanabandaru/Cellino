// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import "../../../i18n/config";
import { COLORS } from "../../../theme/Colors";
import AttributeField from "../AttributeField";
import memoize from "memoize-one";

interface BrightFieldAccordionProps {
  expanded: boolean;
  onExpandedChange: (arg: boolean) => void;
  captureStartTime: string;
  captureEndTime: string;
  zMin: string;
  zMax: string;
  zStep: string;
  numberOfZStep: string;
  magnification: string;
  width: string;
  height: string;
  pixelSize: string;
  exposureTime: string;
  protocalID: string;
  Illuminator: string;
}

const BrightFieldOptionsMemoized = memoize(
  (BrightFieldAccordionProps: BrightFieldAccordionProps, text) => {
    return [
      {
        label: text("brightFieldAccordion:zMin"),
        value: BrightFieldAccordionProps.zMin,
      },
      {
        label: text("brightFieldAccordion:zMax"),
        value: BrightFieldAccordionProps.zMax,
      },
      {
        label: text("brightFieldAccordion:zStep"),
        value: BrightFieldAccordionProps.zStep,
      },
      {
        label: text("brightFieldAccordion:numberOfZStep"),
        value: BrightFieldAccordionProps.numberOfZStep,
      },
      {
        label: text("brightFieldAccordion:magnification"),
        value: BrightFieldAccordionProps.magnification,
      },
      {
        label: text("brightFieldAccordion:width"),
        value: BrightFieldAccordionProps.width,
      },
      {
        label: text("brightFieldAccordion:height"),
        value: BrightFieldAccordionProps.height,
      },
      {
        label: text("brightFieldAccordion:pixelSize"),
        value: BrightFieldAccordionProps.pixelSize,
      },
      {
        label: text("brightFieldAccordion:exposureTime"),
        value: BrightFieldAccordionProps.exposureTime,
      },
      {
        label: text("brightFieldAccordion:Illuminator"),
        value: BrightFieldAccordionProps.Illuminator,
      },

      {
        label: text("brightFieldAccordion:captureStartTime"),
        value: BrightFieldAccordionProps.captureStartTime,
      },
      {
        label: text("brightFieldAccordion:captureEndTime"),
        value: BrightFieldAccordionProps.captureEndTime,
      },
      {
        label: text("brightFieldAccordion:protocalID"),
        value: BrightFieldAccordionProps.protocalID,
      },
    ];
  }
);

function BrightFieldAccordion(
  BrightFieldAccordionProps: BrightFieldAccordionProps
) {
  const { t: text } = useTranslation(["BrightFieldAccordion"]);
  const brightFieldOptionList = BrightFieldOptionsMemoized(
    BrightFieldAccordionProps,
    text
  );

  return (
    <Accordion
      expanded={BrightFieldAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        BrightFieldAccordionProps.onExpandedChange(arg)
      }
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          backgroundColor: BrightFieldAccordionProps.expanded
            ? COLORS.GAMMA_BACKGROUND_02
            : "initial",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        }}
      >
        <Typography
          variant={"overline"}
          textTransform={"none"}
          sx={{ fontSize: "12px" }}
        >
          {text("brightFieldAccordion:brightfield")}
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
              display: "grid",
              gridAutoFlow: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              color={COLORS.BETA_TEXT_HIGH_EMPHASIS}
              variant={"caption2"}
            >
              Settings
            </Typography>
          </div>
          <div
            css={{
              padding: "0px",
              display: "grid",
              gridAutoFlow: "row",
              gap: 15,
            }}
          >
            {brightFieldOptionList
              .slice(0, 10)
              .map(
                (BrightFieldOption: {
                  label?: string;
                  value: string | number;
                }) => (
                  <AttributeField
                    key={BrightFieldOption.label}
                    label={BrightFieldOption.label}
                    value={BrightFieldOption.value}
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
            <Typography
              color={COLORS.BETA_TEXT_HIGH_EMPHASIS}
              variant={"caption2"}
            >
              Metadata
            </Typography>
          </div>
          <div
            css={{
              padding: "0",
              display: "grid",
              gridAutoFlow: "row",
              gap: 15,
            }}
          >
            {brightFieldOptionList
              .slice(10)
              .map(
                (BrightFieldOption: {
                  label?: string;
                  value: string | number;
                }) => (
                  <AttributeField
                    key={BrightFieldOption.label}
                    label={BrightFieldOption.label}
                    value={BrightFieldOption.value}
                  />
                )
              )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default BrightFieldAccordion;
