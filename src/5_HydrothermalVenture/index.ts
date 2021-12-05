import path from "path";
import { readFile } from "../utils";
import {
  countDiagramOverlaps,
  getHorizontalVerticalVentDiagram,
} from "./hydroVents";
import { parseVents } from "./utils";

const vents = parseVents(readFile(path.resolve(__dirname, "vents")));

const horizontalOrVerticalOverlaps = countDiagramOverlaps(
  getHorizontalVerticalVentDiagram(vents)
);

console.log({
  horizontalOrVerticalOverlaps,
});
