let body = document.getElementById("body")
let headline = document.createElement("h1")
headline.append("Hello from Advent of Code 2023 p1")
body.append(headline)
let paragraph = document.createElement("p")
fetch("input.txt")
    .then((res) => res.text())
    .then((text) => {
        // do something with "text"
        let sump1 = calculatep1(text);

        paragraph.append("Part 1 total sum: " + sump1)

        body.append(paragraph)
    })
    .catch((e) => console.error(e));