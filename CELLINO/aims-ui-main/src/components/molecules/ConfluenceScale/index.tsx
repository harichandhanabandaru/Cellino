// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import Confluence from "../../atoms/Confluence";
import DropDown from "../DropDown";
import React from "react";
import { Typography } from "@mui/material";
import { PLATE_ATTRIBUTES } from "../../../constants";

const dropDownOptions = [
  { name: PLATE_ATTRIBUTES.CONFLUENCE, disabled: false },
  { name: PLATE_ATTRIBUTES.INTERIOR_CONFLUENCE, disabled: false },
  { name: PLATE_ATTRIBUTES.CELLS, disabled: false },
  { name: PLATE_ATTRIBUTES.COLONIES, disabled: false },
  { name: PLATE_ATTRIBUTES.CONTAMINATION_SCORE, disabled: false },
];

const ConfluenceScale = ({
  handleDropdownChange,
  value,
  phaseName,
}: {
  handleDropdownChange: (e: React.MouseEvent) => void;
  value: string;
  phaseName?: string;
}) => {
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        rowGap: 5,
        alignSelf: "end",
        marginBottom: 10,
      }}
    >
      <DropDown
        options={dropDownOptions}
        value={value}
        handleChange={handleDropdownChange}
        width="126px"
      />
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridAutoFlow: "column",
        }}
      >
        <div
          css={{
            display: "grid",
            gridAutoFlow: "row",
            alignContent: "space-between",
          }}
        >
          <Typography variant="caption" fontSize="14px">
            0%
          </Typography>
          <Typography variant="caption" fontSize="14px">
            100%
          </Typography>
        </div>
        <Confluence />
      </div>
    </div>
  );
};
export default ConfluenceScale;
