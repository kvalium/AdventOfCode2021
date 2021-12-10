import { Sensor } from "./utils";

export const isTwo = (s: string) => stringHasLength(s, 2);
export const isFour = (s: string) => stringHasLength(s, 4);
export const isSeven = (s: string) => stringHasLength(s, 3);
export const isEight = (s: string) => stringHasLength(s, 7);

const stringHasLength = (s: string, n: number) => s.length === n;

export const countDigits = (sensors: Sensor[]): number => {
  const l: Record<number, number> = {
    2: 2,
    3: 7,
    4: 4,
    7: 8,
  };
  let count = 0;
  for (const { output } of sensors) {
    output.forEach((d) => {
      const len = d.length;
      if (l[len]) count++;
    });
  }
  return count;
};
