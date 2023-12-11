import { dir } from 'console';
import * as fs from 'fs';


// Specify the file path
const filePath = 'input.txt';
let factor=1000000
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let clean_data = data.replace(/\r/g, "")
    let lines=clean_data.split("\n")
    //console.log(lines)
    let expandedSpace=expandSpaceNew(lines)
    //console.log(expandedSpace)
    let allSpace=expandedSpace.join('')
    let spaceWidth=expandedSpace[0].length
    let spaceHeight=expandedSpace.length
    let galaxies=[]
    //console.log(expandedSpace)

    expandedSpace.forEach((line,y,lines) => {
        let row=line.split('')
        row.forEach((column,x,columns)=>{
            if(column=="#") galaxies.push({index:galaxies.length+1,coordinates:{x,y}})
        }
        )
    });
    //console.log(galaxies)
    //console.log(`space dimensions: ${spaceWidth} x ${spaceHeight}`)
    let pairedGalaxies=pairGalaxies(galaxies)
    //console.log(pairedGalaxies.length)
    let coordinatedSpace=expandedSpace.map(line=>line.split(''))
    let distances=calculateDistance(pairedGalaxies,coordinatedSpace)
    /*distances.forEach(d=>{
        console.log(`from index: ${d.pair.source.index} at: x: ${d.pair.source.coordinates.x} y: ${d.pair.source.coordinates.y}`)
        console.log(`to index: ${d.pair.target.index} at: x: ${d.pair.target.coordinates.x} y: ${d.pair.target.coordinates.y}`)
        console.log(`steps: ${d.steps}`)

    })*/
    console.log(distances.map(d=>d.steps).reduce((p,n)=>p+n))

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
function expandSpaceNew(lines){
    let expandedSpace=[];
    let columnsWithoutGalaxy=[]
    for (let index = 0; index < lines.length; index++) {
        columnsWithoutGalaxy.push(index)
        
    }
    //console.log(columnsWithoutGalaxy)
    lines.forEach(line => {
        if(line.indexOf("#")==-1){
            line=line.split('').map(c=>"M").join('')
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
            newLine=newLine.substring(0,c)+"M"+newLine.substring(c+1,newLine.length)
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
function calculateDistance(galaxyPairs,space){

    //console.log(space)
    return galaxyPairs.map(pair=>{
        let sourceCopy={x:pair.source.coordinates.x,y:pair.source.coordinates.y}
        let direction= {x:pair.target.coordinates.x-pair.source.coordinates.x,y:pair.target.coordinates.y-pair.source.coordinates.y}
        let steps=0;
        //console.log(direction)
        while (sourceCopy.x!=pair.target.coordinates.x){
            direction.x=direction.x/Math.abs(direction.x)
            sourceCopy.x+=direction.x
            if(space[sourceCopy.y][sourceCopy.x]=="M"){
                steps+=factor
            }else{
                steps++
            }
        }
        while (sourceCopy.y!=pair.target.coordinates.y){
            direction.y=direction.y/Math.abs(direction.y)
            sourceCopy.y+=direction.y
            if(space[sourceCopy.y][sourceCopy.x]=="M"){
                steps+=factor
            }else{
                steps++
            }
        }
        return {pair,steps}
    })
}
