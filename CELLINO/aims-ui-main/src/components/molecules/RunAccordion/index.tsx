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
import AttributePanelReadMore from "../../atoms/AttributePanelReadMore/index";
import AttributePanelGroupItems from "../../atoms/AttributePanelGroupItems";
import memoize from "memoize-one";

interface RunAccordionProps {
  expanded: boolean;
  runName: string;
  partner: string;
  runId: string;
  objective: string;
  summary: string;
  creator: string;
  owner: string;
  reviewers: string[];
  runDay: string;
  startDay: string;
  runStatus: string;
  cloneReviewStatus: string;
  workFlowID: string;
  currentPhase: string;
  plates: string[];
  onExpandedChange: (arg: boolean) => void;
}

const runOptionsMemoized = memoize(
  (RunAccordionProps: RunAccordionProps, text) => {
    return [
      { label: text("runAccordion:runName"), value: RunAccordionProps.runName },

      {
        label: text("runAccordion:partner"),
        value: RunAccordionProps.partner,
      },

      { label: text("runAccordion:runId"), value: RunAccordionProps.runId },
      { label: text("runAccordion:creator"), value: RunAccordionProps.creator },
      { label: text("runAccordion:owner"), value: RunAccordionProps.owner },
      { label: text("runAccordion:runDay"), value: RunAccordionProps.runDay },
      {
        label: text("runAccordion:startDay"),
        value: RunAccordionProps.startDay,
      },
      {
        label: text("runAccordion:runStatus"),
        value: RunAccordionProps.runStatus,
      },
      {
        label: text("runAccordion:cloneReviewStatus"),
        value: RunAccordionProps.cloneReviewStatus,
      },
      {
        label: text("runAccordion:workFlowID"),
        value: RunAccordionProps.workFlowID,
      },
      {
        label: text("runAccordion:currentPhase"),
        value: RunAccordionProps.currentPhase,
      },
    ];
  }
);
function RunAccordion(RunAccordionProps: RunAccordionProps) {
  const { t: text } = useTranslation(["runAccordion"]);
  const runOptionsList = runOptionsMemoized(RunAccordionProps, text);

  return (
    <Accordion
      expanded={RunAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        RunAccordionProps.onExpandedChange(arg)
      }
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        sx={{
          backgroundColor: RunAccordionProps.expanded
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
          Run
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div
          css={{
            display: "grid",
            gridAutoFlow: "row",
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
            {runOptionsList
              .slice(0, 3)
              .map(
                (
                  runOption: { label: string; value: string | number },
                  index
                ) => (
                  <AttributeField
                    key={index}
                    label={runOption.label}
                    value={runOption.value}
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
              marginTop: "10px",
            }}
          >
            <Typography
              color={COLORS.BETA_TEXT_LOW_EMPHASIS}
              variant={"caption1"}
            >
              {text("runAccordion:objective")}
            </Typography>
            <AttributePanelReadMore
              wholetext={RunAccordionProps.objective}
              showMoreText="...Read More"
              showLessText=" Show Less"
            />
          </div>

          <AttributeField
            label={text("runAccordion:summary") ?? ""}
            value={RunAccordionProps.summary}
            attributeAlignment={"row"}
          />

          <div
            css={{
              display: "grid",
              gridAutoFlow: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography
              color={COLORS.BETA_TEXT_LOW_EMPHASIS}
              variant={"caption1"}
            >
              {text("runAccordion:reviewers")}
            </Typography>
            <div
              css={{
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              <AttributePanelGroupItems
                itemList={RunAccordionProps.reviewers}
              />
            </div>
          </div>
          <div
            css={{
              padding: "0",
              display: "grid",
              gridAutoFlow: "row",
              gap: "12px",
            }}
          >
            {runOptionsList
              .slice(3)
              .map(
                (
                  runOption: { label: string; value: string | number },
                  index
                ) => (
                  <AttributeField
                    key={index}
                    label={runOption.label}
                    value={runOption.value}
                  />
                )
              )}
          </div>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography
              color={COLORS.BETA_TEXT_LOW_EMPHASIS}
              variant={"caption1"}
            >
              {text("runAccordion:plates")}
            </Typography>
            <div
              css={{
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              <AttributePanelGroupItems itemList={RunAccordionProps.plates} />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default RunAccordion;
