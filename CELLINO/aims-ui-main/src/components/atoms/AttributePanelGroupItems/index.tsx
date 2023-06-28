import { Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { COLORS } from "../../../theme/Colors";

function AttributePanelGroupItems({ itemList }: { itemList: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return itemList && itemList.length === 0 ? (
    <Box data-testid={"EmptyList"}>
      {" "}
      <Typography
        variant="caption2"
        sx={{
          color: COLORS.GAMMA_HEATMAP_600,
        }}
        onClick={toggleExpanded}
      >
        -
      </Typography>
    </Box>
  ) : (
    <Box data-testid={"NonEmptyList"}>
      {expanded ? (
        <>
          <Typography variant="caption2">
            {itemList.map((item: string, index) => {
              if (index === itemList?.length - 1) {
                if (index % 2 === 0) {
                  return "\n" + item;
                } else return item;
              }
              if (index % 2 === 0) {
                return "\n" + item + ",";
              }
              return item + ",";
            })}
          </Typography>
          <Typography
            variant="caption2"
            sx={{
              color: COLORS.GAMMA_HEATMAP_600,
            }}
            onClick={toggleExpanded}
          >
            {" "}
            less
          </Typography>
        </>
      ) : itemList?.length > 1 ? (
        <>
          <Typography variant="caption2"> {itemList[0]}</Typography>
          <Typography
            variant="caption2"
            sx={{
              color: COLORS.GAMMA_HEATMAP_600,
            }}
            onClick={toggleExpanded}
            data-testid={"PlusOthers"}
          >
            {" "}
            +{itemList.length - 1} Others{" "}
          </Typography>
        </>
      ) : (
        <Typography variant="caption2">{itemList}</Typography>
      )}
    </Box>
  );
}

export default AttributePanelGroupItems;
