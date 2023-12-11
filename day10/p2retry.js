"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Specify the file path
var filePath = 'test_input.txt';
var tiles;
var steps;
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error("Error reading file: ".concat(err));
        return;
    }
    var cleandata = data.replace(/\r/g, '');
    var lines = cleandata.split("\n");
    var boardWidth = lines[0].length;
    var boardHeight = lines.length;
    console.log("board dimensions: x: ".concat(boardWidth, ",y:").concat(boardHeight));
    tiles = initialize2DArray(boardWidth, boardHeight, 0);
    console.log("array dimensions: x: ".concat(tiles.length, ",y:").concat(tiles[0].length));
    var startingTile;
    lines.forEach(function (line, y, array) {
        for (var x = 0; x < line.length - 1; x++) {
            var tile_1 = mapToTile(line[x], { x: x, y: y });
            if (tile_1 == undefined) {
            }
            tiles[x][y] = tile_1;
            if (tile_1.name == "T") {
                startingTile = tile_1;
            }
        }
    });
    var neighbours = getNeighbours(startingTile, boardWidth, boardHeight);
    tiles[startingTile.position.x][startingTile.position.y].touched = true;
    steps = neighbours.map(function (n) { return 1; });
    var tile = neighbours[0];
    var currentSteps = 1;
    var newLine = lines[startingTile.position.y].split('');
    newLine[startingTile.position.x] = "X";
    lines[startingTile.position.x] = newLine.join('');
    while (tile != undefined) {
        if (tile.position == undefined) {
            console.log("position undefined");
            console.log(tile);
        }
        var newLine_1 = lines[tile.position.y].split('');
        newLine_1[tile.position.x] = "X";
        lines[tile.position.y] = newLine_1.join('');
        currentSteps++;
        tiles[tile.position.x][tile.position.y].touched = true;
        tile = getNextTile(tile);
    }
    console.log("done marking path");
    lines[0] = lines[0].replace(".", "0");
    lines[lines.length - 1] = lines[lines.length - 1].replace(".", "0");
    lines = lines.map(function (l) {
        var newline = l;
        if (l[0] == ".") {
            newline = "0" + l.substring(1, l.length);
        }
        if (l[l.length - 1] == ".") {
            newline = l.substring(0, l.length - 1) + "0";
        }
        return newline;
    });
    console.log(lines);
    var replaced = true;
    while (replaced) {
        replaced = false;
        lines = lines.map(function (l, y, array) {
            var line = l;
            if (line.indexOf(".") == -1) {
                return line;
            }
            for (var x = 0; x < l.length; x++) {
                if (l[x] != "X") {
                    if (neighbourOutsideOfLoop(x, y, lines)) {
                        var stringArray = l.split(''); // Convert string to an array of characters
                        stringArray[x] = "0"; // Replace the character at the specified index
                        line = stringArray.join('');
                        replaced = true;
                    }
                }
            }
            return line;
        });
    }
    console.log(lines);
    console.log(lines.join('').split('').filter(function (x) { return x == "."; }).length);
});
function getNeighbours(startingTile, boardWidth, boardHeight) {
    var neighbours = [];
    if (startingTile.position.x > 0) {
        var neighbourCoordinates = { x: startingTile.position.x - 1, y: startingTile.position.y };
        var neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y];
        console.log(neighbourTile);
        if (neighbourTile.name.indexOf('E') != -1) {
            neighbours.push(neighbourTile);
        }
    }
    if (startingTile.position.x < boardWidth - 1) {
        var neighbourCoordinates = { x: startingTile.position.x + 1, y: startingTile.position.y };
        var neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y];
        if (neighbourTile.name.indexOf('W') != -1) {
            neighbours.push(neighbourTile);
        }
    }
    if (startingTile.position.y > 0) {
        var neighbourCoordinates = { x: startingTile.position.x, y: startingTile.position.y - 1 };
        var neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y];
        if (neighbourTile.name.indexOf('S') != -1) {
            neighbours.push(neighbourTile);
        }
    }
    if (startingTile.position.y < boardHeight - 1) {
        var neighbourCoordinates = { x: startingTile.position.x, y: startingTile.position.y + 1 };
        var neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y];
        if (neighbourTile.name.indexOf('N') != -1) {
            neighbours.push(neighbourTile);
        }
    }
    return neighbours;
}
function neighbourOutsideOfLoop(x, y, lines) {
    var isOutside = false;
    if (x > 0) {
        isOutside = lines[y][x - 1] == "0";
    }
    if (x < lines[0].length) {
        isOutside = lines[y][x + 1] == "0";
    }
    if (y > 0) {
        isOutside = lines[y - 1][x] == "0";
    }
    if (y < lines.length - 1) {
        isOutside = lines[y + 1][x] == "0";
    }
    return isOutside;
}
function getNextTile(tile) {
    var neighbours = [tile, tile];
    switch (tile.name) {
        case "NS":
            neighbours[0] = tiles[tile.position.x][tile.position.y - 1];
            neighbours[1] = tiles[tile.position.x][tile.position.y + 1];
            break;
        case "EW":
            neighbours[0] = tiles[tile.position.x + 1][tile.position.y];
            neighbours[1] = tiles[tile.position.x - 1][tile.position.y];
            break;
        case "NE":
            neighbours[0] = tiles[tile.position.x + 1][tile.position.y];
            neighbours[1] = tiles[tile.position.x][tile.position.y - 1];
            break;
        case "NW":
            neighbours[0] = tiles[tile.position.x][tile.position.y - 1];
            neighbours[1] = tiles[tile.position.x - 1][tile.position.y];
            break;
        case "SW":
            neighbours[0] = tiles[tile.position.x][tile.position.y + 1];
            neighbours[1] = tiles[tile.position.x - 1][tile.position.y];
            break;
        case "SE":
            neighbours[0] = tiles[tile.position.x][tile.position.y + 1];
            neighbours[1] = tiles[tile.position.x + 1][tile.position.y];
            break;
    }
    if (!neighbours[0].touched) {
        return neighbours[0];
    }
    if (!neighbours[1].touched) {
        return neighbours[1];
    }
    return undefined;
}
function mapToTile(c, position) {
    var neighbours = [];
    switch (c) {
        case "NS":
            break;
        case "EW":
            break;
        case "NE":
            break;
        case "NW":
            break;
        case "SW":
            break;
        case "SE":
            break;
        case "G":
            break;
        case "S":
            break;
        case "\n":
            return;
        case "\r":
            return;
    }
    return {
        name: directions[c],
        symbol: c,
        touched: false,
        neighbours: neighbours,
        position: position
    };
}
var directions = {
    "|": "NS",
    "-": "EW",
    "L": "NE",
    "J": "NW",
    "7": "SW",
    "F": "SE",
    ".": "G",
    "S": "T"
};
function initialize2DArray(rows, columns, initialValue) {
    var array = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < columns; j++) {
            row.push(initialValue);
        }
        array.push(row);
    }
    return array;
}
