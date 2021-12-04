import path from "path";
import { readFile } from "../utils";
import { playBingo } from "./bingo";
import { getBingoSetFromString } from "./utils";

const { pickedNumbers, grids } = getBingoSetFromString(
  readFile(path.resolve(__dirname, "bingoSet"))
);

const winners = playBingo(grids, pickedNumbers);

console.log({
  firstWinnerScore: winners[0].score,
  lastWinnerScore: winners[winners.length - 1].score,
});
