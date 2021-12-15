export type Input = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type Output = [string, string, string, string];

export type Sensor = {
  input: Input;
  output: Output;
};

export const parseInput = (raw: string[] = []): Sensor[] =>
  raw.map((r) => {
    const [input, output] = r.split(" | ").map((s) => s.split(" "));
    if (!isValidInput(input) || !isValidOutput(output)) {
      throw new Error("Invalid string provided: cannot parse.");
    }
    return {
      input,
      output,
    };
  });

const isValidInput = (s: string[]): s is Input => s.length === 10;
const isValidOutput = (s: string[]): s is Output => s.length === 4;
