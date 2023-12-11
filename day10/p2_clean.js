"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Specify the file path
var filePath = 'test_input.txt';
var tiles;
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
        for (var x = 0; x < line.length; x++) {
            var tile_1 = mapToTile(line[x], { x: x, y: y });
            tiles[x][y] = tile_1;
            if (tile_1.name == "T") {
                startingTile = tile_1;
            }
        }
    });
    var neighbours = getNeighbours(startingTile, boardWidth, boardHeight);
    tiles[startingTile.position.x][startingTile.position.y].touched = true;
    var newLine = lines[startingTile.position.y].split('');
    newLine[startingTile.position.x] = "X";
    lines[startingTile.position.y] = newLine.join('');
    var tile = neighbours[0];
    var currentSteps = 1;
    var colored_tiles = __spreadArray([], tiles, true);
    while (tile != undefined) {
        currentSteps++;
        tiles[tile.position.x][tile.position.y].touched = true;
        var newLine_1 = lines[tile.position.y].split('');
        newLine_1[tile.position.x] = "X";
        lines[tile.position.y] = newLine_1.join('');
        tile = getNextTile(tile);
    }
    var differentiatedLineRight = [];
    lines.forEach(function (line) {
        var newDifferentiatedLine = ["1"];
        for (var index = 0; index < line.length; index++) {
            if (index > 0) {
                if (line[index] != "X") {
                    if (line[index - 1] == "X") {
                        newDifferentiatedLine.push("0");
                    }
                    else {
                        newDifferentiatedLine.push("2");
                    }
                }
                if (line[index] == "X") {
                    if (line[index - 1] == "X") {
                        newDifferentiatedLine.push("1");
                    }
                    else {
                        newDifferentiatedLine.push("2");
                    }
                }
            }
        }
        differentiatedLineRight.push(newDifferentiatedLine.join(''));
    });
    var differentiatedLineLeft = [];
    lines.forEach(function (line) {
        var newDifferentiatedLine = ["1"];
        for (var index = (line.length - 1); index >= 0; index--) {
            if (index < line.length - 1) {
                if (line[index] != "X") {
                    if (line[index + 1] == "X") {
                        newDifferentiatedLine = ["0"].concat(newDifferentiatedLine);
                    }
                    else {
                        newDifferentiatedLine = ["1"].concat(newDifferentiatedLine);
                    }
                }
                if (line[index] == "X") {
                    if (line[index + 1] == "X") {
                        newDifferentiatedLine = ["1"].concat(newDifferentiatedLine);
                    }
                    else {
                        newDifferentiatedLine = ["2"].concat(newDifferentiatedLine);
                    }
                }
            }
        }
        differentiatedLineLeft.push(newDifferentiatedLine.join(''));
    });
    console.log(lines);
    console.log(differentiatedLineRight);
    console.log(differentiatedLineLeft);
    console.log(lines[0].length);
    console.log(differentiatedLineRight[0].length);
    console.log(differentiatedLineLeft[0].length);
    var allNumbers = [];
    differentiatedLineLeft.forEach(function (line, index, array) {
        var numbersRight = differentiatedLineRight[index].split('');
        var numbersLeft = line.split('').map(function (n, i, array) { return parseInt(n) + parseInt(numbersRight[i]); });
        allNumbers.push(numbersLeft.join(''));
    });
    console.log(lines);
    console.log(allNumbers);
});
function getNeighbours(startingTile, boardWidth, boardHeight) {
    var neighbours = [];
    if (startingTile.position.x > 0) {
        var neighbourCoordinates = { x: startingTile.position.x - 1, y: startingTile.position.y };
        var neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y];
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
        position: position,
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
