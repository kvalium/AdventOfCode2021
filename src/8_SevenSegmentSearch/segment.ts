import { Sensor } from "./utils";

type Segment = string;
const SEGMENT_SIZES = [2, 3, 4, 5, 6, 7] as const;
export type SegmentSize = typeof SEGMENT_SIZES[number];
type SegmentsBySize = {
  [sSize in SegmentSize]: Segment[];
};

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

export const getSegmentsBySize = (sensor: Sensor): SegmentsBySize =>
  sensor.input.reduce(
    (segDic, s) => {
      const sLen = s.length;
      if (!isValidSegment(sLen)) {
        throw new Error("invalid segment detected");
      }
      return { ...segDic, [sLen]: [...segDic[sLen], s] };
    },
    { 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] }
  );

export const getSegmentsForSize = (
  segmentsBySize: SegmentsBySize,
  segmentSize: SegmentSize
) => segmentsBySize[segmentSize][0].split("");

const isValidSegment = (sSize: number): sSize is SegmentSize =>
  SEGMENT_SIZES.includes(sSize as SegmentSize);
