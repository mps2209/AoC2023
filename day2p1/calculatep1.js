function calculatep1(text) {
  console.log("calculating");
  let lines = text.split("\n");
  let sum = 0;
  lines.forEach((textline) => {
    sum += getSum(textline) * 1;
  });
  return sum;
}

function getSum(line) {
  let gameRegex = new RegExp(/[a-zA-Z]+\s(\d+)/, "g");
  let colorRegex = new RegExp(/(\d+)\s([a-zA-Z]+)/, "g");

  let maxBalls = {
    green: 13,
    red: 12,
    blue: 14,
  };
  let possible = true;
  [...line.matchAll(colorRegex)].forEach((result) => {
    if (maxBalls[result[2]] < result[1] * 1) {
      console.log(
        "game " + [...line.matchAll(gameRegex)][0][1] + " impossible"
      );
      possible = false;
    }
  });

  //console.log([...line.matchAll(gameRegex)]);

  if (possible) {
    console.log("game " + [...line.matchAll(gameRegex)][0][1] + " possible");
    console.log([...line.matchAll(gameRegex)]);
    return [...line.matchAll(gameRegex)][0][1];
  }
  return 0;
}
