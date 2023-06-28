import * as React from "react";
import Box from "@mui/material/Box";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Typography } from "@mui/material";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import { WELL_STATUS } from "../../../constants";

export interface IProps {
  name: string;
  status: string;
}

const wellSelectorItem = ({ name, status }: IProps) => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid white",
          borderRadius: "6px",
          width: "100px",
          backgroundColor: "white",
          height: "33px",
          display: "flex",
          alignItems: "center",
        }}
        data-testid="wellSelectorItem"
      >
        {status && status === WELL_STATUS.COMPLETED && (
          <CheckBoxSharpIcon
            sx={{
              color: "#38CB89",
              backgroundColor: "white",
              pl: "12px",
            }}
          />
        )}
        {((status && status === WELL_STATUS.IN_REVIEW) ||
          status === WELL_STATUS.NOT_STARTED) && (
          <FiberManualRecordIcon
            sx={{
              color: `${
                status === WELL_STATUS.IN_REVIEW ? "#FFC800" : "#979598"
              }`,
              pl: "12px",
            }}
          />
        )}
        <Typography sx={{ pl: "5px", fontSize: "16px" }}>{name}</Typography>
      </Box>
    </>
  );
};

export default wellSelectorItem;
