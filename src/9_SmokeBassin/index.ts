import path from "path";
import { readFile } from "../utils";
import { getLowestSmokeSpots, getMap, getRiskLevel } from "./smoke";

const smokeMap = readFile(path.resolve(__dirname, "smokeMap"));

console.log({
  // map: getMap(smokeMap),
  // lowest: getLowestSmokeSpots(smokeMap),
  riskLevel: getRiskLevel(smokeMap),
});
