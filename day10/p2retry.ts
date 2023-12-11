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
    let boardWidth = lines[0].length;
    let boardHeight = lines.length;
    console.log(`board dimensions: x: ${boardWidth},y:${boardHeight}`)
    tiles = initialize2DArray(boardWidth, boardHeight, 0)
    console.log(`array dimensions: x: ${tiles.length},y:${tiles[0].length}`)
    let startingTile: Tile;
    lines.forEach((line, y, array) => {
        for (let x = 0; x < line.length - 1; x++) {
            let tile = mapToTile(line[x], { x, y })
            if (tile == undefined) {
            }
            tiles[x][y] = tile
            if (tile.name == "T") {
                startingTile = tile
            }
        }

    });
    let neighbours = getNeighbours(startingTile, boardWidth, boardHeight)
    tiles[startingTile.position.x][startingTile.position.y].touched = true

    steps = neighbours.map(n => 1)
    let tile = neighbours[0]
    let currentSteps = 1
    let newLine = lines[startingTile.position.y].split('')
    newLine[startingTile.position.x] = "X"
    lines[startingTile.position.x] = newLine.join('')
    while (tile != undefined) {
        if (tile.position == undefined) {
            console.log("position undefined")
            console.log(tile)
        }
        let newLine = lines[tile.position.y].split('')
        newLine[tile.position.x] = "X"
        lines[tile.position.y] = newLine.join('')
        currentSteps++
        tiles[tile.position.x][tile.position.y].touched = true
        tile = getNextTile(tile)
    }
    console.log("done marking path")
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
                if (l[x] != "X") {
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
function getNeighbours(startingTile, boardWidth, boardHeight) {
    let neighbours = []
    if (startingTile.position.x > 0) {
        let neighbourCoordinates: Coordinates = { x: startingTile.position.x - 1, y: startingTile.position.y }
        let neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y]
        console.log(neighbourTile)
        if (neighbourTile.name.indexOf('E') != -1) {
            neighbours.push(neighbourTile)
        }
    }
    if (startingTile.position.x < boardWidth - 1) {
        let neighbourCoordinates: Coordinates = { x: startingTile.position.x + 1, y: startingTile.position.y }
        let neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y]
        if (neighbourTile.name.indexOf('W') != -1) {
            neighbours.push(neighbourTile)
        }
    }
    if (startingTile.position.y > 0) {
        let neighbourCoordinates: Coordinates = { x: startingTile.position.x, y: startingTile.position.y - 1 }
        let neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y]
        if (neighbourTile.name.indexOf('S') != -1) {
            neighbours.push(neighbourTile)
        }
    }
    if (startingTile.position.y < boardHeight - 1) {
        let neighbourCoordinates: Coordinates = { x: startingTile.position.x, y: startingTile.position.y + 1 }
        let neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y]
        if (neighbourTile.name.indexOf('N') != -1) {
            neighbours.push(neighbourTile)
        }
    }
    return neighbours
}
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

function getNextTile(tile: Tile) {
    let neighbours = [tile, tile]

    switch (tile.name) {
        case "NS":
            neighbours[0] = tiles[tile.position.x][tile.position.y - 1]
            neighbours[1] = tiles[tile.position.x][tile.position.y + 1]
            break
        case "EW":
            neighbours[0] = tiles[tile.position.x + 1][tile.position.y]
            neighbours[1] = tiles[tile.position.x - 1][tile.position.y]
            break
        case "NE":
            neighbours[0] = tiles[tile.position.x + 1][tile.position.y]
            neighbours[1] = tiles[tile.position.x][tile.position.y - 1]
            break
        case "NW":
            neighbours[0] = tiles[tile.position.x][tile.position.y - 1]
            neighbours[1] = tiles[tile.position.x - 1][tile.position.y]
            break
        case "SW":
            neighbours[0] = tiles[tile.position.x][tile.position.y + 1]
            neighbours[1] = tiles[tile.position.x - 1][tile.position.y]
            break
        case "SE":
            neighbours[0] = tiles[tile.position.x][tile.position.y + 1]
            neighbours[1] = tiles[tile.position.x + 1][tile.position.y]
            break

    }
    if (!neighbours[0].touched) {
        return neighbours[0]
    }
    if (!neighbours[1].touched) {
        return neighbours[1]
    }
    return undefined;
}

function mapToTile(c, position): Tile {
    let neighbours = []
    switch (c) {
        case "NS":
            break
        case "EW":
            break
        case "NE":
            break
        case "NW":
            break
        case "SW":
            break
        case "SE":
            break
        case "G":
            break
        case "S":
            break
        case "\n":
            return
        case "\r":
            return

    }
    return {
        name: directions[c],
        symbol: c,
        touched: false,
        neighbours,
        position
    }
}
let directions = {
    "|": "NS",
    "-": "EW",
    "L": "NE",
    "J": "NW",
    "7": "SW",
    "F": "SE",
    ".": "G",
    "S": "T"
}
interface Tile {
    name: string,
    symbol: string,
    touched: boolean,
    neighbours: Coordinates[],
    position: Coordinates
}
interface Coordinates {
    x: number,
    y: number,

}
function initialize2DArray(rows, columns, initialValue) {
    const array = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(initialValue);
        }
        array.push(row);
    }
    return array;
}
