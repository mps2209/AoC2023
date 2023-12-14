import { MirrorField } from "./mirror_field";
import * as fs from "fs";

export async function solveAoC(inputFile: string) {
  console.log("solving AoC");
  let data = await readInput(inputFile);
  let mirrors = MirrorField.transformInput(data);
  let solution = 0;
  return solution;
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

solveAoC("test_input.txt");
