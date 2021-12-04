import { playBingo } from "./bingo";
import { expectedBingoSet } from "./utils.test";

describe("Day 4 - Giant Squid", () => {
  it("build expected grid coords", () => {
    const { grids, pickedNumbers } = expectedBingoSet;
    expect(playBingo(grids, pickedNumbers)).toEqual([
      { gridNo: 2, score: 4512 },
      { gridNo: 0, score: 2192 },
      { gridNo: 1, score: 1924 },
    ]);
  });

  it("throws if nobody won", () => {
    const { grids } = expectedBingoSet;
    expect(() => playBingo(grids, [999])).toThrowError("Nobody won :(");
  });
});
