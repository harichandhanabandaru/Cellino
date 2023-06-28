const getColoniesAndCellsPercentage = (
  value: number,
  totalColonies: number
) => {
  let limit = totalColonies / 10; //divide the total colonies into 10 intervals
  let opacity = 0;
  if (value > 0 && value <= limit * 1) {
    opacity = 10;
  } else if (value > limit * 1 && value <= limit * 2) {
    opacity = 20;
  } else if (value > limit * 2 && value <= limit * 3) {
    opacity = 30;
  } else if (value > limit * 3 && value <= limit * 4) {
    opacity = 40;
  } else if (value > limit * 4 && value <= limit * 5) {
    opacity = 50;
  } else if (value > limit * 5 && value <= limit * 6) {
    opacity = 60;
  } else if (value > limit * 6 && value <= limit * 7) {
    opacity = 70;
  } else if (value > limit * 7 && value <= limit * 8) {
    opacity = 80;
  } else if (value > limit * 8 && value <= limit * 9) {
    opacity = 90;
  } else if (value > limit * 9 && value <= limit * 10) {
    opacity = 100;
  }
  return opacity;
};

export default getColoniesAndCellsPercentage;
