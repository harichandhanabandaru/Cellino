import { COLORS } from "../../Colors";

const MuiSlider = {
  styleOverrides: {
    root: {
      color: COLORS.BETA_SECONDARY_GREY,
      height: "8px",
      width: "182px",
      marginLeft: "15px",
      marginTop: "-10px",
      "& .MuiSlider-track": {
        border: "none",
      },
      "& .MuiSlider-thumb": {
        height: "8px",
        width: "8px",
        backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE,
        border: "2px solid white",
        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
          boxShadow: "inherit",
        },
      },
    },
  },
};

export default MuiSlider;
