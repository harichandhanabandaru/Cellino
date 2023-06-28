// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import CustomSelect from "../../molecules/CustomSelect";
import { COLORS } from "../../../theme/Colors";
import memoize from "memoize-one";
import {
  ImageEvent,
  ScanObjectMetrics,
  useProtocolsQuery,
  useTriggerImageAnalysisMutation,
} from "../../../generated/graphql";

const Buttonstyle = {
  borderRadius: "12px",
  bgcolor: "#8900FF",
  "&:hover": {
    bgcolor: "#8900FF",
  },
  width: "100px",
};

interface EnergyModalPopupProps {
  open: boolean;
  handleClose: () => void;
  scanObjectMetrics?: ScanObjectMetrics[];
  contextData?: {
    plateBarcode: string;
    wellPosition: string;
    latestImageEvent: ImageEvent;
  };
  handleShowSnackBar: () => void;
}

const ENERGY_MAP_PROTOCOL_CATEGORY = "energy_map";

const getScanObjectAnalysisOptions = memoize((scanObjectMetrics) => {
  return scanObjectMetrics?.map((scanObjectMetric: ScanObjectMetrics) => {
    return {
      label: scanObjectMetric.imageAnalysisRequest.name,
      value: scanObjectMetric.imageAnalysisRequest.id,
    };
  });
});

const getProtocolNamesOptions = memoize((protocolData) => {
  return protocolData?.map((protocol: { name: string }) => {
    return { label: protocol.name, value: protocol.name };
  });
});

const getEnergyMapContextJson = memoize((contextData, selectedOptions) => {
  const blobPath = contextData?.latestImageEvent?.artifactPath?.blob_path
    ? new URL(
        contextData?.latestImageEvent?.artifactPath?.blob_path
      ).pathname.slice(1)
    : "";
  return {
    protocol: {
      name: selectedOptions.protocolName,
    },
    settings: {
      scan_analysis_request_id: selectedOptions.analysisRequestId,
    },
    developerMode: false,
    context: {
      plate: {
        barcode: contextData.plateBarcode,
      },
      well: {
        position: contextData.wellPosition,
      },
      imageEvent: {
        id: contextData.latestImageEvent.id,
      },
      artifactPath: {
        ...contextData.latestImageEvent.artifactPath,
        blob_path: blobPath,
      },
    },
  };
});

const EnergyMapModalPopup = ({
  open,
  handleClose,
  scanObjectMetrics,
  contextData,
  handleShowSnackBar,
}: EnergyModalPopupProps) => {
  const scanObjectAnalysisOptions =
    getScanObjectAnalysisOptions(scanObjectMetrics);

  const [protocolOptions, setProtocolOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<{
    protocolName: string;
    analysisRequestId: string;
  }>({
    analysisRequestId: scanObjectAnalysisOptions?.[0]?.value ?? "",
    protocolName: "",
  });

  const { data: protocolData } = useProtocolsQuery({
    variables: { category: ENERGY_MAP_PROTOCOL_CATEGORY },
  });

  const [triggerImageAnalysis] = useTriggerImageAnalysisMutation();

  useEffect(() => {
    if (protocolData) {
      setProtocolOptions(
        getProtocolNamesOptions(protocolData?.protocols?.content)
      );
    }
  }, [protocolData]);

  useEffect(() => {
    if (protocolOptions?.length > 0) {
      setSelectedOptions((prev) => ({
        ...prev,
        protocolName: protocolOptions[0].value,
      }));
    }
  }, [protocolOptions]);

  const handleCreateEnergyMap = () => {
    triggerImageAnalysis({
      variables: {
        triggerAnalysisRequest: getEnergyMapContextJson(
          contextData,
          selectedOptions
        ),
      },
    });
    handleClose();
    handleShowSnackBar();
  };

  const handleAnalysisChange = (value: string) => {
    setSelectedOptions((prev) => ({ ...prev, analysisRequestId: value }));
  };

  const handleProtocolNameChange = (value: string) => {
    setSelectedOptions((prev) => ({ ...prev, protocolName: value }));
  };

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
        },
      }}
    >
      <div
        css={{
          display: "grid",
          gridAutoFlow: "row",
          margin: "20px",
          gap: "15px",
          width: "400px",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Trigger Energy Map Creation
        </Typography>
        <Divider
          orientation="horizontal"
          style={{
            border: `1px solid ${COLORS.BETA_SECONDARY_GREY}`,
            backgroundColor: COLORS.BETA_SECONDARY_GREY,
          }}
        />
        <CustomSelect
          label="Select Energy Map Protocol"
          onChange={handleProtocolNameChange}
          value={protocolOptions[0]?.value}
          options={protocolOptions}
        />
        <CustomSelect
          label="Select Input Scan Object Analysis Request"
          onChange={handleAnalysisChange}
          value={
            scanObjectAnalysisOptions?.length > 0
              ? scanObjectAnalysisOptions[0].value
              : ""
          }
          options={scanObjectAnalysisOptions}
          isDisabled={scanObjectAnalysisOptions?.length > 0 ? false : true}
        />
      </div>
      <DialogActions>
        <Button onClick={handleClose} sx={{ width: "100px" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ ...Buttonstyle }}
          onClick={handleCreateEnergyMap}
          disabled={scanObjectAnalysisOptions?.length > 0 ? false : true}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EnergyMapModalPopup;
