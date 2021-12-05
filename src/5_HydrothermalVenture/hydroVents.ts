type Position = { x: number; y: number };

export type Vent = {
  start: Position;
  end: Position;
};

export const isHorizontal = (vent: Vent): boolean =>
  vent.start.x === vent.end.x;
