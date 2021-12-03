export const countDepthChanges = (measures: number[], window = 1) => {
  const windows =
    window === 1
      ? measures
      : measures.map((_m, i) => getWindow(measures, i, window));

  let counter = 0;
  windows.forEach((d, i) => windows[i - 1] < d && counter++);

  return counter;
};

const getWindow = (a: number[], i = 1, size = 1) => {
  let x = 0,
    r = 0;
  while (x < size) {
    if (i + x > a.length) return r;
    r += a[i + x];
    x++;
  }
  return r;
};
