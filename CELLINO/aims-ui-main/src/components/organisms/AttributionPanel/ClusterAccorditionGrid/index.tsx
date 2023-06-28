// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Button, Typography } from "@mui/material";
import { COLORS } from "../../../../theme/Colors";
import React, { ChangeEvent, useEffect } from "react";
import ColonyAssociate from "../../../molecules/ColonyAssociate";
import { colony } from "../../../../constants/types";
import CustomInputField from "../../../molecules/CustomInputField";
import CustomSelect from "../../../molecules/CustomSelect";
import ColorOpacity from "../../../molecules/ColorOpacity";
import { DEFAULT_POLYGON_COLOR } from "../../../../constants";
import { getAlphaFromHexCode } from "../../../../utils/getColorWithOpacity";
import CreateScanObject, {
  validateEnergyLevel,
} from "../../../molecules/CreateScanObject";
import {
  ClusterMetrics,
  useTempColoniesLazyQuery,
} from "../../../../generated/graphql";
import memoize from "memoize-one";

const OPTIONS = [
  { label: "-Select-", value: "New object" },
  { label: "Cluster", value: "Cluster" },
  { label: "Scan object", value: "Scan object" },
];

const QUALITY_OPTIONS = [
  { label: "UNKNOWN", value: "UNKNOWN" },
  { label: "GOOD", value: "GOOD" },
  { label: "POOR", value: "POOR" },
  { label: "MEDIUM", value: "MEDIUM" },
];

export const getImageAnalysisRequestOptions = memoize((clusterMetrics) => {
  return clusterMetrics?.map((clusterMetric: ClusterMetrics) => {
    return {
      label: clusterMetric.imageAnalysisRequest.name,
      value: clusterMetric.imageAnalysisRequest.id,
    };
  });
});

const getButtonDisabledState = (
  newClusterAndColony: {
    clusterName: string;
    colonyName: string;
  },
  selectedColonyName: string,
  newPolygonData: {
    category: string;
    energyLevel: number;
    imageAnalysisRequest: string;
  }
) => {
  if (newPolygonData.category === "Scan object")
    return validateEnergyLevel(newPolygonData.energyLevel.toString());
  else if (newClusterAndColony.clusterName === "") return true;
  else if (newPolygonData.imageAnalysisRequest === "") return true;
  else if (
    selectedColonyName === "new colony" &&
    newClusterAndColony.colonyName === ""
  )
    return true;
};

interface NewPolygonAccordionProps {
  newPolygonData: any;
  setNewPolygonData: React.Dispatch<React.SetStateAction<any>>;
  handleClusterCreation: Function;
  handleColonyAndClusterCreation: Function;
  handleScanObjectCreation: () => void;
  clusterMetrics?: ClusterMetrics[];
  selectedImageEventId: string | null;
}

