// permissible values 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000

function getSizeAndWidth(ratio: number) {
  let temp = ratio;
  let size = 100;
  while (temp < 100 || temp > 250) {
    if (temp < 100) {
      if (temp >= 50) {
        temp = temp * 2;
        size = size * 2;
      } else if (temp >= 20) {
        temp = temp * 5;
        size = size * 5;
      } else if (temp >= 10) {
        temp = temp * 10;
        size = size * 10;
      } else if (temp >= 5) {
        temp = temp * 20;
        size = size * 20;
      } else if (temp >= 2) {
        temp = temp * 50;
        size = size * 50;
      } else if (temp >= 1) {
        temp = temp * 100;
        size = size * 100;
      } else if (temp >= 0.5) {
        temp = temp * 200;
        size = size * 200;
      } else {
        // very zoomed out
        temp = 100;
        break;
      }
    } else {
      if (temp <= 500) {
        temp = temp / 2;
        size = size / 2;
      } else if (temp <= 1250) {
        temp = temp / 5;
        size = size / 5;
      } else if (temp <= 2500) {
        temp = temp / 10;
        size = size / 10;
      } else if (temp <= 5000) {
        temp = temp / 20;
        size = size / 20;
      } else {
        // too much zoomed in
        temp = 100;
        break;
      }
    }
  }
  return { size, width: temp };
}

export default getSizeAndWidth;
