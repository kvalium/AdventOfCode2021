import { LanterfishSwarm } from "./Swarm";

const initialSwarm = [
  1, 1, 1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 3, 1, 5, 1, 4, 1, 5, 1, 2, 5, 1, 1, 1, 1,
  3, 1, 4, 5, 1, 1, 2, 1, 1, 1, 2, 4, 3, 2, 1, 1, 2, 1, 5, 4, 4, 1, 4, 1, 1, 1,
  4, 1, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 5, 4, 4, 2, 4, 5, 2, 1, 5, 3, 1, 3,
  3, 1, 1, 5, 4, 1, 1, 3, 5, 1, 1, 1, 4, 4, 2, 4, 1, 1, 4, 1, 1, 2, 1, 1, 1, 2,
  1, 5, 2, 5, 1, 1, 1, 4, 1, 2, 1, 1, 1, 2, 2, 1, 3, 1, 4, 4, 1, 1, 3, 1, 4, 1,
  1, 1, 2, 5, 5, 1, 4, 1, 4, 4, 1, 4, 1, 2, 4, 1, 1, 4, 1, 3, 4, 4, 1, 1, 5, 3,
  1, 1, 5, 1, 3, 4, 2, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 5, 1, 1, 1, 1,
  3, 1, 1, 5, 1, 1, 4, 1, 1, 3, 1, 1, 5, 2, 1, 4, 4, 1, 4, 1, 2, 1, 1, 1, 1, 2,
  1, 4, 1, 1, 2, 5, 1, 4, 4, 1, 1, 1, 4, 1, 1, 1, 5, 3, 1, 4, 1, 4, 1, 1, 3, 5,
  3, 5, 5, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 4, 2, 1, 1, 4, 5, 3,
  1, 1, 5, 5, 1, 1, 2, 1, 4, 1, 3, 5, 1, 1, 1, 5, 2, 2, 1, 4, 2, 1, 1, 4, 1, 3,
  1, 1, 1, 3, 1, 5, 1, 5, 1, 1, 4, 1, 2, 1,
];

const swarm = new LanterfishSwarm(initialSwarm);
// after 80 days
swarm.addDays(80);
const swarmAfter80Days = swarm.getSwarm().length;

// after 256 days
// swarm.addDays(256 - 80);
// const swarmAfter256Days = swarm.getSwarm().length;

console.log({
  swarmAfter80Days,
  // swarmAfter256Days,
});