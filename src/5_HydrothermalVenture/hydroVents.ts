type Position = { x: number; y: number };

export type Vent = {
  start: Position;
  end: Position;
};

type Diagram = Record<string, number>;

export const getVentDiagram = (
  vents: Vent[],
  onlyHorizontalOrVertical = false
): Diagram =>
  vents.reduce(
    (ventDiagram, v) => ({
      ...ventDiagram,
      ...handleVent(ventDiagram, v, onlyHorizontalOrVertical),
    }),
    {} as Diagram
  );

const handleVent = (
  diag: Diagram,
  vent: Vent,
  onlyHorizontalOrVertical = false
): Diagram => {
  if (isHorizontal(vent)) {
    return updateDiagramForHorizontalOrVertical(diag, vent);
  }
  if (isVertical(vent)) {
    return updateDiagramForHorizontalOrVertical(diag, vent, false);
  }
  if (onlyHorizontalOrVertical) return diag;
  return updateDiagramForDiagonal(diag, vent);
};

const increment = (n: number) => n + 1;
const decrement = (n: number) => n - 1;

export const updateDiagramForDiagonal = (
  ventDiagram: Diagram,
  vent: Vent
): Diagram => {
  const diffDiag: Diagram = {};

  if (vent.start.x < vent.end.x && vent.start.y < vent.end.y) {
    const { x, y } = vent.start,
      to = vent.end.x;
    return updateDiag(ventDiagram, diffDiag, x, to, y, increment, increment);
  }

  // NEGx -> NEGy
  if (vent.start.x > vent.end.x && vent.start.y > vent.end.y) {
    const { x, y } = vent.end,
      to = vent.start.x;
    return updateDiag(ventDiagram, diffDiag, x, to, y, increment, increment);
  }

  // POSx -> NEGy
  if (vent.start.x > vent.end.x && vent.start.y < vent.end.y) {
    return updateDiag(
      ventDiagram,
      diffDiag,
      vent.start.y,
      vent.end.y,
      vent.start.x,
      increment,
      decrement
    );
  }

  // NEGx -> POSy
  const { x, y } = vent.start,
    to = vent.end.x;
  return updateDiag(ventDiagram, diffDiag, x, to, y, increment, decrement);
};

const updateDiag = (
  ventDiagram: Diagram,
  diffDiag: Diagram,
  x: number,
  to: number,
  y: number,
  wLoop: (x: number) => number,
  zLoop: (x: number) => number
): Diagram => {
  while (x <= to) {
    const key = "x" + x + "y" + y;
    diffDiag[key] = ventDiagram[key] + 1 || 1;
    x = wLoop(x);
    y = zLoop(y);
  }
  return diffDiag;
};

const updateDiagramForHorizontalOrVertical = (
  ventDiagram: Diagram,
  vent: Vent,
  isHorizontal = true
): Diagram => {
  const diffDiag: Diagram = {};
  const [axis, cAxis]: ("x" | "y")[] = isHorizontal ? ["x", "y"] : ["y", "x"];
  const diagramKey = axis + vent.start[axis];

  const [from, to] = getVentDirection(vent, cAxis);
  let w = vent[from][cAxis];

  while (w <= vent[to][cAxis]) {
    const key = isHorizontal ? diagramKey + "y" + w : "x" + w + diagramKey;
    diffDiag[key] = ventDiagram[key] + 1 || 1;
    w++;
  }
  return diffDiag;
};

const getVentDirection = (vent: Vent, axis: "x" | "y"): ("start" | "end")[] =>
  vent.start[axis] > vent.end[axis] ? ["end", "start"] : ["start", "end"];

export const countDiagramOverlaps = (diagram: Diagram): number =>
  Object.values(diagram).filter((d) => d >= 2).length;

export const isHorizontal = (vent: Vent): boolean =>
  vent.start.x === vent.end.x;

export const isVertical = (vent: Vent): boolean => vent.start.y === vent.end.y;
