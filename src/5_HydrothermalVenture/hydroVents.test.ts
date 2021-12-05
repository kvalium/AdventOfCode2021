import {
  countDiagramOverlaps,
  getHorizontalVerticalVentDiagram,
  isHorizontal,
  isVertical,
  Vent,
} from "./hydroVents";
import { parseVents } from "./utils";

const fakeRawVents = [
  "0,9 -> 5,9",
  "8,0 -> 0,8",
  "9,4 -> 3,4",
  "2,2 -> 2,1",
  "7,0 -> 7,4",
  "6,4 -> 2,0",
  "0,9 -> 2,9",
  "3,4 -> 1,4",
  "0,0 -> 8,8",
  "5,5 -> 8,2",
];

const fakeVents: Vent[] = parseVents(fakeRawVents);

describe("Day 5 - Hydrothermal Venture", () => {
  it("detects horizontal vent", () => {
    expect(isHorizontal(fakeVents[0])).toBeFalsy();
    expect(isHorizontal(fakeVents[3])).toBeTruthy();
  });

  it("detects vertical vent", () => {
    expect(isVertical(fakeVents[0])).toBeTruthy();
    expect(isVertical(fakeVents[3])).toBeFalsy();
  });

  it("retrieves horizontal and vertical vents diagram", () => {
    expect(getHorizontalVerticalVentDiagram(fakeVents)).toEqual({
      x0y9: 2,
      x1y4: 1,
      x1y9: 2,
      x2y1: 1,
      x2y2: 1,
      x2y4: 1,
      x2y9: 2,
      x3y4: 2,
      x3y9: 1,
      x4y4: 1,
      x4y9: 1,
      x5y4: 1,
      x5y9: 1,
      x6y4: 1,
      x7y0: 1,
      x7y1: 1,
      x7y2: 1,
      x7y3: 1,
      x7y4: 2,
      x8y4: 1,
      x9y4: 1,
    });
  });

  it("count overlapping points", () => {
    expect(
      countDiagramOverlaps(getHorizontalVerticalVentDiagram(fakeVents))
    ).toEqual(5);
  });
});
