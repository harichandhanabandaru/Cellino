import { ZarrArray } from "zarr";

export function isInterleaved(shape: number[]) {
  const lastDimSize = shape[shape.length - 1];
  return lastDimSize === 3 || lastDimSize === 4;
}

function guessTileSize(arr: ZarrArray) {
  const interleaved = isInterleaved(arr.shape);
  const [ySize, xSize] = arr.chunks.slice(interleaved ? -3 : -2);
  const size = Math.min(ySize, xSize);
  // Needs to be a power of 2 for deck.gl
  return 2 ** Math.floor(Math.log2(size));
}

export default guessTileSize;
