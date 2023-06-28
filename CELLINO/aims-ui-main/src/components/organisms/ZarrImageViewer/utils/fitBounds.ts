function fitBounds(
  [width, height]: [width: number, height: number],
  [targetWidth, targetHeight]: [targetWidth: number, targetHeight: number],
  maxZoom: number,
  padding: number
) {
  const scaleX = (targetWidth - padding * 2) / width;
  const scaleY = (targetHeight - padding * 2) / height;
  const zoom = Math.min(maxZoom, Math.log2(Math.min(scaleX, scaleY)));
  return { zoom, target: [width / 2, height / 2, 0] };
}

export default fitBounds;
