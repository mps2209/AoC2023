import * as fs from "fs";
import { PlatformFactory } from "./platform";

export async function solveAoC(inputFile: string) {
  console.log("solving AoC");
  let data = await readInput(inputFile);
  let solution = calculate(data);
  return solution;
}
function calculate(data: string) {
  let platform = PlatformFactory.constructPlatform(data);
  let stableWeight = platform.findStableWeight();
  console.log(stableWeight);
  return platform.weight;
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
