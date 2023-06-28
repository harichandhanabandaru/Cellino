function getImageCoords(
  x: number,
  y: number,
  px_mm: number,
  width: number,
  height: number
) {
  if (x < 0 || x > width || y < 0 || y > height) {
    return { x: 0, y: 0 };
  }
  return { x: x * (px_mm * 1000), y: y * (px_mm * 1000) };
}

export default getImageCoords;
