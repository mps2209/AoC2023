import * as fs from 'fs';

// Specify the file path
const filePath = 'test_input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    let gearRatioRegex=new RegExp(/\d+\*d+/,"g")

    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let lines=data.split('\n')
    let allMatches=[]
    lines.forEach((line,index,lines)=>{
        let lineResult=[...line.matchAll(gearRatioRegex)]
        if(lineResult.length>0){
            console.log(lineResult)
        }
    })


});
