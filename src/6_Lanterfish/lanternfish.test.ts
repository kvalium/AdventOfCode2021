import { LanterfishSwarm } from "./Swarm";

const fakeSwarm = [3, 4, 3, 1, 2];

describe("Day 6 - Lanterfish", () => {
  it("returns expected swarm after 18 days", () => {
    const s = new LanterfishSwarm(fakeSwarm);
    s.addDays(18);
    expect(s.count()).toEqual(26);
  });
  it("returns expected swarm after 80 days", () => {
    const s = new LanterfishSwarm(fakeSwarm);
    s.addDays(80);
    expect(s.count()).toEqual(5934);
  });
  it("returns expected swarm after 256 days", () => {
    const s = new LanterfishSwarm(fakeSwarm);
    s.addDays(256);
    expect(s.count()).toEqual(26_984_457_539);
  });
});
