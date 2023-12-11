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
    let clean_data = data.replace(/\r/g, "")
    let lines = clean_data.split("\n")
    let startingTileIndex=lines.join('').indexOf("S")
    let startingTileCoordinates={x:startingTileIndex%lines[0].length,y:Math.floor(startingTileIndex/lines.length)}
    console.log(startingTileIndex)
    console.log(startingTileCoordinates)
    let startingTile:Tile={symbol:"S",touched:true,coordinates:startingTileCoordinates}
    let coordinateGrid=lines.map(line=>line.split(''))
    let coordinatedTileGrid=[]
    coordinateGrid.forEach((line,y,lines)=>{
        let tileRow=line.map((column,x,columns)=>{
            return{
                symbol:column,
                coordinates:{
                    x,y
                },
                touched:false
            }})
        coordinatedTileGrid.push(tileRow)
    }
    )
    coordinatedTileGrid.forEach(row=>row.forEach(element =>console.log(element)))
    startingTile.neighbours=getNeighbours(startingTile,coordinatedTileGrid)
    startingTile.symbol="F"
    //console.log(startingTile)
    let steps=0;
    let currentTile=startingTile
    while(currentTile!=undefined){
        let previousTile=currentTile;
        currentTile=undefined
        steps++
        let direction;
        let turned="straight"
        if(previousTile.neighbours.north!=undefined){
            //console.log("checking " + directions[previousTile.neighbours.north.symbol])
            if(directions[previousTile.neighbours.north.symbol].indexOf("S")!=-1&& directions[previousTile.symbol].indexOf("N")!=-1){
                //console.log("matched " + directions[previousTile.neighbours.north.symbol])
                let nextTile=coordinatedTileGrid[previousTile.neighbours.north.coordinates.y][previousTile.neighbours.north.coordinates.x]
                //console.log(nextTile)
                nextTile.neighbours=getNeighbours(nextTile,coordinatedTileGrid)
                if(!nextTile.touched){
                    currentTile=nextTile
                    direction="north";
                    

                }
            }
        }
        if(previousTile.neighbours.east!=undefined){
            //console.log("checking " + directions[previousTile.neighbours.east.symbol])
            if(directions[previousTile.neighbours.east.symbol].indexOf("W")!=-1 && directions[previousTile.symbol].indexOf("E")!=-1){
                //console.log("matched " + directions[previousTile.neighbours.east.symbol])
                let nextTile=coordinatedTileGrid[previousTile.neighbours.east.coordinates.y][previousTile.neighbours.east.coordinates.x]
                //console.log(nextTile)
                nextTile.neighbours=getNeighbours(nextTile,coordinatedTileGrid)
                if(!nextTile.touched){
                    currentTile=nextTile
                    direction="east";
                }
            }
        }
        if(previousTile.neighbours.south!=undefined){
            //console.log("checking " + directions[previousTile.neighbours.south.symbol])
            if(directions[previousTile.neighbours.south.symbol].indexOf("N")!=-1 && directions[previousTile.symbol].indexOf("S")!=-1){
                //console.log("matched " + directions[previousTile.neighbours.south.symbol])
                let nextTile=coordinatedTileGrid[previousTile.neighbours.south.coordinates.y][previousTile.neighbours.south.coordinates.x]
                //console.log(nextTile)
                nextTile.neighbours=getNeighbours(nextTile,coordinatedTileGrid)
                if(!nextTile.touched){
                    currentTile=nextTile
                    direction="south";
                }
            }
        }
        if(previousTile.neighbours.west!=undefined){
            //console.log("checking " + directions[previousTile.neighbours.west.symbol])

            if(directions[previousTile.neighbours.west.symbol].indexOf("E")!=-1 && directions[previousTile.symbol].indexOf("W")!=-1){
                //console.log("matched " + directions[previousTile.neighbours.west.symbol])
                
                let nextTile=coordinatedTileGrid[previousTile.neighbours.west.coordinates.y][previousTile.neighbours.west.coordinates.x]

                //console.log(nextTile)
                nextTile.neighbours=getNeighbours(nextTile,coordinatedTileGrid)
                if(!nextTile.touched){
                    currentTile=nextTile
                    direction="west";
                }
            }
        }

        if(currentTile!=undefined){
            currentTile.touched=true
            coordinatedTileGrid[currentTile.coordinates.y][currentTile.coordinates.x]=currentTile
            console.log(`goint from ${previousTile.symbol} in ${direction} ${checkDirection(direction,currentTile.symbol)} to ${currentTile.symbol}`)
        }
    }
    
    console.log(steps)
})

function getNeighbours(tile:Tile,tiles){
    let neighbours:Neighbours={}
    if(tiles[tile.coordinates.y-1]!=undefined){
        neighbours.north=tiles[tile.coordinates.y-1][tile.coordinates.x]
    }
    if(tiles[tile.coordinates.y+1]!=undefined){
        neighbours.south=tiles[tile.coordinates.y+1][tile.coordinates.x]
    }
    if(tiles[tile.coordinates.y][tile.coordinates.x+1]!=undefined){
        neighbours.east=tiles[tile.coordinates.y][tile.coordinates.x+1]
    }
        if(tiles[tile.coordinates.y][tile.coordinates.x-1]!=undefined){
            neighbours.west=tiles[tile.coordinates.y][tile.coordinates.x-1]
    }
    return neighbours
}
interface Tile{
    symbol?:string
    touched?:boolean,
    coordinates?:Coordinates
    neighbours?:Neighbours
}
interface Neighbours{
        north?:Tile
        east?:Tile
        south?:Tile
        west?:Tile
}
interface Coordinates{
    x:number,
    y:number
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
function checkDirection(direction,nextDirection){
    let turn="straight"
    switch(direction){
        case "north":
            switch(nextDirection){
                case "F":
                    turn="right"
                case "7":
                    turn="left"

            }
        case "east":
            switch(nextDirection){
                case "7":
                    turn="right"
                case "J":
                    turn="left"

            }
        case "south":
            switch(nextDirection){
                case "J":
                    turn="right"
                case "L":
                    turn="left"

            }
        case "west":
            switch(nextDirection){
                case "L":
                    turn="right"
                case "F":
                    turn="left"
            }
    }
    return turn
}