import path from "path";
import { readFile } from "../utils";
import { countDigits } from "./segment";
import { parseInput } from "./utils";

const sensors = parseInput(readFile(path.resolve(__dirname, "input")));

const easyDigitsCount = countDigits(sensors);

console.log({
  easyDigitsCount,
});
