"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Specify the file path
var filePath = 'input.txt';
var tiles;
var steps;
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error("Error reading file: ".concat(err));
        return;
    }
    data = data.replace("\r", "");
    var lines = data.split("\n");
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
    var neighbours = [];
    tiles[startingTile.position.x][startingTile.position.y].touched = true;
    if (startingTile.position.x > 0) {
        var neighbourCoordinates = { x: startingTile.position.x - 1, y: startingTile.position.y };
        var neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y];
        console.log(neighbourTile);
        if (neighbourTile.name.indexOf('E') != -1) {
            neighbours.push(neighbourTile);
        }
    }
    if (startingTile.position.x < boardWidth - 3) {
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
    if (startingTile.position.y < boardHeight) {
        var neighbourCoordinates = { x: startingTile.position.x, y: startingTile.position.y + 1 };
        var neighbourTile = tiles[neighbourCoordinates.x][neighbourCoordinates.y];
        if (neighbourTile.name.indexOf('N') != -1) {
            neighbours.push(neighbourTile);
        }
    }
    steps = neighbours.map(function (n) { return 1; });
    var tile = neighbours[0];
    var currentSteps = 1;
    while (tile != undefined) {
        currentSteps++;
        tiles[tile.position.x][tile.position.y].touched = true;
        tile = getNextTile(tile);
    }
    console.log("done");
    console.log(currentSteps);
    fs.writeFileSync('./result.txt', JSON.stringify(steps));
});
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
function navigate(tile, path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!tile.touched) {
                steps[path]++;
                //console.log(`path: ${path} visiting ${tile.symbol} at ${tile.position.x}:${tile.position.y} steps: ${steps[path]}`)
                tile.touched = true;
                tiles[tile.position.x][tile.position.y] = tile;
                switch (tile.name) {
                    case "NS":
                        //console.log(`navigating ${tile.name}`)
                        navigate(tiles[tile.position.x][tile.position.y - 1], path);
                        navigate(tiles[tile.position.x][tile.position.y + 1], path);
                        break;
                    case "EW":
                        //console.log(`navigating ${tile.name}`)
                        navigate(tiles[tile.position.x + 1][tile.position.y], path);
                        navigate(tiles[tile.position.x - 1][tile.position.y], path);
                        break;
                    case "NE":
                        //console.log(`navigating ${tile.name}`)
                        navigate(tiles[tile.position.x + 1][tile.position.y], path);
                        navigate(tiles[tile.position.x][tile.position.y - 1], path);
                        break;
                    case "NW":
                        //console.log(`navigating ${tile.name}`)
                        navigate(tiles[tile.position.x][tile.position.y - 1], path);
                        navigate(tiles[tile.position.x - 1][tile.position.y], path);
                        break;
                    case "SW":
                        //console.log(`navigating ${tile.name}`)
                        navigate(tiles[tile.position.x][tile.position.y + 1], path);
                        navigate(tiles[tile.position.x - 1][tile.position.y], path);
                        break;
                    case "SE":
                        //console.log(`navigating ${tile.name}`)
                        navigate(tiles[tile.position.x][tile.position.y + 1], path);
                        navigate(tiles[tile.position.x + 1][tile.position.y], path);
                        break;
                }
            }
            return [2 /*return*/];
        });
    });
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
