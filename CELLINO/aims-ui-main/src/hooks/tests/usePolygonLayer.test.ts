import { renderHook } from "@testing-library/react-hooks";
import usePolygonLayer from "../usePolygonLayer";

describe.skip("usePolygonLayer", function () {
  test("should use polygon layer", async () => {
    const { result } = renderHook(() => usePolygonLayer(jest.fn(), null));
    expect(result.current.layer?.id).toBe("geojson-layer");
  });
});
