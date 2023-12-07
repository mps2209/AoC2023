import * as fs from 'fs';

// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let seedsMap= [...data.matchAll(/seeds: ([ \d+]+)/g)][0][1].split(" ").map(seed=>parseInt(seed))
    let lowestDestination=Infinity
    let maps=setupMaps(data.split("\n"))
    seedsMap.map((value,index,array)=>{
        if(index%2==0){
            for (let i = value; i < value+array[index+1]; i++) {
                let nextValue=i;
                maps.forEach((mappings,key)=>{
                    let foundMatch=false
                    mappings.forEach((mapping) => {    
                        if(!foundMatch){                    
                            if(nextValue>=mapping[1]&&nextValue<mapping[1]+mapping[2]){
                                //console.log("matched "+ key +  " value "+ nextValue + " to " + (mapping[0] + nextValue - mapping[1]))
                                nextValue= mapping[0] + nextValue - mapping[1]
                                foundMatch=true
                            }
                        }
                    })
                })
                if(nextValue<lowestDestination){
                    lowestDestination=nextValue;
                }
            }   
        }
    })
    console.log(lowestDestination)
})
function setupMaps(lines){
    let maps=new Map()
    let currentMap=""
    lines.splice(1,lines.length-1).filter(line=>line!="").forEach(line => {
        if(line.includes("map")){
            let mapName=line.replace(" map:","")
            maps.set(mapName,[])
            currentMap=mapName
        }else{
            let mappings=maps.get(currentMap)
            mappings.push(line.split(" ").map(number=>parseInt(number)))
            maps.set(currentMap,mappings)
        }
    })
    return maps;
}