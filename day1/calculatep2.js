function calculatep2(text) {
    console.log("calculating")
    let lines = text.split("\n")
    let sum = 0
    lines.forEach(textline => {
        sum += findDigitWordp2(textline) * 1
    });
    return sum
}

function findDigitWordp2(line) {
    let digitsRegex = [/one/g, /two/g, /three/g, /four/g, /five/g, /six/g, /seven/g, /eight/g, /nine/g]
    let dRegex = /\d/g
    let allmatches = []
    digitsRegex.forEach((digitRegex, index, array) => {
        let matches = [...line.matchAll(digitRegex)]
        if (matches.length > 0) {
            allmatches.push(...matches)
        }

    })
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


    let result = toDigit(sorted[0]) + "" + toDigit(sorted[sorted.length - 1])
    return result;
}
function toDigit(digit) {
    let digitsRegex = [/one/g, /two/g, /three/g, /four/g, /five/g, /six/g, /seven/g, /eight/g, /nine/g]
    let digitMatch
    digitsRegex.forEach((digitRegex, index, array) => {
        if (digitRegex.test(digit)) {
            digitMatch = (index + 1)
        }
    })
    if (digitMatch != undefined) {
        return digitMatch
    }
    return digit
}