function ClusterAccorditionGrid({
  newPolygonData,
  setNewPolygonData,
  handleClusterCreation,
  handleColonyAndClusterCreation,
  handleScanObjectCreation,
  clusterMetrics,
  selectedImageEventId,
}: NewPolygonAccordionProps) {
  const [selectedColony, setSelectedColony] = React.useState(
    newPolygonData?.associatedWith
  );

  const [getColonies, { data }] = useTempColoniesLazyQuery();

  const [newClusterAndColony, setNewClusterAndColony] = React.useState({
    clusterName: "",
    colonyName: "",
  });

  const analysisOptions = getImageAnalysisRequestOptions(clusterMetrics);
  const colonies = data?.Colonies ?? [];

  const handleQualityChange = (newValue: string) => {
    setNewPolygonData((prev: any) => {
      return { ...prev, quality: newValue };
    });
  };

  const handleClick = (event: any) => {
    if (newPolygonData?.category === "Scan object") {
      handleScanObjectCreation();
    } else if (selectedColony?.name !== "new colony") {
      handleClusterCreation();
    } else {
      handleColonyAndClusterCreation();
    }
    setNewPolygonData(null);
  };

  const handleCategoryChange = (value: any) => {
    setNewPolygonData((prev: any) => {
      return { ...prev, category: value };
    });
    value === "Cluster"
      ? setNewClusterAndColony({
          clusterName: `Cluster ${clusterMetrics?.[0]?.count ?? 0 + 1}`,
          colonyName: "",
        })
      : setNewClusterAndColony({ clusterName: "", colonyName: "" });
  };

  useEffect(() => {
    if (newPolygonData?.category === "Cluster") {
      getColonies({
        variables: {
          imageEventId: selectedImageEventId ?? "",
        },
      });
    }
  }, [newPolygonData?.category, getColonies, selectedImageEventId]);

  React.useEffect(() => {
    setNewPolygonData((prev: any) => {
      return {
        ...prev,
        name: newClusterAndColony.clusterName,
        associatedWith: {
          ...prev.associatedWith,
          name: newClusterAndColony.colonyName,
        },
      };
    });
  }, [newClusterAndColony, setNewPolygonData]);

  React.useEffect(() => {
    setNewPolygonData((prev: any) => {
      return {
        ...prev,
        associatedWith: selectedColony,
        color: selectedColony?.outline?.color
          ? selectedColony?.outline?.color.substring(0, 7)
          : DEFAULT_POLYGON_COLOR,
        opacity: getAlphaFromHexCode(selectedColony?.outline?.color),
      };
    });
  }, [selectedColony, setNewPolygonData]);

  useEffect(() => {
    if (analysisOptions?.length > 0) {
      setNewPolygonData((prev: any) => {
        return { ...prev, imageAnalysisRequest: analysisOptions?.[0].value };
      });
    }
  }, [analysisOptions, setNewPolygonData]);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPolygonData((prev: any) => {
      return { ...prev, color: event.target.value };
    });
  };

  const handleEnergyLevelChange = (value: string) => {
    setNewPolygonData((prev: any) => {
      return { ...prev, energyLevel: value };
    });
  };

  const handleOpacityChange = (event: Event, value: number | number[]) => {
    setNewPolygonData((prev: any) => {
      return { ...prev, opacity: value as number };
    });
  };

  const handleImageAnalysisRequestChange = (value: string) => {
    setNewPolygonData((prev: any) => {
      return { ...prev, imageAnalysisRequest: value };
    });
  };

  return (
    <div>
      <CustomSelect
        value="New object"
        options={OPTIONS}
        onChange={handleCategoryChange}
        label="Category"
      />
      <div
        css={{ display: "grid", gridAutoFlow: "row", rowGap: 8, paddingTop: 4 }}
      >
        {newPolygonData?.category === "Scan object" ? (
          <CreateScanObject
            handleOpacityChange={handleOpacityChange}
            handleColorChange={handleColorChange}
            color={newPolygonData?.color}
            opacity={newPolygonData?.opacity}
            handleEnergyLevelChange={handleEnergyLevelChange}
            energyLevel={newPolygonData?.energyLevel}
            handleNameChange={() => {}}
          />
        ) : newPolygonData?.category !== "New object" ? (
          <div css={{ display: "grid", gridAutoFlow: "row", rowGap: 4 }}>
            <CustomInputField
              label={"Name"}
              value={newClusterAndColony.clusterName}
              onChange={(arg: string) =>
                setNewClusterAndColony((prev: any) => {
                  return { ...prev, clusterName: arg };
                })
              }
              required={true}
            />
            <ColorOpacity
              opacity={newPolygonData?.opacity}
              handleOpacityChange={handleOpacityChange}
              handleColorChange={handleColorChange}
              color={newPolygonData?.color}
            />
            <CustomSelect
              value={
                analysisOptions?.length > 0 ? analysisOptions[0].value : ""
              }
              label={"Image Analysis Request"}
              options={analysisOptions}
              onChange={handleImageAnalysisRequestChange}
              isDisabled={analysisOptions?.length > 0 ? false : true}
            />
            <div
              css={{
                display: "grid",
                gridAutoFlow: "row",
                gap: 2,
                paddingTop: "4px",
              }}
            >
              <Typography
                sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
                variant="caption1"
              >
                Associate with
              </Typography>
              <ColonyAssociate
                colonies={colonies as colony[]}
                setSelectedColony={setSelectedColony}
                creatingNewCluster={true}
                colonyRequired={selectedColony}
              />
            </div>
            {selectedColony?.name === "new colony" && (
              <CustomInputField
                label={"Colony name"}
                value={newClusterAndColony.colonyName}
                onChange={(arg: string) =>
                  setNewClusterAndColony((prev: any) => {
                    return { ...prev, colonyName: arg };
                  })
                }
                required={true}
              />
            )}
            <div css={{ paddingTop: 3 }}>
              <CustomSelect
                value="UNKNOWN"
                label={"Quality"}
                options={QUALITY_OPTIONS}
                onChange={handleQualityChange}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div
          css={{
            display: "grid",
            gridAutoFlow: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS }}
            variant="caption1"
          >
            Type
          </Typography>
          <Typography sx={{ fontSize: "12px" }} variant="caption2">
            Manual
          </Typography>
        </div>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE,
            borderRadius: "8px",
            height: "40px",
            mt: "10px",
            "&:hover": { backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE },
            width: "250px",
          }}
          disabled={getButtonDisabledState(
            newClusterAndColony,
            selectedColony?.name,
            newPolygonData
          )}
          onClick={handleClick}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ClusterAccorditionGrid;
