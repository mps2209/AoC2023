import * as fs from 'fs';


// Specify the file path
const filePath = 'test_input.txt';
let tiles;
let steps;
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let cleandata = data.replace(/\r/g, '');
    let lines = cleandata.split("\n")
    lines[0] = lines[0].replace(".", "0")
    lines[lines.length - 1] = lines[lines.length - 1].replace(".", "0")
    lines = lines.map(l => {
        let newline = l;
        if (l[0] == ".") {
            newline = "0" + l.substring(1, l.length)
        }
        if (l[l.length - 1] == ".") {
            newline = l.substring(0, l.length - 1) + "0"
        }
        return newline
    })
    console.log(lines)

    let replaced = true
    while (replaced) {
        replaced = false
        lines = lines.map((l, y, array) => {
            let line = l;
            if (line.indexOf(".") == -1) {
                return line;
            }
            for (let x = 0; x < l.length; x++) {
                if (l[x] == ".") {
                    if (neighbourOutsideOfLoop(x, y, lines)) {
                        const stringArray = l.split(''); // Convert string to an array of characters
                        stringArray[x] = "0"; // Replace the character at the specified index
                        line = stringArray.join('');
                        replaced = true
                    }
                }
            }
            return line;
        })
    }
    console.log(lines)
    console.log(lines.join('').split('').filter(x => x == ".").length)
})

function neighbourOutsideOfLoop(x, y, lines) {
    let isOutside = false;
    if (x > 0) {
        isOutside = lines[y][x - 1] == "0"
    }
    if (x < lines[0].length) {
        isOutside = lines[y][x + 1] == "0"
    }
    if (y > 0) {
        isOutside = lines[y - 1][x] == "0"
    }
    if (y < lines.length - 1) {
        isOutside = lines[y + 1][x] == "0"
    }
    return isOutside
}