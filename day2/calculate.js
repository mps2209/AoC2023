function calculate(text) {
    lines = text.split("\n")
    let sum = 0;

    lines.forEach(line => {
        sum += calculateLine(line) * 1
    });
    return sum;
}

function calculateLine(input) {
    let digitMatch = new RegExp(/\d+ [a-z]*/, "g")
    let match_words = [...input.matchAll(digitMatch)]
    let resultMap = {
        "blue": 0,
        "red": 0,
        "green": 0
    }
    let gameMatch = [...input.matchAll(/([A-Za-z]* (\d*))/g)][0]
    console.log(gameMatch)
    match_words.forEach(word => {
        let numbermatch = [...word[0].matchAll(/(\d*) ([a-z]*)/g)][0]
        resultMap[numbermatch[2]] += numbermatch[1] * 1
    })
    console.log(resultMap)
    if (resultMap["blue"] > 14 || resultMap["red"] > 12 || resultMap["green"] > 13) {
        return gameMatch[2]
    }
    return 0
}