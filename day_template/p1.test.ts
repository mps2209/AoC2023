// calculator.test.ts
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
