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
import CustomInputField from "../CustomInputField";
import AttributeField from "../AttributeField";
import CustomSelect from "../CustomSelect";
import { CLONALITY_OPTIONS } from "../../../constants";
import { colony } from "../../../constants/types";
import ColonyAssociate from "../ColonyAssociate";
import memoize from "memoize-one";
import { ClusterAccordionState } from "../../organisms/ClusterAccordionWrapper";
import ColorOpacity from "../ColorOpacity";
import { ClusterMetrics } from "../../../generated/graphql";
import { getImageAnalysisRequestOptions } from "../../organisms/AttributionPanel/ClusterAccorditionGrid";
import { COLORS } from "../../../theme/Colors";

interface ClusterAccordionProps {
  accordionName: string;
  expanded: boolean;
  clusterData: ClusterAccordionState;
  type: string;
  submitDisabled: boolean;
  onNameChange: (arg: string) => void;
  onExpandedChange: (arg: boolean) => void;
  onSubmitClick: () => void;
  handleClonalityChange: (arg: string) => void;
  colonies: colony[];
  handleOpacityChange: (event: Event, value: number | number[]) => void;
  handleColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
  clusterMetrics: ClusterMetrics[];
  handleImageAnalysisRequestChange: (value: string) => void;
  handleAssociateColonyChange?: (value: any) => void;
  selectedColony?: colony | null;
}

const ClusterOptionsMemoized = memoize(
  (ClusterAccordionProps: ClusterAccordionProps, text) => {
    return [
      {
        label: text("clusterAccordion:type"),
        value: ClusterAccordionProps.type,
      },
    ];
  }
);

function ClusterAccordion(ClusterAccordionProps: ClusterAccordionProps) {
  const { t: text } = useTranslation(["clusterAccordion"]);
  const clusterOptionList = ClusterOptionsMemoized(ClusterAccordionProps, text);
  const analysisOptions = getImageAnalysisRequestOptions(
    ClusterAccordionProps.clusterMetrics
  );
  return (
    <Accordion
      expanded={ClusterAccordionProps.expanded}
      onChange={(_event: SyntheticEvent, arg: boolean) =>
        ClusterAccordionProps.onExpandedChange(arg)
      }
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
        <Typography
          variant={"overline"}
          sx={{ textTransform: "none", fontSize: "12px" }}
        >
          {ClusterAccordionProps.accordionName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CustomInputField
          label={text("clusterAccordion:name")}
          value={ClusterAccordionProps.clusterData.name}
          onChange={ClusterAccordionProps.onNameChange}
          required={true}
        />
        <ColorOpacity
          color={ClusterAccordionProps.clusterData.color}
          opacity={ClusterAccordionProps.clusterData.opacity}
          handleColorChange={ClusterAccordionProps.handleColorChange}
          handleOpacityChange={ClusterAccordionProps.handleOpacityChange}
        />
        <CustomSelect
          onChange={ClusterAccordionProps.handleImageAnalysisRequestChange}
          label={"Image Aanlysis Request"}
          options={analysisOptions}
          value={
            analysisOptions?.length === 0
              ? ""
              : ClusterAccordionProps?.clusterData?.imageAnalysisRequestId
          }
          isDisabled={analysisOptions?.length === 0}
        />
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant={"overline"}
            textTransform={"none"}
            fontSize="12px"
            color={COLORS.BETA_TEXT_LOW_EMPHASIS}
            sx={{ marginTop: "10px", marginBottom: "8px" }}
          >
            {text("clusterAccordion:associatedWith")}
          </Typography>
          {
            <ColonyAssociate
              colonies={ClusterAccordionProps.colonies}
              colonyRequired={ClusterAccordionProps.selectedColony}
              handleAssociateColonyChange={
                ClusterAccordionProps.handleAssociateColonyChange
              }
            />
          }
        </Box>
        <div css={{ marginTop: "10px" }}>
          <CustomSelect
            onChange={ClusterAccordionProps.handleClonalityChange}
            label={text("clusterAccordion:clonality")}
            options={CLONALITY_OPTIONS}
            value={ClusterAccordionProps.clusterData.clonality}
          />
        </div>
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
          {clusterOptionList.map(
            (ClusterOption: { label: string; value: string | number }) => (
              <AttributeField
                key={ClusterOption.label}
                label={ClusterOption.label}
                value={ClusterOption.value}
              />
            )
          )}
        </Box>
        <Button
          disabled={ClusterAccordionProps.submitDisabled}
          onClick={() => ClusterAccordionProps.onSubmitClick()}
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

export default ClusterAccordion;
