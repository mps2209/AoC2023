import { time } from 'console';
import * as fs from 'fs';


// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {  
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let input=data.split("\n")
    let instructions=input[0]
    input.splice(0,2)
    console.log(instructions)
    let nodes=new Map()
    input.map(line=>line.split(" = ")).map(line=>{
        let lr=line[1].split(", ")
        nodes.set(line[0],{L:lr[0].replace("(",""),R:lr[1].replace(")","")})
    })
    let currentNode="AAA"
    let steps=0
    console.log(nodes)

    while(currentNode!="ZZZ"){
        console.log(`going ${instructions[steps%instructions.length]} at ${currentNode}`)
        currentNode=nodes.get(currentNode)[instructions[steps%instructions.length]]
        steps++
        console.log(`to  ${currentNode} and took ${steps} steps`)
    }
    let sum=0


})

