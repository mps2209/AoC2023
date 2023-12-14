export class Platform {
  configuration: string[];
  weight = 0;
  constructor(platformConfiguration: string[]) {
    this.configuration = platformConfiguration;
    this.calculateWeight();
  }
  calculateWeight() {
    let weight = this.configuration
      .map(
        (line, index, configuration) =>
          (this.configuration.length - index) * getNumberOfRocks(line)
      )
      .reduce((p, n) => p + n);
    this.weight = weight;
  }
  cyclePlatform(cycles: number) {
    while (cycles > 0) {
      cycles--;
      for (let index = 0; index < 4; index++) {
        this.tiltPlatform();
        this.rotatePlatform();
      }
      this.calculateWeight();
    }
  }
  rotatePlatform() {
    let rawField = [...Array(this.configuration[0].length)].map((i) => [""]);
    let linesarray = this.configuration.map((line) => line.split(""));
    linesarray.forEach((line) => {
      line.forEach((c, index, line) => {
        rawField[index] = [c].concat(rawField[index]);
      });
    });
    let rotatedField: string[] = rawField.map((line) => line.join(""));
    this.configuration = rotatedField;
  }
  tiltPlatform() {
    let shifted = true;
    while (shifted) {
      shifted = false;
      let shiftedConfiguration = this.configuration.map((line) => line);
      this.configuration.reduce((lowerRow, upperRow, index, configuration) => {
        let tiltedConfig = rollRocks(lowerRow.split(""), upperRow.split(""));
        shiftedConfiguration[index - 1] = tiltedConfig.lower;
        shiftedConfiguration[index] = tiltedConfig.upper;
        if (lowerRow != tiltedConfig.lower) {
          shifted = true;
        }
        return tiltedConfig.upper;
      });
      this.configuration = shiftedConfiguration;
    }
  }
  findStableWeight() {
    let weights: number[] = [];
    let cycles = 0;
    while (!weights.includes(this.weight)) {
      cycles++;
      weights.push(this.weight);

      this.cyclePlatform(cycles);
      this.calculateWeight();
    }
    return weights;
  }
}

export function rollRocks(lowerRow: string[], upperRow: string[]) {
  let newUpper = [...upperRow];
  let newLower = lowerRow.map((element, index, row) => {
    if (element == "." && upperRow[index] == "O") {
      newUpper[index] = ".";
      return "O";
    }
    return element;
  });
  return { lower: newLower.join(""), upper: newUpper.join("") };
}
function getNumberOfRocks(line: string) {
  return [...line.matchAll(/O/g)].length;
}
export class PlatformFactory {
  static constructPlatform(data: string): Platform {
    return new Platform(transformData(data));
  }
}
function transformData(data: string): string[] {
  return data.split("\n");
}
