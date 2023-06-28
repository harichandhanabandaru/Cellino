import { RGBAColor } from "@deck.gl/core/utils/color";

function hexToRGB(hex: string, opacity: number) {
  let temp;
  if (hex) {
    temp = hex.startsWith("#") ? hex.slice(1) : hex;
  } else {
    //TODO - needs to be handled in backend
    temp = "#20179d";
  }
  const r = parseInt(temp.slice(0, 2), 16);
  const g = parseInt(temp.slice(2, 4), 16);
  const b = parseInt(temp.slice(4, 6), 16);
  return [r, g, b, opacity * 255] as RGBAColor;
}

export default hexToRGB;
