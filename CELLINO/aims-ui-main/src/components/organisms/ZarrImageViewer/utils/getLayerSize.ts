import { isInterleaved } from "./guessTileSize";
import { ZarrPixelSource } from "@hms-dbmi/viv";

function getLayerSize(loader?: ZarrPixelSource<string[]>) {
  const [base, maxZoom] = Array.isArray(loader)
    ? [loader[0], loader.length]
    : [loader, 0];
  const interleaved = isInterleaved(base.shape);
  let [height, width] = base.shape.slice(interleaved ? -3 : -2);
  return { height, width, maxZoom };
}

export default getLayerSize;
