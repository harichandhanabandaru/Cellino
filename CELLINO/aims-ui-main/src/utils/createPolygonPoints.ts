import { coordinates } from "../constants/types";

export function createPolygonPoints(points: Array<coordinates> = []) {
  const temp = points.map((point) => {
    return [point.x, point.y];
  });
  if (temp.length > 0) {
    temp.push(temp[0]);
  }
  return temp;
}
