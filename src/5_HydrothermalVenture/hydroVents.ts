type Position = { x: number; y: number };

export type Vent = {
  start: Position;
  end: Position;
};

type Diagram = Record<string, number>;

export const getHorizontalVerticalVentDiagram = (vents: Vent[]): Diagram =>
  vents.reduce(
    (ventDiagram, v) => ({ ...ventDiagram, ...handleVent(ventDiagram, v) }),
    {}
  );

const handleVent = (diag: Diagram, vent: Vent): Diagram | undefined => {
  if (isHorizontal(vent)) {
    return updateDiagramForHorizontalOrVertical(diag, vent);
  }
  if (isVertical(vent)) {
    return updateDiagramForHorizontalOrVertical(diag, vent, false);
  }
  // TODO handle diagonals
  return diag;
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
