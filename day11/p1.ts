import { dir } from 'console';
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
    let clean_data = data.replace(/\r/g, "")
    let lines=clean_data.split("\n")
    //console.log(lines)
    let expandedSpace=expandSpace(lines)
    //console.log(expandedSpace)
    let allSpace=expandedSpace.join('')
    let spaceWidth=expandedSpace[0].length
    let spaceHeight=expandedSpace.length
    let galaxies=[]
    expandedSpace.forEach((line,y,lines) => {
        let row=line.split('')
        row.forEach((column,x,columns)=>{
            if(column=="#") galaxies.push({index:galaxies.length+1,coordinates:{x,y}})
        }
        )
    });
    //console.log(`space dimensions: ${spaceWidth} x ${spaceHeight}`)
    //console.log(expandedSpace)
    let pairedGalaxies=pairGalaxies(galaxies)
    let distances=calculateDistance(pairedGalaxies)
    let result=distances.map(d=>Math.abs(d.x)+Math.abs(d.y))
    console.log(result.reduce((p,n)=>p+n))
})
function expandSpace(lines){
    let expandedSpace=[];
    let columnsWithoutGalaxy=[]
    for (let index = 0; index < lines.length; index++) {
        columnsWithoutGalaxy.push(index)
        
    }
    //console.log(columnsWithoutGalaxy)
    lines.forEach(line => {
        if(line.indexOf("#")==-1){
            expandedSpace.push(line)
        }else{
            let galaxies=[...line.matchAll(/\#/g)].map(g=>g["index"]);
            columnsWithoutGalaxy=columnsWithoutGalaxy.filter(c=>!galaxies.includes(c))
        }
        expandedSpace.push(line)
    });
    //console.log(columnsWithoutGalaxy)
    expandedSpace=expandedSpace.map(line=>{
        let newLine:string=line;
        columnsWithoutGalaxy.forEach((c,index,array)=>{
            newLine=newLine.substring(0,c+index)+"."+newLine.substring(c+index,newLine.length)
        })
        return newLine
    })
    return expandedSpace
}
function pairGalaxies(galaxies){
    let galaxyPairs=[]
    for (let i = galaxies.length-1; i >= 0; i--) {
            for (let j = 0; j < i; j++) {
                galaxyPairs.push({source:galaxies[i],target:galaxies[j]})
                
            }
    }
    return galaxyPairs

}
function calculateDistance(galaxyPairs){
    return galaxyPairs.map(pair=>{
        return {x:pair.target.coordinates.x-pair.source.coordinates.x,y:pair.target.coordinates.y-pair.source.coordinates.y}
    })
}
