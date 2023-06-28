import { ZarrPixelSource } from "@hms-dbmi/viv";
import { Matrix4 as Mat } from "math.gl";

export interface GridLoader {
  loader: ZarrPixelSource<string[]>;
  row: number;
  col: number;
  name: string;
}

const COLORS = {
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  magenta: "#FF00FF",
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  white: "#FFFFFF",
};

async function loadSingleChannel(
  data: ZarrPixelSource<string[]>[],
  initialOpacity = 1
) {
  const selection = Array(data[0].shape.length).fill(0);
  return {
    loader: data,
    name: "",
    channel_axis: null,
    colors: [COLORS.white],
    names: ["channel_0"],
    visibilities: [true],
    model_matrix: Mat.IDENTITY,
    defaults: {
      selection,
      colormap: "",
      opacity: initialOpacity,
    },
    axis_labels: data[0].labels,
  };
}

export default loadSingleChannel;
