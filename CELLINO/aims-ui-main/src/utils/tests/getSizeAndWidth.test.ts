import getSizeAndWidth from "../getSizeAndWidth";

describe("getSizeAndWidth", function () {
  it("should return size as 200 if ratio is 99", function () {
    const result = getSizeAndWidth(99);
    expect(result.size).toEqual(200);
  });

  it("should return size as 500 if ratio is 49", function () {
    const result = getSizeAndWidth(49);
    expect(result.size).toEqual(500);
  });

  it("should return size as 1000 if ratio is 19", function () {
    const result = getSizeAndWidth(19);
    expect(result.size).toEqual(1000);
  });

  it("should return size as 2000 if ratio is 9", function () {
    const result = getSizeAndWidth(9);
    expect(result.size).toEqual(2000);
  });

  it("should return size as 5000 if ratio is 4", function () {
    const result = getSizeAndWidth(4);
    expect(result.size).toEqual(5000);
  });

  it("should return size as 10000 if ratio is 1.2", function () {
    const result = getSizeAndWidth(1.2);
    expect(result.size).toEqual(10000);
  });

  it("should return size as 20000 if ratio is 0.6", function () {
    const result = getSizeAndWidth(0.6);
    expect(result.size).toEqual(20000);
  });

  it("should return size as 100 if ratio is 0.1", function () {
    // too zoomed out
    const result = getSizeAndWidth(0.1);
    expect(result.size).toEqual(100);
  });

  it("should return size as 50 if ratio is 300", function () {
    const result = getSizeAndWidth(300);
    expect(result.size).toEqual(50);
  });

  it("should return size as 20 if ratio is 1000", function () {
    const result = getSizeAndWidth(1000);
    expect(result.size).toEqual(20);
  });

  it("should return size as 10 if ratio is 2000", function () {
    const result = getSizeAndWidth(2000);
    expect(result.size).toEqual(10);
  });

  it("should return size as 5 if ratio is 3000", function () {
    const result = getSizeAndWidth(3000);
    expect(result.size).toEqual(5);
  });

  it("should return size as 100 if ratio is 6000", function () {
    // too zoomed in
    const result = getSizeAndWidth(6000);
    expect(result.size).toEqual(100);
  });

  it("should return size as 100 if ratio is 150", function () {
    const result = getSizeAndWidth(150);
    expect(result.size).toEqual(100);
  });
});
