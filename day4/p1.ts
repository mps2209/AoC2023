import * as fs from 'fs';

// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let lines=data.split('\n')
    let totalScore=0;
    lines.forEach(line=>
        {
            totalScore+=splitNumbers(line)
        })
    console.log(totalScore)
    })
    
function splitNumbers(line){
    let numbers=line.split(':')[1].split('|')
    numbers=numbers.map(number=>number.split(' '))
    numbers=numbers.map(number=>number.filter(n=>n!=''))
    let score=0;
    console.log("comparing")
    console.log(numbers[0])
    console.log(numbers[1])

    numbers[1].forEach(number=>{
        console.log("checking if")
        console.log(numbers[0])
        console.log("contains "+ number)
        if(numbers[0].includes(number)){
            console.log("congratulations")
            score*=2
            if (score==0){
                score=1;
            }
        }
    })
    return score;
}
