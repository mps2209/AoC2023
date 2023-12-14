export class Platform {
  configuration: string[];
  weight: number;
  constructor(platformConfiguration: string[]) {
    this.configuration = platformConfiguration;
    this.weight = this.calculateWeight();
  }
  private calculateWeight() {
    let weight = this.configuration
      .map(
        (line, index, configuration) =>
          (this.configuration.length - index) * getNumberOfRocks(line)
      )
      .reduce((p, n) => p + n);
    return weight;
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
    this.weight = this.calculateWeight();
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
