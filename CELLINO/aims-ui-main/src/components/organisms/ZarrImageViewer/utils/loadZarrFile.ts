import { HTTPStore, openGroup } from "zarr";
import { ZarrPixelSource } from "@hms-dbmi/viv";
import loadMultiscales from "./loadMultiscales";
import getAxisLabelsAndChannelAxis from "./getAxisLabelsAndChannelAxis";
import guessTileSize from "./guessTileSize";
import loadSingleChannel from "./loadSingleChannel";
import hexToRGB from "./hexToRGB";
import findContrastLimits from "./findContrastLimits";

async function loadZarrFile(
  dataUrl: string,
  initiallyVisible = true,
  initialOpacity = 1,
  time_slice?: number
) {
  const url = new URL(dataUrl);
  const store = new HTTPStore(url.origin, {
    fetchOptions: { credentials: "include" },
  });
  const group = await openGroup(store, url.pathname.slice(1));
  const attrs = await group.attrs.asObject();
  const version = attrs?.version;
  const data = await loadMultiscales(group, attrs.multiscales, version);

  const { labels } = getAxisLabelsAndChannelAxis(data[0]);

  const tileSize = guessTileSize(data[0]);

  // @ts-ignore
  // viv is running an older version of zarr js library
  const loader = data.map((d) => new ZarrPixelSource(d, labels, tileSize));

  const result = await loadSingleChannel(loader, initialOpacity);

  const defaultTimePoint: number =
    time_slice !== undefined && Number.isFinite(time_slice)
      ? time_slice
      : version === 2
      ? attrs.step_image?.length - 1
      : attrs.step_image[0].datasets.length - 1;

  const id = Math.random().toString(36).slice(2);
  const { selection, opacity, colormap } = result.defaults;
  const selections: number[][] = [];
  const colors: [number, number, number][] = [];
  const channelsVisible: boolean[] = [];
  selection[0] = defaultTimePoint;
  const channelSelection = [...selection];
  selections.push(channelSelection);
  colors.push(hexToRGB(result.colors[0]));
  channelsVisible.push(true);

  const contrastLimitsRange = [0, 65536];

  const limits = (await findContrastLimits(
    data,
    contrastLimitsRange,
    time_slice
  )) as [start: number, end: number];
  const adjustedLimits = limits.every((x) => Number.isFinite(x))
    ? [limits]
    : [[0, 0]];

  const adjustedRange = [
    Math.sign(adjustedLimits[0][0] - 6554) > 0
      ? adjustedLimits[0][0] - 6554
      : 0,
    adjustedLimits[0][1] + 6554 < 65536 ? adjustedLimits[0][1] + 6554 : 65536,
  ];

  const layerProps = {
    id,
    selections,
    colors,
    contrastLimits: adjustedLimits,
    contrastLimitsRange: [adjustedRange],
    channelsVisible,
    opacity,
    colormap,
    modelMatrix: result.model_matrix,
  };

  return {
    layerProps: {
      ...layerProps,
      loader: result.loader,
    },
    on: initiallyVisible,
    sourceData: result,
    attrs,
    tileSize,
  };
}

export default loadZarrFile;
