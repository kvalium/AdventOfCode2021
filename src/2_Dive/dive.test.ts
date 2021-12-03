import { getConfuseDestination, getRealDestination } from "./dive";

describe("Day 2 - Dive!", () => {
  const fakeRoute = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2",
  ];

  describe("Part 1 - Confuse direction", () => {
    it("returns expected position", () => {
      expect(getConfuseDestination(fakeRoute)).toEqual(
        expect.objectContaining({ x: 15, y: 10 })
      );
    });

    it("throws on invalid direction", () => {
      const route = ["forward 5", "downward 10"];
      expect(() => getConfuseDestination(route)).toThrowError(
        'unknown direction "downward"'
      );
    });

    it("returns initial position on empty input", () => {
      expect(getConfuseDestination()).toEqual(
        expect.objectContaining({ x: 0, y: 0 })
      );
    });
  });

  describe("Part 2 - real position", () => {
    it("returns expected position", () => {
      expect(getRealDestination(fakeRoute)).toEqual(
        expect.objectContaining({ x: 15, y: 60 })
      );
    });
  });
});
