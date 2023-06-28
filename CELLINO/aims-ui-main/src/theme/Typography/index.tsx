import "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
    subtitle4: React.CSSProperties;
    subtitle5: React.CSSProperties;
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    body5: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    caption3: React.CSSProperties;
    overline: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subtitle3: React.CSSProperties;
    subtitle4: React.CSSProperties;
    subtitle5: React.CSSProperties;
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    body5: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    caption3: React.CSSProperties;
    overline: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
    subtitle4: true;
    subtitle5: true;
    body3: true;
    body4: true;
    body5: true;
    caption1: true;
    caption2: true;
    caption3: true;
    overline: true;
  }
}

const Typography = {
  h1: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "32px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "97px",
  },
  subtitle1: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "28px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "35.73px",
  },
  subtitle2: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "26px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "33.18px",
  },
  subtitle3: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "24px",
    fontWeight: 700,
    fontStyle: "normal",
    lineHeight: "30.62px",
  },
  subtitle4: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "22px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "28.07px",
  },
  subtitle5: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "20px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "25.52px",
  },

  caption: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "12px",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "16px",
    letterSpacing: "0.25px",
  },
  caption1: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "12px",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "19.5px",
    letterSpacing: "0.25px",
  },
  caption2: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "12px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "19.5px",
    letterSpacing: "0.5px",
  },
  caption3: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "12px",
    fontWeight: 700,
    fontStyle: "normal",
    lineHeight: "16px",
    letterSpacing: "0.5px",
  },
  body1: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "18px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "31.32px",
  },
  body2: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "16px",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "24px",
  },
  body3: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "16px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "20.42px",
  },
  body4: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "14px",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "17.86px",
    letterSpacing: "0.25px",
  },
  body5: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "14px",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "17.86px",
    letterSpacing: "0.25px",
  },
  button: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "14px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "0.2px",
  },
  overline: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "10px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "12px",
    letterSpacing: "0.25px",
  },
};

export default Typography;
