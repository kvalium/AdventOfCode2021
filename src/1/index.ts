import { readFileSync } from "fs";
import path from "path";
import { countDepthChanges } from "./depth";

const INPUT_MEASURES = path.resolve(__dirname, "measures");

const getDepthMeasures = (): number[] => readFile().map((m) => parseInt(m));

const readFile = (): string[] =>
  readFileSync(INPUT_MEASURES).toString().split("\n");

const measures = getDepthMeasures();

console.log({
  part_1: countDepthChanges(measures),
  part_2: countDepthChanges(measures, 3),
});
