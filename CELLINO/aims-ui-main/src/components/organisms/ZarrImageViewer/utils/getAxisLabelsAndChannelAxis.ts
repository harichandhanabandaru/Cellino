import { ZarrArray } from "zarr";

function getAxisLabels(
  arr: ZarrArray,
  axis_labels?: string[]
): [...string[], "y", "x"] {
  if (!axis_labels || axis_labels.length !== arr.shape.length) {
    // default axis_labels are e.g. ['0', '1', 'y', 'x']
    const nonXYaxisLabels = arr.shape.slice(0, -2).map((_, i) => "" + i);
    axis_labels = nonXYaxisLabels.concat(["y", "x"]);
  }
  return axis_labels as [...string[], "y", "x"];
}

type Labels = [...string[], "y", "x"];

function getAxisLabelsAndChannelAxis(arr: ZarrArray): {
  labels: Labels;
  channel_axis: number;
} {
  const labels = getAxisLabels(arr);
  const channel_axis = labels.indexOf("c");
  return { labels, channel_axis };
}

export default getAxisLabelsAndChannelAxis;
