import path from "path";
import { readFile } from "../utils";
import { getConfuseDestination, getRealDestination } from "./dive";

const directions = readFile(path.resolve(__dirname, "route"));

const { x: part1X, y: part1Y } = getConfuseDestination(directions);
const { x: part2X, y: part2Y } = getRealDestination(directions);

console.log({
  part_1: part1X * part1Y,
  part_2: part2X * part2Y,
});
