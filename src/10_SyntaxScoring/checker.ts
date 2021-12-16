import { readFile } from "../utils";

type OpenChar = "(" | "[" | "{" | "<";
type CloseChar = ")" | "]" | "}" | ">";

const syntaxChars: Record<OpenChar, CloseChar> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const openings: OpenChar[] = Object.keys(syntaxChars) as OpenChar[];
const closings: CloseChar[] = Object.values(syntaxChars);
const openAndCloseChars = [...openings, ...closings];

const syntaxPoints: Record<CloseChar, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const autocompletePoints: Record<CloseChar, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

type Status = {
  isValid: boolean;
  syntaxScore?: number;
  autocompleteScore?: number;
};

type Result =
  | Status
  | (Status & {
      expected: CloseChar;
      found: CloseChar;
      syntaxScore: number;
    });

export const getSyntaxFileScore = (path: string): [number, number] => {
  const results = parseFile(path).map(validate);
  const syntaxScore = results.reduce((sum, l) => sum + (l.syntaxScore || 0), 0);

  const incompleteLinesScores = results
    .filter((r) => r.autocompleteScore)
    .map((r) => r.autocompleteScore!)
    .sort((a, b) => b - a);

  const middleAutocompleteScore =
    incompleteLinesScores[Math.floor(incompleteLinesScores.length / 2)];

  return [syntaxScore, middleAutocompleteScore];
};

export const validate = (line: string[]): Result => {
  if (!isValidChunkString(line)) {
    throw new Error("provided line contains invalid characters");
  }

  const currentlyOpened: OpenChar[] = [];
  for (const c of line) {
    if (isOpeningChar(c)) {
      currentlyOpened.push(c);
      continue;
    }

    const currentOpenChunkChar = currentlyOpened[currentlyOpened.length - 1];
    if (closesChunk(currentOpenChunkChar, c)) {
      currentlyOpened.pop();
      continue;
    }
    return {
      isValid: false,
      expected: syntaxChars[currentOpenChunkChar],
      found: c,
      syntaxScore: syntaxPoints[c],
    };
  }

  return {
    isValid: true,
    autocompleteScore: getAutocompleteScore(currentlyOpened),
  };
};

const getAutocompleteScore = (remainingOpened: OpenChar[] = []) =>
  remainingOpened
    .reverse()
    .map((o) => syntaxChars[o])
    .reduce((sum, c) => sum * 5 + autocompletePoints[c], 0);

const closesChunk = (o: OpenChar, c: CloseChar) => syntaxChars[o] === c;

const isOpeningChar = (c: string): c is OpenChar =>
  !!syntaxChars[c as OpenChar];

const isValidChunkString = (s: string[]): s is OpenChar[] | CloseChar[] =>
  s.every((c) => openAndCloseChars.includes(c as OpenChar | CloseChar));

export const parseFile = (path: string): string[][] =>
  readFile(path).map((l) => l.split(""));
