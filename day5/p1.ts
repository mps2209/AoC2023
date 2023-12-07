import * as fs from 'fs';

// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let seeds= [...data.matchAll(/seeds: ([ \d+]+)/g)][0][1].split(" ").map(seed=>parseInt(seed))
    let lines=data.split("\n")
    let maps=new Map();
    let currentMap=""
    lines.splice(1,lines.length-1).filter(line=>line!="").forEach(line => {
        if(line.includes("map")){
            maps.set(line,[])
            currentMap=line
        }else{
            let mappings=maps.get(currentMap)
            mappings.push(line.split(" ").map(number=>parseInt(number)))
            maps.set(currentMap,mappings)
        }
    })

    let previousValues=[...seeds]
    let nextValues=[]
    console.log(maps)
    maps.forEach((mappings,key)=>
    {
        previousValues.forEach(value=>{
            let newValue=value
            console.log("checking "+ value + " against " + mappings)

            mappings.forEach(mapping => {
                if(value>=mapping[1]&&value<mapping[1]+mapping[2]){
                    console.log("matched "+ value + " against " + mapping)
                    newValue= mapping[0] + value - mapping[1]
                    console.log("result "+ newValue)
                }
            });

            nextValues.push(newValue);
        })
        console.log(nextValues)

        previousValues=[...nextValues];
        nextValues=[]
    })
    let lowestDestination=Infinity
    previousValues.forEach(value=>{if(value<lowestDestination){
        lowestDestination=value
    }})
    console.log(lowestDestination)
})