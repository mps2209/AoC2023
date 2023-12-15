// calculator.test.ts
import {
  calculateAscii,
  calculateHashforNumber,
  calculateHashforWord,
} from "./hash";
import { readInput } from "./aoc";

const inputText = `test_input_test`;

test("readInput", async () => {
  try {
    const result = await readInput("test_input.txt");
    expect(result).toBe(inputText);
  } catch (error) {
    // Handle any errors, or rethrow them if needed
    throw error;
  }
});
test("calculateAscii", () => {
  expect(calculateAscii("H")).toBe(72);
});
test("calculateHashforChar", () => {
  expect(calculateHashforNumber(72)).toBe(200);
});
test("calculateHashforWord", () => {
  expect(calculateHashforWord("HASH")).toBe(52);
});
test("calculateHashforWords", () => {
  let words = [
    "rn=1",
    "cm-",
    "qp=3",
    "cm=2",
    "qp-",
    "pc=4",
    "ot=9",
    "ab=5",
    "pc-",
    "pc=6",
    "ot=7",
  ];
  let result = [30, 253, 97, 47, 14, 180, 9, 197, 48, 214, 231];
  expect(words.map((w) => calculateHashforWord(w))).toStrictEqual(result);
});
