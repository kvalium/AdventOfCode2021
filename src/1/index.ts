import * as fs from "fs";

const INPUT_MEASURES = `${__dirname}/input`;

type ChangeType = "inc" | "dec";
type DepthChangesCounter = {
  [t in ChangeType]: number;
};

const countDepthChanges = (measureWindow = 1) => {
  const measures = getDepthMeasures();

  const windows =
    measureWindow === 1
      ? measures
      : measures.map((_m, i) => getWindow(measures, i, measureWindow));

  let counter = 0;
  windows.forEach((d, i) => windows[i - 1] < d && counter++);

  return counter;
};

const getWindow = (a: number[], i = 1, size = 1) => {
  if (size === 1) return a[i];
  let x = 0,
    r = 0;
  while (x < size) {
    if (i + x > a.length) return r;
    r += a[i + x];
    x++;
  }
  return r;
};

const getDepthMeasures = (): number[] => readFile().map((m) => parseInt(m));

const readFile = (): string[] =>
  fs.readFileSync(INPUT_MEASURES).toString().split("\n");

console.log({ window1: countDepthChanges(), window3: countDepthChanges(3) });
