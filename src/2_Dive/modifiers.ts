import { Position, Direction } from "./dive";

export type Modifier = {
  [k in Direction]: (...args: any[]) => Position;
};

export const confusePositionModifier: Modifier = {
  forward: (p: Position, amount: number) => ({
    ...p,
    x: p.x + amount,
  }),
  down: (p: Position, amount: number) => ({
    ...p,
    y: p.y + amount,
  }),
  up: (p: Position, amount: number) => ({
    ...p,
    y: p.y - amount,
  }),
};

export const realPositionModifier: Modifier = {
  forward: (p: Position, amount: number) => ({
    aim: p.aim,
    x: p.x + amount,
    y: p.y + p.aim * amount,
  }),
  down: (p: Position, amount: number) => ({
    ...p,
    aim: p.aim + amount,
  }),
  up: (p: Position, amount: number) => ({
    ...p,
    aim: p.aim - amount,
  }),
};
