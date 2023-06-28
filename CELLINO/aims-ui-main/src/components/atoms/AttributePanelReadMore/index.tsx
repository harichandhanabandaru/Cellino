import { Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { COLORS } from "../../../theme/Colors";

interface propsType {
  wholetext: string;
  showMoreText: string;
  showLessText: string;
}
const AttributePanelReadMore = ({
  wholetext,
  showMoreText,
  showLessText,
}: propsType) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (wholetext === "-" || wholetext.length < 60) === true ? (
    <Box>
      <Typography variant={"body4"}>{wholetext}</Typography>
    </Box>
  ) : (
    <Box sx={{ marginLeft: "10px" }} data-testid="readMore">
      {isReadMore ? (
        <Typography
          variant="body4"
          sx={{
            color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
            lineSpacing: 0,
          }}
          textTransform="none"
        >
          {wholetext.slice(0, 60)}
        </Typography>
      ) : (
        <Typography
          variant="body4"
          sx={{ color: COLORS.BETA_TEXT_HIGH_EMPHASIS }}
          textTransform="none"
        >
          {wholetext}
        </Typography>
      )}

      {isReadMore ? (
        <Typography
          variant="body4"
          sx={{
            color: COLORS.GAMMA_HEATMAP_600,
            cursor: "pointer",
          }}
          onClick={toggleReadMore}
          textTransform="none"
        >
          {showMoreText}
        </Typography>
      ) : (
        <Typography
          variant="body4"
          sx={{
            color: COLORS.GAMMA_HEATMAP_600,
            paddingLeft: "2px",
            cursor: "pointer",
          }}
          onClick={toggleReadMore}
          textTransform="none"
        >
          {showLessText}
        </Typography>
      )}
    </Box>
  );
};

export default AttributePanelReadMore;
