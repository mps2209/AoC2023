export function calculateAscii(char: string): number {
  return char.charCodeAt(0);
}
export function calculateHashforNumber(charCode: number) {
  return (charCode * 17) % 256;
}
export function calculateHashforWord(char: string): number {
  let asciiCodes = char.split("").map((c) => calculateAscii(c));
  asciiCodes[0] = calculateHashforNumber(asciiCodes[0]);
  return asciiCodes.reduce((p, n) => calculateHashforNumber(p + n));
}
