import * as fs from 'fs';

// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    let numberRegex = new RegExp(/\d+/, "g");
    let symbolRegex = new RegExp(/[\*]/, "g");

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
                getMatches(lineResult,[...lines[index-1].matchAll(symbolRegex)],index-1,allMatches)
            }
            getMatches(lineResult,[...lines[index].matchAll(symbolRegex)],index,allMatches)
            if(index<lines.length-1){
                getMatches(lineResult,[...lines[index+1].matchAll(symbolRegex)],index+1,allMatches)
            }
        }
   
    })
    let justSymbols=allMatches.map(match=>"I"+match.symbol.index+"L"+match.symbol.line)
    let result=[...justSymbols]

    let uniqueSymbols=[]
    justSymbols.forEach(cog=>{
        if(!uniqueSymbols.includes(cog)){
            uniqueSymbols.push(cog)
            delete result[result.indexOf(cog)]
        }
    })
    
    console.log(justSymbols)
    result=result.filter(element=>element!=undefined)    
    console.log(result)    
    console.log(justSymbols.length)
    console.log(uniqueSymbols.length)
    let sum=0;

    result.forEach(cog=>{
        let ratios=allMatches.filter(match=>"I"+match.symbol.index+"L"+match.symbol.line==cog)
        sum+=ratios[0][0]*ratios[1][0];
        console.log(ratios)

    })
    console.log(sum)

});
function getMatches(lineResult,symbolResult,line, allMatches){
    let numberMatches=[]
    symbolResult.forEach(symbol => {
        lineResult.forEach(number => {
            if(checkSymbolMatch(symbol,number)){
                let result={...number,symbol:{...symbol,line}};
                if(!allMatches.includes(result)){
                    allMatches.push(result)
                }
            }
        });
    
    });
    return allMatches;
}
function checkSymbolMatch(symbol,number){
    return (symbol["index"]>=number["index"]-1 && symbol["index"]<= number["index"]+(number[0]+"").length)

}