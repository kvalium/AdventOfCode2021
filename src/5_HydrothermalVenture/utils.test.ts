import { parseVents } from "./utils";

const rawVents = ["0,9 -> 5,9", "8,0 -> 0,8", "9,4 -> 3,4"];

it("parse vent as expected", () => {
  expect(parseVents(rawVents)).toEqual([
    { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
    { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } },
    { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
  ]);
});
