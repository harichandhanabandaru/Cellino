import { Box, Typography, Tooltip } from "@mui/material";
import { COLORS } from "../../../theme/Colors";

function AttributeField({
  label,
  value,
  attributeAlignment,
}: {
  label?: string;
  value: string | number;
  attributeAlignment?: string;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: attributeAlignment ?? "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "4px 0px 4px 0px",
      }}
    >
      <Typography color={COLORS.BETA_TEXT_LOW_EMPHASIS} variant={"body4"}>
        {label}
      </Typography>
      {value.toString().length > 25 ? (
        <Tooltip title={value} arrow>
          <Typography
            variant="body4"
            sx={{
              color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
              textTransform: "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              width: "110px",
            }}
          >
            {value}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant={"body4"}>{value}</Typography>
      )}
    </Box>
  );
}

export default AttributeField;
