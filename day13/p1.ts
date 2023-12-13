import * as fs from 'fs';


// Specify the file path
const filePath = 'input.txt';
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let clean_data = data.replace(/\r/g, "")
    let lines=clean_data.split("\n")
    let fields=[[]]
    let factor=100
    lines.forEach(element => {
        if(element==''){   
            fields.push([])
        }else{
            fields[fields.length-1].push(element)
        }
    })
    let result=fields.map(field=>{
        let fieldResult=analyseField(field)
        if(fieldResult){
            return fieldResult * factor
        }else{
            return analyseField(rotateField(field))
        }
    }).reduce((p,n)=>p+n)
    console.log(result)


})
function analyseField(lines:string[]){
    for (let index = 1; index < lines.length; index++) {
        let leftSide=lines.slice(0,index)
        leftSide.reverse()
        let rightSide=lines.slice(index,lines.length)
        let smallerSide=rightSide;
        let biggerSide=leftSide;
        if(leftSide.length<rightSide.length){
            smallerSide=leftSide;
            biggerSide=rightSide;
        }
        let comparedSides=compareSides(smallerSide,biggerSide)
        if(comparedSides.every(isMirrored=>isMirrored)){
            return index;
        }
    }

}
function rotateField(lines:string[]){
    let rawField=[...Array(lines[0].length)].map(i=>[]);
    let linesarray=lines.map(line=>line.split(''))
    linesarray.forEach(line=>{
        line.forEach((c,index,line)=>{
            rawField[index].push(c)})
        })
    let rotatedField:string[]= rawField.map(line=>line.join(''))
    return rotatedField
}
function compareSides(smaller:string[],bigger:string[]){
    return smaller.map((line,index,side)=>line==bigger[index])
}