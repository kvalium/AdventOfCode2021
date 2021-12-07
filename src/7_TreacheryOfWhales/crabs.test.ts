import {
  findIncreasingFuelConsumption,
  // findIncreasingFuelConsumption,
  findLinearFuelConsumption,
} from "./crabs";

const fakeCrabs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

describe("Day 7 - Treachery of whales", () => {
  describe("Linear fuel consumption", () => {
    it("get the lowest amount and position of needed fuel", () => {
      expect(findLinearFuelConsumption(fakeCrabs)).toEqual({
        position: 2,
        fuelUnits: 37,
      });
    });
  });

  describe("Increasing fuel consumption", () => {
    it("get the lowest amount and position of needed fuel", () => {
      expect(findIncreasingFuelConsumption(fakeCrabs)).toEqual({
        position: 5,
        fuelUnits: 168,
      });
    });
  });
});
