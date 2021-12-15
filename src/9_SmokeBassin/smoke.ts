export type SmokeMap = number[][];
export type SmokeSpot = { x: number; y: number; value: number };

export const getRiskLevel = (smokeMap: string[]): number =>
  getLowestSmokeSpots(smokeMap).reduce((sum, s) => sum + s.value + 1, 0);

export const getLowestSmokeSpots = (smokeMap: string[]): SmokeSpot[] => {
  const map = getMap(smokeMap);
  let lowestSpots: SmokeSpot[] = [];
  map.forEach((row, x) => {
    row.forEach((_c, y) => {
      const neighbors = getNeighbors(map, x, y);
      if (neighbors.some((n) => n <= map[x][y])) return;
      lowestSpots.push({ x, y, value: map[x][y] });
    });
  });
  return lowestSpots;
};

export const getNeighbors = (map: SmokeMap, x: number, y: number) => {
  const neighbors = [];
  if (x > 0) neighbors.push(map[x - 1][y]);
  if (x < map.length - 1) neighbors.push(map[x + 1][y]);
  if (y > 0) neighbors.push(map[x][y - 1]);
  if (y < map[x].length - 1) neighbors.push(map[x][y + 1]);
  return neighbors;
};

export const getMap = (smokeRawMap: string[]): SmokeMap =>
  smokeRawMap.map((row, i) => row.split("").map((s) => parseInt(s)));
