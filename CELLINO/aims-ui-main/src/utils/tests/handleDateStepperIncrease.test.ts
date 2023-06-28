import handleDateStepperIncrease from "../handleDateStepperIncrease";
import { sampleImageEvents } from "./sampleData";

describe("handleDateStepperIncrease", function () {
  it("should return 116050 when function is called", function () {
    const result = handleDateStepperIncrease("116050", sampleImageEvents);
    expect(result).toBe("116050");
  });

  it("should return 115837 when function is called", function () {
    const result = handleDateStepperIncrease("115547", sampleImageEvents);
    expect(result).toBe("115837");
  });

  it("should return 112930 when function is called", function () {
    const result = handleDateStepperIncrease("112325", sampleImageEvents);
    expect(result).toBe("112930");
  });

  it("should return same id if invalid id is passed", function () {
    const result = handleDateStepperIncrease("123", sampleImageEvents);
    expect(result).toBe("123");
  });
});
