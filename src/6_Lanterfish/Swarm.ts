export type Swarm = number[];

export class LanterfishSwarm {
  FIRST_CYCLE_ADDITIONAL_DAYS = 2;
  FISH_CYCLE_DAYS = 6;

  swarm: Swarm;
  constructor(swarm: Swarm) {
    this.swarm = swarm;
  }

  getSwarm = () => this.swarm;
  setSwarm = (s: Swarm) => {
    this.swarm = s;
  };

  addDays = (days: number) => {
    for (let i = 0; i < days; i++) {
      this.addDay();
    }
  };

  addDay = () => {
    let children = 0;
    const tomorrowActualSwarm = this.swarm.map((s) => {
      if (s === 0) {
        children++;
        return this.FISH_CYCLE_DAYS;
      }
      return s - 1;
    });

    this.setSwarm(
      tomorrowActualSwarm.concat(
        new Array(children).fill(
          this.FISH_CYCLE_DAYS + this.FIRST_CYCLE_ADDITIONAL_DAYS
        )
      )
    );
  };
}
