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

export const getLifeSupportRating = (diagnostic: string[]): number => {
  const O2 = calculateO2Generator(diagnostic);
  const CO2 = calculateCO2Generator(diagnostic);
  return O2 * CO2;
};

const reduceDiagnostic =
  (filter: (c: BitCounter[], pos: number) => string) =>
  (diagnostic: string[], pos = 0, mask = ""): any => {
    const binaryPositions = getBinaryPositions(diagnostic);
    const bitFilter = filter(binaryPositions, pos);
    const newMask = mask + bitFilter;
    const filteredDiag = diagnostic.filter((d) => d.startsWith(newMask));
    if (filteredDiag.length === 1) return parseInt(filteredDiag[0], 2);
    return reduceDiagnostic(filter)(filteredDiag, pos + 1, newMask);
  };

const calculateO2Generator = reduceDiagnostic((c, pos) =>
  c[pos][1].length >= c[pos][0].length ? "1" : "0"
);

const calculateCO2Generator = reduceDiagnostic((c, pos) =>
  c[pos][1].length < c[pos][0].length ? "1" : "0"
);

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

const getBinaryPositions = (diagnostic: string[]): BitCounter[] => {
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
