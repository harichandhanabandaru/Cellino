import getImageCoords from "../getImageCoords";

describe("getImageCoords", function () {
  it("should return x: 100, y: 100", function () {
    const result = getImageCoords(100, 100, 0.001, 200, 200);
    expect(result).toEqual({
      x: 100,
      y: 100,
    });
  });

  it("should return x: 0, y: 0", function () {
    const result = getImageCoords(100, 100, 0.001, 200, 20);
    expect(result).toEqual({
      x: 0,
      y: 0,
    });
  });
});
