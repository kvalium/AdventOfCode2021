import { countDigits, getSegmentsBySize, getSensorValue } from "./segment";
import { parseInput, Sensor } from "./utils";

const fakeInput = [
  "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
  "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
  "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
  "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
  "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
  "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
  "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
  "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
  "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
  "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
];

const fakeSensors = parseInput(fakeInput);

describe("Day 8 - Seven Segment Search", () => {
  describe("Count easy digits", () => {
    it("get the lowest amount and position of needed fuel", () => {
      expect(countDigits(fakeSensors)).toEqual(26);
    });
  });

  describe("Segment size", () => {
    const segmentsBySize = getSegmentsBySize(fakeSensors[0].input);

    it("returns expected segments by size", () => {
      expect(segmentsBySize).toEqual({
        2: ["be"],
        3: ["edb"],
        4: ["cgeb"],
        5: ["fdcge", "fecdb", "fabcd"],
        6: ["cbdgef", "fgaecd", "agebfd"],
        7: ["cfbegad"],
      });
    });

    it("throws on invalid segment detected", () => {
      const invalidSensor: Sensor = {
        input: [
          "acedgfbxxx", // <- segment size overflow
          "cdfbe",
          "gcdfa",
          "fbcad",
          "dab",
          "cefabd",
          "cdfgeb",
          "eafb",
          "cagedb",
          "ab",
        ],
        output: ["cdfeb", "fcadb", "cdfeb", "cdbaf"],
      };
      expect(() => getSegmentsBySize(invalidSensor.input)).toThrowError(
        "invalid segment detected"
      );
    });

    it("returns sensor value", () => {
      expect(
        getSensorValue({
          input: [
            "acedgfb",
            "cdfbe",
            "gcdfa",
            "fbcad",
            "dab",
            "cefabd",
            "cdfgeb",
            "eafb",
            "cagedb",
            "ab",
          ],
          output: ["cdfeb", "fcadb", "cdfeb", "cdbaf"],
        })
      ).toEqual(5353);
    });
  });
});
