import * as fs from "fs";
import { calculateHashforWord } from "./hash";

export async function solveAoC(inputFile: string): Promise<number> {
  console.log("solving AoC");
  let data = await readInput(inputFile);
  let solution = calculate(data);
  return solution;
}
function calculate(data: string): number {
  let words: number[] = data.split(",").map((w) => calculateHashforWord(w));
  console.log(words);
  return words.reduce((p, n) => p + n);
}
export function readInput(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        reject(err);
        return;
      }
      let clean_data = data.replace(/\r/g, "");
      resolve(clean_data);
    });
  });
}
