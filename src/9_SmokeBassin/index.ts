import path from "path";
import { readFile } from "../utils";
import { get3LargestBasinSizes, getRiskLevel } from "./smoke";

const smokeMap = readFile(path.resolve(__dirname, "smokeMap"));
const largestBassins = get3LargestBasinSizes(smokeMap);
console.log({
  riskLevel: getRiskLevel(smokeMap),
  threeSize: largestBassins.reduce((s, b) => s * b, 1),
});
