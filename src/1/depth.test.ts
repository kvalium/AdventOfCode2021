import { countDepthChanges } from "./depth";

describe("DAY 1 - submarine depths", () => {
  const measures = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  it("returns expected increase amount", () => {
    expect(countDepthChanges(measures)).toEqual(7);
  });

  it("returns expected increase amount on window size 3", () => {
    expect(countDepthChanges(measures, 3)).toEqual(5);
  });
});
