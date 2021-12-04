import { off } from "process";

type Bit = "0" | "1";

type BitCounter = {
  [b in Bit]: [];
};

const INITIAL_BIT_POSITION: BitCounter = { "0": [], "1": [] };

export const getPowerConsumption = (diagnostic: string[] = []): number => {
  const { gamma, epsilon } = calculateGammaAndEpsilon(
    getBinaryPositions(diagnostic)
  );
  return gamma * epsilon;
};

const calculateGammaAndEpsilon = (
  binaryPositions: BitCounter[]
): { gamma: number; epsilon: number } => {
  const { gamma, epsilon } = binaryPositions.reduce(
    (acc, { 0: zeroes, 1: ones }) =>
      zeroes.length > ones.length
        ? { gamma: acc.gamma + "0", epsilon: acc.epsilon + "1" }
        : { gamma: acc.gamma + "1", epsilon: acc.epsilon + "0" },
    {
      gamma: "",
      epsilon: "",
    }
  );

  return { gamma: parseInt(gamma, 2), epsilon: parseInt(epsilon, 2) };
};

const getBinaryPositions = (diagnostic: string[] = []): BitCounter[] => {
  if (diagnostic.length === 0) {
    return [INITIAL_BIT_POSITION];
  }

  let bitPosition = 0;
  const bitPositionCounter: BitCounter[] = [];

  while (bitPosition < diagnostic[0].length) {
    let bitCounter = INITIAL_BIT_POSITION;
    for (const bin of diagnostic) {
      const bit = bin.charAt(bitPosition);
      if (!isBit(bit)) {
        throw new Error(`unexpected bit encountered: "${bit}"`);
      }
      bitCounter = { ...bitCounter, [bit]: [...bitCounter[bit], bin] };
    }
    bitPositionCounter.push(bitCounter);
    bitPosition++;
  }
  return bitPositionCounter;
};

const isBit = (s: string): s is Bit => s === "0" || s === "1";
