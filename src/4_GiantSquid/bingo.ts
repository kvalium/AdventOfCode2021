export type BingoGrid = number[][];

type NumberCoords = { x: number; y: number };
type GridNumberCoords = Record<number, NumberCoords>;
type GridScore = Record<string, number>;
type Leaderboard = Record<number, GridScore>;

export const playBingo = (bingoGrids: BingoGrid[], pickedNumbers: number[]) => {
  const gridsCoords = bingoGrids.map((g) => getBingoGridCoords(g));

  let leaderboard: Leaderboard = {};
  const winners: { gridNo: number; score: number }[] = [];
  const drawnNumbers: number[] = [];

  for (const pick of pickedNumbers) {
    drawnNumbers.push(pick);
    gridsCoords.forEach((g, gridNo) => {
      if (!g[pick]) return;
      const { newLeaderboard, rowScore, colScore } = updateLeaderboard(
        leaderboard,
        gridNo,
        g[pick]
      );
      leaderboard = newLeaderboard;
      if (rowScore === 5 || colScore === 5) {
        if (!winners.map(({ gridNo }) => gridNo).includes(gridNo)) {
          winners.push({
            gridNo,
            score: calculateWinnerScore(bingoGrids[gridNo], drawnNumbers),
          });
        }
      }
    });
  }

  if (winners.length === 0) {
    throw new Error("Nobody won :(");
  }

  return winners;
};

export const calculateWinnerScore = (
  grid: BingoGrid,
  drawnNumbers: number[]
): number =>
  grid
    .flat()
    .filter((g) => !drawnNumbers.includes(g))
    .reduce((sum, u) => sum + u) * drawnNumbers[drawnNumbers.length - 1];

const updateLeaderboard = (
  leaderboard: Leaderboard,
  gridNo: number,
  { x, y }: NumberCoords
): {
  newLeaderboard: Leaderboard;
  rowScore: number;
  colScore: number;
} => {
  const scoreKeys = ["x" + x, "y" + y];
  if (!leaderboard[gridNo]) {
    leaderboard[gridNo] = scoreKeys.reduce((s, k) => ({ ...s, [k]: 1 }), {});
    return { newLeaderboard: leaderboard, rowScore: 1, colScore: 1 };
  }

  const [xScore, yScore] = scoreKeys;

  const currentXScore = leaderboard[gridNo]?.[xScore] || 0;
  const currentYScore = leaderboard[gridNo]?.[yScore] || 0;

  const newXScore = currentXScore + 1;
  const newYScore = currentYScore + 1;

  leaderboard[gridNo] = {
    ...leaderboard[gridNo],
    [xScore]: newXScore,
    [yScore]: newYScore,
  };

  return {
    newLeaderboard: leaderboard,
    rowScore: newXScore,
    colScore: newYScore,
  };
};

// get position (x,y) of each bingo grid number
const getBingoGridCoords = (grid: BingoGrid): GridNumberCoords =>
  grid.flat().reduce(
    (gridCoords, n, i) => ({
      ...gridCoords,
      [n]: {
        x: i % 5,
        y: Math.floor(i / 5),
      },
    }),
    {}
  );
