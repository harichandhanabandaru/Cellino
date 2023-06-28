import ScaleBar from "../../molecules/ScaleBar";
import memoize from "memoize-one";
import getSizeAndWidth from "../../../utils/getSizeAndWidth";
import { scaleBarDataVar } from "../../../apollo/cache";
import { useReactiveVar } from "@apollo/client";
import getImageCoords from "../../../utils/getImageCoords";

const _getSizeAndWidth = memoize(getSizeAndWidth);
const _getImageCoords = memoize(getImageCoords);

function ScaleBarWrapper({ zoom, px_mm }: { zoom: number; px_mm: number }) {
  const scaleBarData = useReactiveVar(scaleBarDataVar);
  const scale = 2 ** zoom;
  const ratio = (scale / (px_mm * 1000)) * 100; // based on 100μm
  const { size, width } = _getSizeAndWidth(ratio);
  const { x, y } = _getImageCoords(
    scaleBarData.x,
    scaleBarData.y,
    px_mm,
    scaleBarData.width,
    scaleBarData.height
  );
  const value = scaleBarData.value;

  return <ScaleBar size={size} width={width} value={value} x={x} y={y} />;
}

export default ScaleBarWrapper;
