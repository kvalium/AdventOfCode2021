import path from "path";
import { getSyntaxFileScore, parseFile, validate } from "./checker";

const filePath = path.resolve(__dirname, "fakeInput");
const fakeInput = parseFile(filePath);

describe("Day 10 - Syntax Scoring", () => {
  it("detects incomplete line", () => {
    expect(validate(fakeInput[0])).toEqual({
      isValid: true,
      autocompleteScore: 288957,
    });
    expect(validate(fakeInput[1])).toEqual({
      isValid: true,
      autocompleteScore: 5566,
    });
  });

  it("detects line with invalid syntax", () => {
    expect(validate(fakeInput[2])).toEqual({
      isValid: false,
      expected: "]",
      found: "}",
      syntaxScore: 1197,
    });
    expect(validate(fakeInput[4])).toEqual({
      isValid: false,
      expected: "]",
      found: ")",
      syntaxScore: 3,
    });
    expect(validate(fakeInput[5])).toEqual({
      isValid: false,
      expected: ")",
      found: "]",
      syntaxScore: 57,
    });
    expect(validate(fakeInput[8])).toEqual({
      isValid: false,
      expected: "]",
      found: ">",
      syntaxScore: 25137,
    });
  });

  it("returns file score", () => {
    expect(getSyntaxFileScore(filePath)).toEqual([26397, 288957]);
  });
});
