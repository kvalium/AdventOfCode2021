import path from "path";
import { readFile } from "../utils";
import { countDiagramOverlaps, getVentDiagram } from "./hydroVents";
import { parseVents } from "./utils";

const vents = parseVents(readFile(path.resolve(__dirname, "vents")));

const horizontalOrVerticalOverlaps = countDiagramOverlaps(
  getVentDiagram(vents, true)
);

const allOverlaps = countDiagramOverlaps(getVentDiagram(vents));

console.log({
  horizontalOrVerticalOverlaps,
  allOverlaps,
});
