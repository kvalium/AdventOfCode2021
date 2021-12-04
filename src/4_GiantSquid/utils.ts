import { BingoGrid } from "./bingo";

export const getBingoSetFromString = (
  input: string[]
): { pickedNumbers: number[]; grids: BingoGrid[] } => {
  const [pick, ...rawGrids] = input.filter((s) => s !== "");

  const grids: BingoGrid[] = [];
  let currentGrid: BingoGrid = [];
  rawGrids.forEach((l, i) => {
    if (i > 0 && i % 5 === 0) {
      grids.push(currentGrid);
      currentGrid = [];
    }
    currentGrid.push(sanitizeBingoRow(l));
  });

  grids.push(currentGrid);

  return {
    pickedNumbers: pick.split(",").map((s) => parseInt(s)),
    grids,
  };
};

const sanitizeBingoRow = (l: string) =>
  l
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((s) => parseInt(s.trim()));
