const findLowestFuelConsumption =
  (consumptionReducer: (c: number[], pos: number) => number) =>
  (crabs: number[]): { position: number; fuelUnits: number } => {
    let lowest = Infinity;
    for (let i = 0; i < Math.max(...crabs) * crabs.length; i++) {
      const fuelToBurn = consumptionReducer(crabs, i);
      if (fuelToBurn > lowest) {
        return { position: i - 1, fuelUnits: lowest };
      }
      lowest = fuelToBurn;
    }
    throw new Error("unable to determine position or fuel consumption");
  };

const linearFuelConsumptionToPosition = (crabs: number[], pos: number) =>
  crabs.reduce((sum, c) => sum + Math.abs(c - pos), 0);

export const findLinearFuelConsumption = findLowestFuelConsumption(
  linearFuelConsumptionToPosition
);
