import { COLORMAP } from "../constants";

function getColorLabel(rgb: number[]) {
  for (const color in COLORMAP) {
    if (JSON.stringify(rgb) === JSON.stringify(COLORMAP[color])) {
      return color;
    }
  }
  return "White";
}

export default getColorLabel;
