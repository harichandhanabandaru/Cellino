function getPolygonPoints(
  polygon: Array<Array<number>>
): { x: number; y: number }[] {
  return polygon.map((p) => ({ x: p[0], y: p[1] }));
}

export default getPolygonPoints;
