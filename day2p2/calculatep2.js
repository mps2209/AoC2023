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
      possible = false;
    }
  });

  //console.log([...line.matchAll(gameRegex)]);

  let minBalls = {
    green: 1,
    red: 1,
    blue: 1,
  };
  [...line.matchAll(colorRegex)].forEach((result) => {
    if (minBalls[result[2]] < result[1] * 1) {
      minBalls[result[2]] = result[1] * 1;
    }
  });
  let sum = 1;
  console.log(minBalls);

  sum *= minBalls["green"];

  sum *= minBalls["blue"];

  sum *= minBalls["red"];
  console.log("game " + [...line.matchAll(gameRegex)][0][1] + " sum: " + sum);

  return sum;
}
