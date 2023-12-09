import { time } from 'console';
import * as fs from 'fs';
import { retry } from 'rxjs';


// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {  
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let lines=data.split("\n")
    let sequences=lines.map(line=>line.split(" ").map(n=>parseInt(n)))
    let result = sequences.map(sequence=>getLastSequence(sequence)).reduce((a,b)=>a+b)
    console.log(result)
})
function getLastSequence(sequence:number[]){
    return sequence.every(n=>n==0)? 0 : sequence[0] - getLastSequence(calculateNextSequence(sequence)) 
}
function calculateNextSequence(sequence:number[]){
    let nextSequence=sequence.map((n,index,array)=>{
        if(index<array.length-1){
            return (array[index+1]-n)
        }
    })
    nextSequence.splice(nextSequence.length-1,1)
    return nextSequence
}
