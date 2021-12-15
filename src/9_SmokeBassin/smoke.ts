export type SmokeMap = number[][];
export type SmokeSpot = { x: number; y: number; value: number };

export const getRiskLevel = (smokeMap: string[]): number =>
  getLowestSmokeSpots(smokeMap).reduce((sum, s) => sum + s.value + 1, 0);

export const getLowestSmokeSpots = (smokeMap: string[]): SmokeSpot[] => {
  const map = getMap(smokeMap);
  let lowestSpots: SmokeSpot[] = [];
  map.forEach((row, x) => {
    row.forEach((_c, y) => {
      const currentSpot = map[x][y];
      const neighbors = getNeighbors(map, x, y);
      if (neighbors.some((n) => n.value <= currentSpot)) return;
      lowestSpots.push({ x, y, value: currentSpot });
    });
  });
  return lowestSpots;
};

export const get3LargestBasinSizes = (smokeMap: string[]): number[] => {
  const map = getMap(smokeMap);
  return getLowestSmokeSpots(smokeMap)
    .map((s, i) => {
      const size = getBasinSize(map, s);
      console.log({ i, size });
      return size;
    })
    .sort((a, b) => b - a)
    .slice(0, 3);
};

export const getBasinSize = (map: SmokeMap, spot: SmokeSpot) =>
  Object.keys(getBasinMembers(map, spot)).length + 1;

export const getBasinMembers = (
  map: SmokeMap,
  spot: SmokeSpot,
  inBasin: Record<string, string> = {}
): any => {
  const basinNeighbors = getNeighbors(map, spot.x, spot.y).filter(
    (s) =>
      s.value >= spot.value && s.value < 9 && !inBasin[`row${s.x}col${s.y}`]
  );

  const newInBassin = {
    ...inBasin,
    ...basinNeighbors.reduce(
      (acc, s) => ({ ...acc, [`row${s.x}col${s.y}`]: true }),
      {}
    ),
  };

  return basinNeighbors.reduce(
    (subInBas, n) => ({
      ...subInBas,
      ...getBasinMembers(map, n, newInBassin),
    }),
    newInBassin
  );
};

export const getNeighbors = (
  map: SmokeMap,
  x: number,
  y: number
): SmokeSpot[] => {
  const neighbors: SmokeSpot[] = [];
  if (x > 0) neighbors.push({ x: x - 1, y, value: map[x - 1][y] });
  if (x < map.length - 1) neighbors.push({ x: x + 1, y, value: map[x + 1][y] });
  if (y > 0) neighbors.push({ x, y: y - 1, value: map[x][y - 1] });
  if (y < map[x].length - 1)
    neighbors.push({ x, y: y + 1, value: map[x][y + 1] });
  return neighbors;
};

export const getMap = (smokeRawMap: string[]): SmokeMap =>
  smokeRawMap.map((row, i) => row.split("").map((s) => parseInt(s)));
