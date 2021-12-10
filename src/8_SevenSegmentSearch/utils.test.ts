import { parseInput } from "./utils";

const fakeInput =
  "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf";

it("parse empty or null sensor", () => {
  expect(parseInput()).toEqual([]);
  expect(parseInput([])).toEqual([]);
});

it("parse sensor", () => {
  expect(parseInput([fakeInput])).toEqual([
    {
      input: [
        "acedgfb",
        "cdfbe",
        "gcdfa",
        "fbcad",
        "dab",
        "cefabd",
        "cdfgeb",
        "eafb",
        "cagedb",
        "ab",
      ],
      output: ["cdfeb", "fcadb", "cdfeb", "cdbaf"],
    },
  ]);
});

it("throws on invalid error", () => {
  const invalidInput =
    "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb ab | cdfeb fcadb cdfeb cdbaf";

  expect(() => parseInput([invalidInput])).toThrowError(
    "Invalid string provided: cannot parse."
  );
});
