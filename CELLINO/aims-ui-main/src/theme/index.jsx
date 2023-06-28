import palette from "./Palette";
import props from "./Props";
import typography from "./Typography";
import overrides from "./Overrides";
import customClasses from "./CustomClasses";
import border from "./Border";
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    ...overrides,
  },
  palette,
  props,
  typography,
  customClasses,
  shape: {
    borderRadius: 0,
  },
  border,
});

export default theme;
