import { getLowestSmokeSpots, getMap, getRiskLevel } from "./smoke";

const smokeMap = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

describe("Day 9 - Smoke bassin", () => {
  it("generates smoke map", () => {
    expect(getMap(smokeMap)).toEqual([
      [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
      [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
      [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
      [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
      [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ]);
  });

  it("returns lowest points", () => {
    expect(getLowestSmokeSpots(smokeMap)).toEqual([
      { value: 1, x: 0, y: 1 },
      { value: 0, x: 0, y: 9 },
      { value: 5, x: 2, y: 2 },
      { value: 5, x: 4, y: 6 },
    ]);
  });

  it("returns risk level", () => {
    expect(getRiskLevel(smokeMap)).toEqual(15);
  });
});
