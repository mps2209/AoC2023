import * as fs from 'fs';


// Specify the file path
const filePath = 'input.txt';
let tiles;
let steps;
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    data = data.replace("\r", "")
    let lines = data.split("\n")
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
    let neighbours = []
    tiles[startingTile.position.x][startingTile.position.y].touched = true
    if (startingTile.position.x > 0) {
        let neighbourCoordinates: Coordinates = { x: startingTile.position.x - 1, y: startingTile.position.y }
        let neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y]
        console.log(neighbourTile)
        if (neighbourTile.name.indexOf('E') != -1) {
            neighbours.push(neighbourTile)
        }
    }
    if (startingTile.position.x < boardWidth - 3) {
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
    if (startingTile.position.y < boardHeight) {
        let neighbourCoordinates: Coordinates = { x: startingTile.position.x, y: startingTile.position.y + 1 }
        let neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y]
        if (neighbourTile.name.indexOf('N') != -1) {
            neighbours.push(neighbourTile)
        }
    }
    steps = neighbours.map(n => 1)
    let tile = neighbours[0]
    let currentSteps = 1
    while (tile != undefined) {
        currentSteps++
        tiles[tile.position.x][tile.position.y].touched = true
        tile = getNextTile(tile)
    }
    console.log("done")
    console.log(currentSteps)
    fs.writeFileSync('./result.txt', JSON.stringify(steps));

})

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
async function navigate(tile: Tile, path) {
    if (!tile.touched) {
        steps[path]++
        //console.log(`path: ${path} visiting ${tile.symbol} at ${tile.position.x}:${tile.position.y} steps: ${steps[path]}`)

        tile.touched = true
        tiles[tile.position.x][tile.position.y] = tile
        switch (tile.name) {
            case "NS":
                //console.log(`navigating ${tile.name}`)
                navigate(tiles[tile.position.x][tile.position.y - 1], path)
                navigate(tiles[tile.position.x][tile.position.y + 1], path)
                break
            case "EW":
                //console.log(`navigating ${tile.name}`)

                navigate(tiles[tile.position.x + 1][tile.position.y], path)
                navigate(tiles[tile.position.x - 1][tile.position.y], path)
                break
            case "NE":
                //console.log(`navigating ${tile.name}`)

                navigate(tiles[tile.position.x + 1][tile.position.y], path)
                navigate(tiles[tile.position.x][tile.position.y - 1], path)
                break
            case "NW":
                //console.log(`navigating ${tile.name}`)
                navigate(tiles[tile.position.x][tile.position.y - 1], path)
                navigate(tiles[tile.position.x - 1][tile.position.y], path)
                break
            case "SW":
                //console.log(`navigating ${tile.name}`)

                navigate(tiles[tile.position.x][tile.position.y + 1], path)
                navigate(tiles[tile.position.x - 1][tile.position.y], path)
                break
            case "SE":
                //console.log(`navigating ${tile.name}`)

                navigate(tiles[tile.position.x][tile.position.y + 1], path)
                navigate(tiles[tile.position.x + 1][tile.position.y], path)
                break

        }
    }
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
