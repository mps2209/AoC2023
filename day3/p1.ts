import * as fs from 'fs';

// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    let numberRegex = new RegExp(/\d+/, "g");
    let symbolRegex = new RegExp(/[^\d\.]/, "g");

    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let lines=data.split('\n')
    let allMatches=[]
    lines.forEach((line,index,lines)=>{
        let lineResult=[...line.matchAll(numberRegex)]
        if(lineResult.length>0){
            if(index>0){
                getMatches(lineResult,[...lines[index-1].matchAll(symbolRegex)],index,allMatches)
            }
            getMatches(lineResult,[...lines[index].matchAll(symbolRegex)],index,allMatches)
            if(index<lines.length-1){
                getMatches(lineResult,[...lines[index+1].matchAll(symbolRegex)],index,allMatches)
            }
        }
   
    })
    console.log(allMatches)
    let sum=0;
    allMatches.forEach(entry=>sum+=entry[0]*1)
    console.log(sum)

});
function getMatches(lineResult,symbolResult,line, allMatches){
    let numberMatches=[]
    symbolResult.forEach(symbol => {
        lineResult.forEach(number => {
            if(checkSymbolMatch(symbol,number)){
                let result={...number,line};
                if(!allMatches.includes(result)){
                    allMatches.push(result)
                }
            }
        });
    
    });
    console.log("checking line")
    console.log(lineResult)
    console.log("for symbols")
    console.log(symbolResult)
    console.log("result")
    console.log(numberMatches)
    return allMatches;
}
function checkSymbolMatch(symbol,number){
    return (symbol["index"]>=number["index"]-1 && symbol["index"]<= number["index"]+(number[0]+"").length)

}