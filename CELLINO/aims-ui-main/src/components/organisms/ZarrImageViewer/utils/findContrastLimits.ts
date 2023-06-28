function stdDev(arr: number[]) {
  // Creating the mean with Array.reduce
  let mean =
    arr.reduce((acc, curr) => {
      return acc + curr;
    }, 0) / arr.length;

  // Assigning (value - mean) ^ 2 to every array item
  arr = arr.map((k) => {
    return (k - mean) ** 2;
  });

  // Calculating the sum of updated array
  let sum = arr.reduce((acc, curr) => acc + curr, 0);

  // Calculating the variance
  let variance = sum / arr.length;

  // Returning the Standered deviation
  return Math.sqrt(variance);
}

async function findContrastLimits(
  layer: any[],
  range = [1, 65536],
  timeSlice = -1
) {
  const resolutionSlice = layer[layer.length - 1];
  let shape = [...resolutionSlice.shape];
  let selection: number[] = [];
  if (shape.length > 3) {
    selection = [timeSlice, -1];
    shape = shape.slice(2);
  } else if (resolutionSlice.shape.length > 2) {
    selection = [timeSlice];
    shape = shape.slice(1);
  }
  const quarterSizeX = Math.floor((shape[0] * 3) / 8);
  const quarterSizeY = Math.floor((shape[1] * 3) / 8);
  selection.push(-quarterSizeX);
  selection.push(-quarterSizeY);
  const sample = await resolutionSlice.get(selection);
  const std = stdDev(sample.data);
  const mean =
    sample.data.reduce((a: number, b: number) => a + b, 0) / sample.data.length;
  const low = Math.max(range[0], mean - std);
  const high = Math.min(range[1], mean + 2.5 * std);
  return [low, high];
}

export default findContrastLimits;
