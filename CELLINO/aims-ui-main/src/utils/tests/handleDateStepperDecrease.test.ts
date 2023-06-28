import handleDateStepperDecrease from "../handleDateStepperDecrease";
import { sampleImageEvents } from "./sampleData";

describe("handleDateStepperDecrease", function () {
  it("should return 115547 when function is called", function () {
    const result = handleDateStepperDecrease("116050", sampleImageEvents);
    expect(result).toBe("115547");
  });

  it("should return 115227 when function is called", function () {
    const result = handleDateStepperDecrease("115547", sampleImageEvents);
    expect(result).toBe("114909");
  });

  it("should return 112325 when function is called", function () {
    const result = handleDateStepperDecrease("112325", sampleImageEvents);
    expect(result).toBe("112325");
  });

  it("should return same id if invalid id is passed", function () {
    const result = handleDateStepperDecrease("123", sampleImageEvents);
    expect(result).toBe("123");
  });
});
