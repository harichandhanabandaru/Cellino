// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { COLORS } from "../../../theme/Colors";
import ScaleBarValues from "../ScaleBarValues";

function ScaleBar({
  size,
  width,
  value,
  x,
  y,
}: {
  size: number;
  width: number;
  value: string;
  x: number;
  y: number;
}) {
  return (
    <>
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
          gap: 4,
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div
          css={{
            display: "grid",
            gridAutoFlow: "row",
            justifyItems: "center",
            color: COLORS.GAMMA_BACKGROUND_WHITE,
            gap: 2,
          }}
        >
          <Typography
            css={{
              backgroundColor: `${COLORS.BETA_TEXT_HIGH_EMPHASIS}66`,
              padding: "0 8px",
              borderRadius: 20,
            }}
            variant={"caption3"}
          >{`${size}μm`}</Typography>
          <div
            style={{
              width,
            }}
            css={{
              display: "inline-block",
              height: 10,
              backgroundColor: COLORS.GAMMA_HEATMAP_200,
              borderRadius: 10,
            }}
          />
        </div>
        <ScaleBarValues value={value} x={x} y={y} />
      </div>
    </>
  );
}

export default ScaleBar;
