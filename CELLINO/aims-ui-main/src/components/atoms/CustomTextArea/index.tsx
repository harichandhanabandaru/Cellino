import * as React from "react";
import { styled } from "@mui/system";
import { COLORS } from "../../../theme/Colors";

const TextArea = styled("textarea")({
  width: "220px",
  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
  borderRadius: "8px",
  outline: "none",
  height: "70px",
  padding: "5px",
  borderColor: COLORS.GAMMA_BACKGROUND_02,
  "&:focus": {
    border: `1px solid ${COLORS.ALPHA_PRIMARY_PURPLE}`,
  },
});

export default function CustomTextArea() {
  return (
    <>
      <TextArea aria-label="empty textarea" placeholder="Add a comment" />
    </>
  );
}
