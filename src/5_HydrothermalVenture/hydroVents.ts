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

export const updateDiagramForDiagonal = (
  ventDiagram: Diagram,
  vent: Vent
): Diagram => {
  const diffDiag: Diagram = {};

  // POSx -> POSy
  if (vent.start.x < vent.end.x && vent.start.y < vent.end.y) {
    let w = vent.start.x,
      z = vent.start.y;
    while (w <= vent.end.x) {
      const key = "x" + w + "y" + z;
      diffDiag[key] = ventDiagram[key] + 1 || 1;
      w++;
      z++;
    }
    return diffDiag;
  }

  // NEGx -> NEGy
  if (vent.start.x > vent.end.x && vent.start.y > vent.end.y) {
    let w = vent.end.x,
      z = vent.end.y;
    while (w <= vent.start.x) {
      const key = "x" + w + "y" + z;
      diffDiag[key] = ventDiagram[key] + 1 || 1;
      w++;
      z++;
    }
    return diffDiag;
  }

  // POSx -> NEGy
  if (vent.start.x > vent.end.x && vent.start.y < vent.end.y) {
    let w = vent.start.y,
      z = vent.start.x;
    while (w <= vent.end.y) {
      const key = "x" + z + "y" + w;
      diffDiag[key] = ventDiagram[key] + 1 || 1;
      w++;
      z--;
    }
    return diffDiag;
  }

  // if (vent.start.x < vent.end.x && vent.start.y > vent.end.y) {
  let w = vent.start.x,
    z = vent.start.y;
  while (w <= vent.end.x) {
    const key = "x" + w + "y" + z;
    diffDiag[key] = ventDiagram[key] + 1 || 1;
    w++;
    z--;
  }
  return diffDiag;
  // }
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
