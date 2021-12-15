import path from "path";
import { readFile } from "../utils";
import { countDigits, getSensorValue } from "./segment";
import { parseInput } from "./utils";

const sensors = parseInput(readFile(path.resolve(__dirname, "input")));

const easyDigitsCount = countDigits(sensors);
const totalOfSensorValues = sensors.reduce(
  (acc, s) => acc + getSensorValue(s),
  0
);

console.log({
  easyDigitsCount,
  totalOfSensorValues,
});
