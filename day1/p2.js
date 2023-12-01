

let paragraphp2 = document.createElement("p")
fetch("input.txt")
    .then((res) => res.text())
    .then((text) => {

        // do something with "text"
        let sump2 = calculatep2(text);

        paragraphp2.append("Part 2 total sum: " + sump2)

        body.append(paragraphp2)
    })
    .catch((e) => console.error(e));