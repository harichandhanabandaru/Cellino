import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material";
import { COLORS } from "../../../theme/Colors";

function AIMSLoader(props: CircularProgressProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 999,
          opacity: 0.5,
          backgroundColor: "gray",
        }}
      ></Box>
      <Box sx={{ position: "absolute", zIndex: 1000 }} data-testId="AIMSLoader">
        <CircularProgress
          variant="determinate"
          sx={{
            color: COLORS.ALPHA_PRIMARY_PURPLE,
          }}
          size={70}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: COLORS.GAMMA_HEATMAP_100,
            animationDuration: "950ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={70}
          thickness={4}
          {...props}
        />
      </Box>
    </div>
  );
}

export default function Loader() {
  return <AIMSLoader />;
}
