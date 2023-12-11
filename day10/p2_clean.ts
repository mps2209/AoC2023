import * as fs from 'fs';


// Specify the file path
const filePath = 'test_input.txt';
let tiles;
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
        for (let x = 0; x < line.length; x++) {
            let tile = mapToTile(line[x], { x, y })
            tiles[x][y] = tile
            if (tile.name == "T") {
                startingTile = tile
            }
        }
    });
    let neighbours = getNeighbours(startingTile, boardWidth, boardHeight)
    tiles[startingTile.position.x][startingTile.position.y].touched = true
    let newLine = lines[startingTile.position.y].split('')
    newLine[startingTile.position.x] = "X"
    lines[startingTile.position.y] = newLine.join('')
    let tile = neighbours[0]
    let currentSteps = 1
    let colored_tiles = [...tiles]

    while (tile != undefined) {
        currentSteps++
        tiles[tile.position.x][tile.position.y].touched = true
        let newLine = lines[tile.position.y].split('')
        newLine[tile.position.x] = "X"
        lines[tile.position.y] = newLine.join('')
        tile = getNextTile(tile)
    }
    let differentiatedLineRight = []
    lines.forEach(line => {
        let newDifferentiatedLine = ["1"]
        for (let index = 0; index < line.length; index++) {
            if (index > 0) {
                if (line[index] != "X") {
                    if (line[index - 1] == "X") {
                        newDifferentiatedLine.push("0")
                    } else {
                        newDifferentiatedLine.push("2")
                    }
                }
                if (line[index] == "X") {
                    if (line[index - 1] == "X") {
                        newDifferentiatedLine.push("1")
                    } else {
                        newDifferentiatedLine.push("2")
                    }
                }
            }
        }
        differentiatedLineRight.push(newDifferentiatedLine.join(''))
    })
    let differentiatedLineLeft = []
    lines.forEach(line => {
        let newDifferentiatedLine = ["1"]
        for (let index = (line.length - 1); index >= 0; index--) {
            if (index < line.length - 1) {
                if (line[index] != "X") {
                    if (line[index + 1] == "X") {
                        newDifferentiatedLine = ["0"].concat(newDifferentiatedLine)
                    } else {
                        newDifferentiatedLine = ["1"].concat(newDifferentiatedLine)
                    }
                }
                if (line[index] == "X") {
                    if (line[index + 1] == "X") {
                        newDifferentiatedLine = ["1"].concat(newDifferentiatedLine)
                    } else {
                        newDifferentiatedLine = ["2"].concat(newDifferentiatedLine)
                    }
                }
            }
        }
        differentiatedLineLeft.push(newDifferentiatedLine.join(''))
    })
    console.log(lines)
    console.log(differentiatedLineRight)
    console.log(differentiatedLineLeft)
    console.log(lines[0].length)
    console.log(differentiatedLineRight[0].length)
    console.log(differentiatedLineLeft[0].length)
    let allNumbers = []
    differentiatedLineLeft.forEach((line, index, array) => {
        let numbersRight = differentiatedLineRight[index].split('')
        let numbersLeft = line.split('').map((n, i, array) => parseInt(n) + parseInt(numbersRight[i]))
        allNumbers.push(numbersLeft.join(''))
    })
    console.log(lines)

    console.log(allNumbers)

})


function getNeighbours(startingTile, boardWidth, boardHeight) {
    let neighbours = []
    if (startingTile.position.x > 0) {
        let neighbourCoordinates: Coordinates = { x: startingTile.position.x - 1, y: startingTile.position.y }
        let neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y]
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
        position,
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
