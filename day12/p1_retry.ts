import * as fs from 'fs';


// Specify the file path
const filePath = 'test_input.txt';
let tiles;
let steps;
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let clean_data = data.replace(/\r/g, "")
    //console.log(getSpringRegex(1))
    //console.log([...".??..??...?##.".matchAll(getSpringRegex(1))])
    let springs:string[]=[]
    let configurations:number[][]=[]
    let lines=clean_data.split("\n")
    lines.forEach(line => {
        let lineParts=line.split(' ')
       springs.push(lineParts[0])
       configurations.push(lineParts[1].split(",").map(n=>parseInt(n)))
    });
    springs.forEach((spring,index,springs)=>
    console.log(findConfiguration(spring,configurations[index],0)))

})
function findConfiguration(springs:string,configuration:number[],result){
    //console.log(`searching ${springs} for ${configuration}`)
    let matches= [...springs.matchAll(getSpringRegex(configuration[configuration.length-1]))]
    //console.log(matches)
    let indexes=matches.map(m=>m["index"])

    if(configuration.length==1){
        result+=matches.length
    }if(matches.length==0){
        return 0;
    }
    configuration.pop()
    indexes.forEach(index=>{
        let newSection=springs
        result+=findConfiguration(newSection.substring(0,index+1),configuration,result)
    })
    return result
}

function getSpringRegex(amountOfDamagedSprings:number){
    let damagedSpringRegex=[...Array(amountOfDamagedSprings)].map(n=>"[\#\?]").join('')
    return new RegExp(`(?=([^\#]${damagedSpringRegex}[^\#]))`,"g")
}
