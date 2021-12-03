import path from "path";
import { readFile } from "../utils";
import { countDepthChanges } from "./depth";

const measures = readFile(path.resolve(__dirname, "measures")).map((m) =>
  parseInt(m)
);

console.log({
  part_1: countDepthChanges(measures),
  part_2: countDepthChanges(measures, 3),
});
