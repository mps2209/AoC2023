function calculatep1(text) {
    console.log("calculating")
    let lines = text.split("\n")
    let sum = 0
    lines.forEach(textline => {
        sum += findDigitWordp1(textline) * 1
    });
    return sum
}

function findDigitWordp1(line) {
    let dRegex = /\d/g
    let allmatches = []
    matches = [...line.matchAll(dRegex)]
    if (matches.length > 0) {
        allmatches.push(...matches)
    }
    let sorted = allmatches.sort((a, b) => compareFn(a, b))
    function compareFn(a, b) {
        if (a["index"] < b["index"]) {
            return -1;
        } else if (a["index"] > b["index"]) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }

    let result = sorted[0] + "" + sorted[sorted.length - 1]
    return result;
}
