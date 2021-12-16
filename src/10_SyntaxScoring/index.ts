import path from "path";
import { getSyntaxFileScore } from "./checker";

const [syntaxScore, autocompleteScore] = getSyntaxFileScore(
  path.resolve(__dirname, "navSubSystem")
);

console.log({
  syntaxScore,
  autocompleteScore,
});
