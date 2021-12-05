import { isHorizontal, Vent } from "./hydroVents";
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
});
