/**
 * convertPixelCoordsToMm
 * @param outlineInPixelCoords object
 * @param metadata Object
 * @returns Object
 *
 * TODO: refactor the below function
 */
export function convertPixelCoordsToMm(outlineInPixelCoords, metadata) {
  let xmin = Infinity;
  let ymin = Infinity;
  let xmax = -Infinity;
  let ymax = -Infinity;
  const { interiors, exterior, color } = outlineInPixelCoords;
  const { width_px: width, height_px: height, pixel_size_um } = metadata;
  const pix_mm = pixel_size_um / 1000;

  const convertedExterior = exterior?.map((t) => {
    const x = (t.x - width / 2) * pix_mm;
    const y = (t.y - height / 2) * pix_mm;
    xmin = Math.min(xmin, x);
    ymin = Math.min(ymin, y);
    xmax = Math.max(xmax, x);
    ymax = Math.max(ymax, y);
    return { x, y };
  });

  const convertedInteriors = [];
  for (const polygon of interiors) {
    convertedInteriors.push(
      polygon?.map((t) => ({
        x: (t.x - width / 2) * pix_mm,
        y: (t.y - height / 2) * pix_mm,
      }))
    );
  }

  const boundingBox = [
    { x: xmin, y: ymin },
    { x: xmax, y: ymax },
  ];

  const center = {
    x: (xmin + xmax) / 2,
    y: (ymin + ymax) / 2,
  };

  return {
    color,
    boundingBox,
    center,
    exterior: convertedExterior,
    interiors: convertedInteriors,
  };
}

/**
 * convertMmToPixelCoords
 * @param outlineInMm Object
 * @param metadata Object
 * @returns Object
 *
 * TODO: refactor the function below
 */
export function convertMmToPixelCoords(outlineInMm, metadata) {
  const { interiors, exterior, boundingBox, center, color } = outlineInMm;
  const { width_px: width, height_px: height, pixel_size_um } = metadata;
  const pix_mm = pixel_size_um / 1000;

  const convertedExterior = exterior.map((t: { x: number; y: number }) => ({
    x: t.x / pix_mm + width / 2,
    y: t.y / pix_mm + height / 2,
  }));

  const convertedInteriors = interiors?.map(
    (interior: { x: number; y: number }[]) => {
      return interior.map((t) => {
        const x = t.x / pix_mm + width / 2;
        const y = t.y / pix_mm + height / 2;
        return { x, y };
      });
    }
  );
  const convertedBoundingBox = {
    xmin: boundingBox[0].x / pix_mm + width / 2,
    xmax: boundingBox[1].x / pix_mm + width / 2,
    ymin: boundingBox[0].y / pix_mm + height / 2,
    ymax: boundingBox[1].y / pix_mm + height / 2,
  };

  const convertedCenter = {
    x: center.x / pix_mm + width / 2,
    y: center.y / pix_mm + height / 2,
  };

  return {
    color,
    exterior: convertedExterior,
    boundingBox: convertedBoundingBox,
    interiors: convertedInteriors ?? [],
    center: convertedCenter,
  };
}
