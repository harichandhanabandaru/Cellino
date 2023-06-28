// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import { COLORS } from "../../../theme/Colors";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export interface InputTextFieldProps {
  value: string | null;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const StyledInput = styled(InputBase)(() => ({
  border: `1px solid #eaecef`,
}));

function InputTextField({ value, setSearchText }: InputTextFieldProps) {
  return (
    <StyledInput
      data-testid={"TextField"}
      sx={{
        marginTop: "12px",
        borderRadius: "10px",
        marginBottom: "10px",
        fontWeight: "400",
        background: COLORS.GAMMA_BACKGROUND_02,
        width: "207px",
        "& input::placeholder": { fontSize: 15 },
        "& input": { marginLeft: 2 },
      }}
      placeholder="Enter name or number"
      inputProps={{
        disableUnderline: true,
      }}
      type="text"
      value={value}
      onChange={(event) => {
        setSearchText(event.target.value);
      }}
    />
  );
}

export default InputTextField;
