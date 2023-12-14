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

    let originalResult = [
        300,  2, 1000,  1,  10, 1400,  2,  1,  1,  2,  1,  6,
        3, 300,  300, 800, 400,    2, 1200, 10,  7,  9, 200, 200,
        12,   1,   11, 400,   1,   8, 100, 1400,  2, 800,   1, 1300,
        100,   9, 1600,   1,  1,  16, 200,  100, 900, 600, 1100, 100,
        7, 1100,  2, 1400,   8,  16,   6, 1400, 100,  1,  100,   1,
        200, 800, 100,  300,   1,   3,   2,   4,  8,  4,  14,   5,
        1400, 700, 200,  300,   9,  11, 300,  14,  1, 500,   7, 800,
        14, 100,  300,  12, 100,  10, 1000,   1,  5, 200,   1, 300,
        1100, 100, 1000, 1500
    ];
    let newResult=[
        900, 400,  500,    1,  500, 600,    1,    1,   1, 600,  200,  700,
        3, 100,  300,  800,  400, 100,  600,    4, 200, 200,  200,  200,
      800, 200,    3,  400, 1400,   2,  100, 1400, 600, 200,  700, 1300,
      100,   2,  600,    1,  400,   7,  200,  100, 900, 900, 1100,  100,
        2, 500, 1000,  400,    3, 100,    1,  700, 100,   1,  100,    1,
      200, 800,  100,  900,  400, 200,  300,    2, 200,   4,  500,  100,
      600, 700,  200,  300,    1, 400,  300, 1400,   1, 500,    2,  800,
      600, 700,  300,    6,  100,   4, 1000,    1,   5, 200,    1,  800,
     1100, 100, 1000, 1500]

    newResult=[...originalResult]

    originalResult.forEach((result,index,results)=>{
        let x=0
        let y=0
        while(newResult[index]==result){
            let field=replaceSmudge(fields[index],x,y)
            let horizontalResult=analyseField(field)
            let verticalResult=analyseField(rotateField(field))
            if(verticalResult!=undefined && result!=verticalResult){
                newResult[index]= verticalResult
            }
            if(horizontalResult!= undefined && result!=horizontalResult*factor){
                newResult[index]= horizontalResult*factor
            }
            x++
            if(x==field[index][0].length){
                x=0
                y++
            }
        }
    })
    console.log(newResult)
})
function analyseField(field:string[]){
    let lines=field.map(line=>line)
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
    console.log(lines)
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
function replaceSmudge(field:string[],x,y){
    console.log(`replacing smudge at x:${x}y${y}`)
    console.log(`fieldSize: x:${field[0].length}y:${field.length}`)

    console.log(field[y])
    let fieldCopy=[...field]
    let lineArray=fieldCopy[y].split('');
    lineArray[x]=="."?lineArray[x]="#":lineArray[x]="."
    fieldCopy[y]=lineArray.join('')
    console.log(fieldCopy[y])
    return fieldCopy;
}
