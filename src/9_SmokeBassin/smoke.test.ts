import {
  get3LargestBasinSizes,
  getBasinSize,
  getLowestSmokeSpots,
  getMap,
  getRiskLevel,
} from "./smoke";

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

  it("returns bassin size", () => {
    const map = getMap(smokeMap);
    const [topLeft, topRight, middle, bottomRight] =
      getLowestSmokeSpots(smokeMap);
    expect(getBasinSize(map, topLeft)).toEqual(3);
    expect(getBasinSize(map, topRight)).toEqual(9);
    expect(getBasinSize(map, middle)).toEqual(14);
    expect(getBasinSize(map, bottomRight)).toEqual(9);
  });

  it("returns 3 largest bassin sizes", () => {
    const bassinSizes = get3LargestBasinSizes(smokeMap);
    expect(bassinSizes).toEqual([14, 9, 9]);
    expect(bassinSizes.reduce((s, b) => s * b, 1)).toEqual(1134);
  });
});
