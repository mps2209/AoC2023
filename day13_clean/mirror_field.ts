export class MirrorField {
  field: string[];
  constructor(field: string[]) {
    this.field = field;
  }
  static transformInput(input: string): MirrorField[] {
    console.log("transforming input");
    let factor = 100;
    let lines = input.split("\n");
    let mirrors: MirrorField[] = [new MirrorField([])];
    lines.forEach((element) => {
      if (element == "") {
        mirrors.push(new MirrorField([]));
      } else {
        mirrors[mirrors.length - 1].field.push(element);
      }
    });
    return mirrors;
  }

  calculateMirrorLine(): number | undefined {
    let result = this.checkForLine();
    if (result == undefined) {
      let rotatedField: MirrorField = new MirrorField(this.field);
      rotatedField.rotateField();
      result = rotatedField.checkForLine();
    }
    return result;
  }
  checkForLine() {
    let lines = this.field.map((line) => line);
    for (let index = 1; index < lines.length; index++) {
      let sides = getSides(lines, index);
      let comparedSides = compareSides(sides.smaller, sides.bigger);
      if (comparedSides.every((isMirrored) => isMirrored)) {
        return index;
      }
    }
  }
  rotateField() {
    let rawField = [...Array(this.field[0].length)].map((i) => [""]);
    let linesarray = this.field.map((line) => line.split(""));
    linesarray.forEach((line) => {
      line.forEach((c, index, line) => {
        rawField[index].push(c);
      });
    });
    let rotatedField: string[] = rawField.map((line) => line.join(""));
    this.field = rotatedField;
  }
}
function getSides(lines: string[], index: number) {
  let leftSide = lines.slice(0, index);
  leftSide.reverse();
  let rightSide = lines.slice(index, lines.length);
  return sortSides(leftSide, rightSide);
}
function sortSides(leftSide: string[], rightSide: string[]) {
  let smallerSide = rightSide;
  let biggerSide = leftSide;
  if (leftSide.length < rightSide.length) {
    smallerSide = leftSide;
    biggerSide = rightSide;
  }
  return { smaller: smallerSide, bigger: biggerSide };
}
function compareSides(smaller: string[], bigger: string[]) {
  return smaller.map((line, index, side) => line == bigger[index]);
}
