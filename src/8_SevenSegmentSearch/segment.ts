import { join } from "path/posix";
import { Input, Sensor } from "./utils";

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

export const getSensorValue = (sensor: Sensor) => {
  const segmentsByNumber = getSegmentsByNumber(sensor);
  return parseInt(
    sensor.output
      .map((s) => segmentsByNumber[s.split("").sort().join("")])
      .join("")
  );
};

const getSegmentsByNumber = (sensor: Sensor) => {
  const sSize = getSegmentsBySize(sensor.input);
  const segmentsBySize = getSegmentsForSize(sSize);

  const segments: Record<string, string[]> = {
    1: segmentsBySize(2),
    4: segmentsBySize(4),
    7: segmentsBySize(3),
    8: segmentsBySize(7),
  };

  addSegments069(segments, sSize[6]);
  addSegments235(segments, sSize[5]);

  let segmentNumbers: Record<string, string> = {};
  for (const s of Object.keys(segments)) {
    segmentNumbers[segments[s].join("")] = s;
  }
  return segmentNumbers;
};

const addSegments235 = (
  segments: Record<number, string[]>,
  fiveSegments: string[]
) => {
  const segment2Identifier = segments[4].filter(
    (s) => !segments[7].includes(s)
  );

  for (const s5 of fiveSegments) {
    const fiveSegments = s5.split("").sort();
    if (segments[7].every((s) => fiveSegments.includes(s))) {
      segments[3] = fiveSegments;
      continue;
    }
    if (segment2Identifier.every((s) => fiveSegments.includes(s))) {
      segments[5] = fiveSegments;
      continue;
    }
    segments[2] = fiveSegments;
  }
  return segments;
};

const addSegments069 = (
  segments: Record<number, string[]>,
  sixSegments: string[]
) => {
  for (const s6 of sixSegments) {
    const sixSegments = s6.split("").sort();
    if (!segments[7].every((s) => sixSegments.includes(s))) {
      segments[6] = sixSegments;
      continue;
    }
    if (segments[4].every((s) => sixSegments.includes(s))) {
      segments[9] = sixSegments;
      continue;
    }
    segments[0] = sixSegments;
  }
  return segments;
};

export const getSegmentsBySize = (input: Input): SegmentsBySize =>
  input.reduce(
    (segDic, s) => {
      const sLen = s.length;
      if (!isValidSegment(sLen)) {
        throw new Error("invalid segment detected");
      }
      return { ...segDic, [sLen]: [...segDic[sLen], s] };
    },
    { 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] }
  );

export const getSegmentsForSize =
  (segmentsBySize: SegmentsBySize) => (segmentSize: SegmentSize) =>
    segmentsBySize[segmentSize][0].split("").sort();

const isValidSegment = (sSize: number): sSize is SegmentSize =>
  SEGMENT_SIZES.includes(sSize as SegmentSize);
