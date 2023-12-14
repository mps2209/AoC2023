// calculator.test.ts
import { MirrorField } from "./mirror_field";
import { solveAoC, readInput } from "./p1";

const inputText = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

test("readInput", async () => {
  try {
    const result = await readInput("test_input.txt");
    expect(result).toBe(inputText);
  } catch (error) {
    // Handle any errors, or rethrow them if needed
    throw error;
  }
});

test("transformInput", () => {
  expect(MirrorField.transformInput(inputText).length).toBe(2);
});
let verticalMirrorLine = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#.",
];
let horizontalMirrorline = [
  "#...##..#",
  "#....#..#",
  "..##..###",
  "#####.##.",
  "#####.##.",
  "..##..###",
  "#....#..#",
];
test("calculateHorizontalMirrorLine", () => {
  let mirror_field = new MirrorField(horizontalMirrorline);
  expect(mirror_field.calculateMirrorLine()).toBe(4);
});
test("calculateVerticalMirrorLine", () => {
  let mirror_field = new MirrorField(verticalMirrorLine);
  expect(mirror_field.calculateMirrorLine()).toBe(5);
});
