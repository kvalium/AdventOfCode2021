import { getPowerConsumption } from "./diagnostic";

const fakeDiagnostic = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

describe("Day 3 - Binary Diagnostic", () => {
  describe("Part 1 - Power consumption", () => {
    it("return expected power consumption", () => {
      expect(getPowerConsumption(fakeDiagnostic)).toEqual(198);
    });

    it("return zero power consumption on empty diagnostic", () => {
      expect(getPowerConsumption()).toEqual(0);
    });

    it("throws on invalid bit encountered", () => {
      expect(() => getPowerConsumption(["0109"])).toThrowError(
        'unexpected bit encountered: "9"'
      );
    });
  });
});
