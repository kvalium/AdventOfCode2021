type Bit = "0" | "1";

export const getPowerConsumption = (diagnostic: string[] = []): number => {
  if (diagnostic.length === 0) return 0;
  let bitPosition = 0;
  let gamma = "",
    epsilon = "";
  while (bitPosition < diagnostic[0].length) {
    let bitCounter = { "1": 0, "0": 0 };
    for (const bin of diagnostic) {
      const bit = bin.charAt(bitPosition);
      if (!isBit(bit)) {
        throw new Error(`unexpected bit encountered: "${bit}"`);
      }
      bitCounter[bit]++;
    }
    if (bitCounter["0"] > bitCounter["1"]) {
      gamma += "0";
      epsilon += "1";
    } else {
      gamma += "1";
      epsilon += "0";
    }
    bitPosition++;
  }
  return getPowerFromGammaAndEpsilon(gamma, epsilon);
};

const isBit = (s: string): s is Bit => s === "0" || s === "1";

const getPowerFromGammaAndEpsilon = (gamma: string, epsilon: string) =>
  parseInt(gamma, 2) * parseInt(epsilon, 2);
