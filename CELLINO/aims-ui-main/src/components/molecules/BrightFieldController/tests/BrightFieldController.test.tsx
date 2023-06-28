import { render, screen, fireEvent } from "@testing-library/react";
import BrightFieldController from "../index";

jest.mock("@mui/material/Slider", () => (props: any) => {
  const { id, name, min, max, onChange, testid, value } = props;
  return (
    <input
      data-testid={testid}
      type="range"
      id={id}
      name={name}
      min={min}
      max={max}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    />
  );
});

describe("BrightFieldController", function () {
  it("should able to update contrast and opacity", async function () {
    const handleOpacityChange = jest.fn();
    const handleContrastChange = jest.fn();
    const handleColormapChange = jest.fn();
    render(
      <BrightFieldController
        opacity={0.5}
        contrastLimit={[0, 100]}
        contrastLimitRange={[0, 100]}
        handleOpacityChange={handleOpacityChange}
        handleContrastChange={handleContrastChange}
        handleColormapChange={handleColormapChange}
        handleDownloadContextJson={jest.fn()}
        color="Blue"
      />
    );
    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: 25 } });
    expect(handleOpacityChange).toBeCalledTimes(1);
    fireEvent.change(sliders[1], { target: { value: 25 } });
    expect(handleContrastChange).toBeCalledTimes(1);
  });
});
