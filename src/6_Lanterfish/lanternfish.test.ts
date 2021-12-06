import { LanterfishSwarm } from "./Swarm";

const fakeSwarm = [3, 4, 3, 1, 2];

describe("Day 6 - Lanterfish", () => {
  it("generates a new fish", () => {
    const s = new LanterfishSwarm([2]);
    s.addDays(3);
    expect(s.getSwarm()).toEqual([6, 8]);
  });

  it("returns expected swarm after", () => {
    const s = new LanterfishSwarm(fakeSwarm);
    s.addDays(18);
    expect(s.getSwarm().length).toEqual(26);
    s.addDays(80 - 18);
    expect(s.getSwarm().length).toEqual(5934);
  });
});
