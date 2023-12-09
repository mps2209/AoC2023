import { time } from 'console';
import * as fs from 'fs';
import { setPriority } from 'os';

const filePath = 'input.txt';

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
    let startingNodes:String[]= [...nodes.keys()].filter(node=>node[2]=="A").map(node=>{return `${node}0`}).flat()
    let uniqueChains=startingNodes.map(node=>{
        let uniqueChain=[];
        uniqueChain.push(node)
        return uniqueChain
    });
    let nodesAdded=0;
    for (let index = 0; index < uniqueChains.length; index++) {
        let addedElement=false
        let step=0
        do{
            addedElement=false
            let node=Array.from(uniqueChains[index])[step%uniqueChains[index].length]
            let nextNode=nodes.get(node.substring(0,3))[instructions[step%instructions.length]]
            if(!uniqueChains[index].includes(nextNode+(step+1)%instructions.length)){
                uniqueChains[index].push(nextNode+(step+1)%instructions.length)
                addedElement=true;
            }else{
                uniqueChains[index].push(nextNode+(step+1)%instructions.length)
            }
            step++
        }while(addedElement)
    }
    console.log(uniqueChains)
    uniqueChains.forEach(chain=>{
        let loopStart=chain.indexOf(chain[chain.length-1])
        //console.log(`chain with length ${chain.length} loop starts at${loopStart} loop size: ${chain.length-1-loopStart}`)
        
    })
    let bases=uniqueChains.map(chain=>{
        let loopStart=chain.indexOf(chain[chain.length-1])
        return{ value:chain.length-1-loopStart,multiple:1
        }
        
    })
    console.log(bases)
    //console.log(lcm(bases.map(base=>base.value)))
    /*while(bases.some(base=>base.value*base.multiple!=bases[0].value*bases[0].multiple)){
        bases.sort((a,b)=>{if(a.value*a.multiple<b.value*b.multiple){return -1}if(a.value*a.multiple>b.value*b.multiple){return 1}return 0})
        bases[0].multiple++
        //console.log(bases)
        console.log(bases[0].multiple*bases[0].value)
    }*/
    
    /*while(pointers.map((pointer,index,array) => {
        return chains[index][pointer][2]
    }).some(e=>e!="Z")){
        steps++
        pointers.forEach((pointer,index,array)=>{
            //console.log(`from ${chains[index][pointer]}`)

            if(pointer<chains[index].length-1){
                pointers[index]++;
            }else{
                let nextNode=nodes.get(chains[index][pointer].substring(0,3))[instructions[(steps-1)%instructions.length]]
                //console.log(`reached end of chain with ${chains[index][pointer].substring(0,3)}`)
                //console.log(` in direction ${instructions[steps%instructions.length]} jumping to ${nextNode} at index ${chains[index].indexOf(nextNode+(steps)%instructions.length)}`)
                pointers[index]=chains[index].indexOf(nextNode+(steps)%instructions.length)
            }
            //console.log(`to ${chains[index][pointers[index]]}`)

        })
    }
    let result=pointers.map((pointer,index,array) => {
        return chains[index][pointer][2]
    });
        console.log(`step ${steps}`)
    console.log(result)
    */



})

function gcd(a:number,b:number){
    let number=0
    while(b!=0){
        number=a%b
        a=b
        b=number
    }
    return Math.abs(a)
}
function lcm(numbers:number[]){
    
    if(numbers.length==0){
        return 1
    }
    let a=Math.abs(numbers[0])
    for (let index = 0; index < numbers.length; index++) {
        a= lcm([a,numbers[index]])
    }
    return a
}