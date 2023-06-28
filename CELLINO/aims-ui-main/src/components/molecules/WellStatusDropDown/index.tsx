// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { Button } from "@mui/material";
import "../../../i18n/config";
import { COLORS } from "../../../theme/Colors";
import CustomSelect from "../CustomSelect";
import CustomAutoComplete from "../CustomAutoCompleteFreeSolo";
import { WELL_DROP_REASONS } from "../../../constants";
import { DropWellProps } from "../../../constants/types";
import React from "react";

interface WellStatusDropDownProps {
  dropWell: DropWellProps;
  setDropWell: React.Dispatch<React.SetStateAction<any>>;
  handleDropWell: () => void;
  plateProcessStatus: string;
}
const WELL_STATUS_OPTIONS = [
  { label: "KEEP", value: "KEEP" },
  { label: "DROP", value: "DROP" },
  { label: "SCAN", value: "SCAN" },
];

function WellStatusDropDown(WellStatusDropDownProps: WellStatusDropDownProps) {
  const { dropWell, setDropWell, handleDropWell, plateProcessStatus } =
    WellStatusDropDownProps;

  const handleStatusChange = (newValue: string) => {
    setDropWell((prev: any) => {
      if (newValue === "Drop") return { ...prev, status: newValue };
      else {
        return { ...prev, status: newValue, reason: "" };
      }
    });
  };

  const handleReasonChange = (newValue: string) => {
    setDropWell((prev: any) => {
      return { ...prev, reason: newValue };
    });
  };
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        gap: 22,
        padding: "0px 20px  0px 20px ",
        mb: "10px",
      }}
    >
      <div css={{ display: "grid", width: "172px" }}>
        <CustomSelect
          value={dropWell.plateStatus === "DROP" ? "DROP" : dropWell.status}
          label="Status"
          isDisabled={
            dropWell.plateStatus === "DROP" ||
            dropWell.wellStatus === "DROP" ||
            plateProcessStatus === "RETIRED"
          }
          options={WELL_STATUS_OPTIONS}
          onChange={handleStatusChange}
        />
      </div>
      {dropWell.status === "DROP" || dropWell.plateStatus === "DROP" ? (
        <div css={{ dispay: "grid" }}>
          <CustomAutoComplete
            label={"Reason"}
            value={dropWell.dropReason || ""}
            isDisabled={
              dropWell.plateStatus === "DROP" || dropWell.wellStatus === "DROP"
            }
            options={WELL_DROP_REASONS}
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
          marginBottom: "15px",
          "&:hover": { backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE },
        }}
        disabled={
          dropWell.plateStatus === "DROP" || dropWell.wellStatus === "DROP"
        }
        onClick={handleDropWell}
      >
        Submit
      </Button>
    </div>
  );
}

export default WellStatusDropDown;
