import { Vent } from "./hydroVents";

export const parseVents = (rawVents: string[]): Vent[] => {
  const vents = [];
  for (const r of rawVents) {
    const [start, end] = r.split(" -> ");
    const [x1, y1] = start.split(",").map((s) => parseInt(s));
    const [x2, y2] = end.split(",").map((s) => parseInt(s));
    vents.push({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 } });
  }
  return vents;
};
