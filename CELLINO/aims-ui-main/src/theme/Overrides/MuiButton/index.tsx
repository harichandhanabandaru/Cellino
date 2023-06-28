import { COLORS } from "../../Colors";

const MuiButton = {
  styleOverrides: {
    contained: {
      backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE,
      color: COLORS.GAMMA_BACKGROUND_WHITE,
      textTransform: "none",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: COLORS.GAMMA_HEATMAP_700,
        boxShadow: "none",
      },
      "&:disabled": {
        backgroundColor: COLORS.BETA_SECONDARY_PURPLE_DISABLED,
        color: COLORS.GAMMA_BACKGROUND_WHITE,
      },
    },
    outlined: {
      color: COLORS.ALPHA_PRIMARY_PURPLE,
      boxShadow: "none",
      textTransform: "none",
      "&:hover": {
        backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
        borderColor: COLORS.GAMMA_HEATMAP_700,
        color: COLORS.GAMMA_HEATMAP_700,

        boxShadow: "none",
      },
      "&:disabled": {
        borderColor: COLORS.BETA_SECONDARY_PURPLE_DISABLED,
        color: COLORS.BETA_SECONDARY_PURPLE_DISABLED,
      },
      borderColor: COLORS.ALPHA_PRIMARY_PURPLE,
    },
    text: {
      color: COLORS.ALPHA_PRIMARY_PURPLE,
      textTransform: "none",

      "&:hover": {
        color: COLORS.ALPHA_PRIMARY_PURPLE,
      },
      "&:disabled": {
        color: COLORS.BETA_TEXT_LOW_EMPHASIS,
      },
    },
  },
};

export default MuiButton;
