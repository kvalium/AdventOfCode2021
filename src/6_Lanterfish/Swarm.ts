export type Swarm = number[];

export class LanterfishSwarm {
  private counter: any[];

  constructor(swarm: Swarm) {
    const counter = new Array(9).fill(0);
    swarm.forEach((x) => counter[x]++);
    this.counter = counter;
  }

  count = () => this.counter.reduce((sum, c) => sum + c);

  addDays = (days: number) => {
    const counter = this.counter;

    for (let d = 0; d < days; d++) {
      const newBornsOrNewCycle = counter[0];
      counter[0] = counter[1];
      counter[1] = counter[2];
      counter[2] = counter[3];
      counter[3] = counter[4];
      counter[4] = counter[5];
      counter[5] = counter[6];
      counter[6] = counter[7] + newBornsOrNewCycle;
      counter[7] = counter[8];
      counter[8] = newBornsOrNewCycle;
    }
  };
}
