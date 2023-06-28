import { DEFAULT_OPACITY } from "../constants";

export const addAlphaToHexCode = (hexCode: string, opacity: number) => {
  //convert alpha value to the hex code
  const hexOfAlpha = Math.ceil(opacity * 255).toString(16);
  //append alpha hex code to the given hex code
  return `${hexCode}${hexOfAlpha.padStart(2, "0")}`;
};

export const getAlphaFromHexCode = (hexCode: string | null) => {
  if (hexCode) {
    if (hexCode?.length === 7) {
      return DEFAULT_OPACITY;
    } else {
      const alphaHex = hexCode?.slice(-2);
      const opacity = Number((parseInt(alphaHex, 16) / 255).toFixed(2));
      return opacity;
    }
  }
  return DEFAULT_OPACITY;
};
