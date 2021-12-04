import path from "path";
import { readFile } from "../utils";
import { getPowerConsumption } from "./diagnostic";

const diagnostic = readFile(path.resolve(__dirname, "binaryDiagnostic"));
const part1PowerConsumption = getPowerConsumption(diagnostic);

console.log({
  part_1: part1PowerConsumption,
  //part_2: part2X * part2Y,
});
