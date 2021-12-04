import path from "path";
import { readFile } from "../utils";
import { getLifeSupportRating, getPowerConsumption } from "./diagnostic";

const diagnostic = readFile(path.resolve(__dirname, "binaryDiagnostic"));
const powerConsumption = getPowerConsumption(diagnostic);
const lifeSupportRating = getLifeSupportRating(diagnostic);

console.log({
  powerConsumption,
  lifeSupportRating,
});
