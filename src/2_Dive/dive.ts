import {
  confusePositionModifier,
  Modifier,
  realPositionModifier,
} from "./modifiers";

export type Position = {
  x: number;
  y: number;
  aim: number;
};

const DIRECTIONS = ["forward", "up", "down"] as const;
export type Direction = typeof DIRECTIONS[number];

const INITIAL_POSITION: Position = { x: 0, y: 0, aim: 0 };

export const getConfuseDestination = (route: string[] = []): Position =>
  getDestinationByModifier(route, confusePositionModifier);

export const getRealDestination = (route: string[] = []): Position =>
  getDestinationByModifier(route, realPositionModifier);

const getDestinationByModifier = (
  route: string[] = [],
  modifier: Modifier
): Position =>
  route.reduce((pos, r) => {
    const [direction, amount] = r.split(" ");
    if (!isDirection(direction)) {
      throw new Error(`unknown direction "${direction}"`);
    }
    return modifier[direction](pos, parseInt(amount));
  }, INITIAL_POSITION);

const isDirection = (d: string): d is Direction =>
  DIRECTIONS.includes(d as Direction);
